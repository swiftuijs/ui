/** A bounded, shape-aware optical field. Browser encoding is loaded only for enabled glass. */
export type Corner = readonly [number, number]
export interface GlassGeometry { width: number; height: number; corners: Corner[]; key: string }
export interface GlassMap extends GlassGeometry { url: string; scale: number; pixels: number }
const MAX_PIXELS = 131_072
const MAX_SIDE = 768
const cache = new Map<string, GlassMap>()

export function glassGeometry(width: number, height: number, radii: string[]): GlassGeometry | undefined {
  if (!Number.isFinite(width + height) || width < 2 || height < 2 || radii.length !== 4) return
  width = Math.round(width); height = Math.round(height)
  const length = (value: string, axis: number) => Math.max(0, parseFloat(value) || 0) * (value.endsWith('%') ? axis / 100 : 1)
  const corners = radii.map(value => {
    const [x, y = x] = value.split(/\s+/)
    return [length(x, width), length(y, height)] as [number, number]
  })
  const [tl, tr, br, bl] = corners
  const factor = Math.min(1, width / Math.max(1, tl[0] + tr[0]), width / Math.max(1, bl[0] + br[0]),
    height / Math.max(1, tl[1] + bl[1]), height / Math.max(1, tr[1] + br[1]))
  for (const corner of corners) { corner[0] = Math.round(corner[0] * factor * 2) / 2; corner[1] = Math.round(corner[1] * factor * 2) / 2 }
  return { width, height, corners, key: `${width}:${height}:${corners.flat().join(':')}` }
}

/** Distance to the rounded boundary and its outward normal, in CSS pixels. */
export function glassBoundary(x: number, y: number, { width: w, height: h, corners }: GlassGeometry) {
  const distance = Math.min(x, w - x, y, h - y)
  let boundary = { distance, nx: distance === x ? -1 : distance === w - x ? 1 : 0,
    ny: distance === x || distance === w - x ? 0 : distance === y ? -1 : 1 }
  for (let i = 0; i < 4; i++) {
    const [rx, ry] = corners[i], left = i === 0 || i === 3, top = i < 2
    const qx = x - (left ? rx : w - rx), qy = y - (top ? ry : h - ry)
    if (rx <= 0 || ry <= 0 || !(left ? qx < 0 : qx > 0) || !(top ? qy < 0 : qy > 0)) continue
    const rho = Math.hypot(qx / rx, qy / ry), gx = qx / (rx * rx), gy = qy / (ry * ry)
    const norm = Math.hypot(gx, gy), curvedDistance = (1 - rho) * rho / norm
    if (curvedDistance < boundary.distance) boundary = { distance: curvedDistance, nx: gx / norm, ny: gy / norm }
  }
  return boundary
}

export function createGlassField(geometry: GlassGeometry) {
  const { width: w, height: h } = geometry
  const ratio = Math.min(1, MAX_SIDE / Math.max(w, h), Math.sqrt(MAX_PIXELS / (w * h)))
  const width = Math.max(1, Math.floor(w * ratio)), height = Math.max(1, Math.floor(h * ratio))
  const data = new Uint8ClampedArray(width * height * 4)
  const bezel = Math.min(18, Math.min(w, h) * 0.18), thickness = bezel * 2.8
  const profile = new Float32Array(129)
  let maximum = 0
  // One simplified refraction event through a convex squircle profile (IOR 1.5).
  for (let i = 1; i < 128; i++) {
    const t = i / 128, u = 1 - t, base = 1 - u ** 4
    const heightAtEdge = thickness * base ** 0.25
    const slope = thickness / bezel * u ** 3 * base ** -0.75
    const nz = 1 / Math.hypot(1, slope), nxy = slope * nz, eta = 1 / 1.5
    const coefficient = eta * nz - Math.sqrt(1 - eta * eta * (1 - nz * nz))
    const shift = heightAtEdge * -coefficient * nxy / (eta - coefficient * nz)
    profile[i] = shift
  }
  // Constrain the falloff so sampling order never flips into a water-like fold.
  // This artistic bound preserves a readable, smooth rim rather than caustics.
  for (let i = 127; i > 0; i--) {
    profile[i] = Math.min(profile[i], profile[i + 1] + bezel / 128 * 0.75)
    maximum = Math.max(maximum, profile[i])
  }
  const scale = maximum * 2
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const boundary = glassBoundary((x + 0.5) * w / width, (y + 0.5) * h / height, geometry)
    const t = Math.max(0, Math.min(1, boundary.distance / bezel)), sample = t * 128, i = Math.floor(sample)
    const magnitude = profile[i] + (profile[Math.min(128, i + 1)] - profile[i]) * (sample - i)
    const fade = Math.max(0, Math.min(1, (t - 0.35) / 0.65))
    const pixel = (y * width + x) * 4
    data[pixel] = (0.5 - boundary.nx * magnitude / scale) * 255
    data[pixel + 1] = (0.5 - boundary.ny * magnitude / scale) * 255
    // Blue is the sharp-edge mask, not a chromatic aberration channel.
    data[pixel + 2] = (1 - fade * fade * (3 - 2 * fade)) * 255
    data[pixel + 3] = 255
  }
  return { width, height, data, scale }
}

export function glassMap(geometry: GlassGeometry): GlassMap {
  const hit = cache.get(geometry.key)
  if (hit) { cache.delete(geometry.key); cache.set(geometry.key, hit); return hit }
  const field = createGlassField(geometry), canvas = document.createElement('canvas')
  canvas.width = field.width; canvas.height = field.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Glass displacement encoding requires Canvas 2D')
  const image = context.createImageData(field.width, field.height)
  image.data.set(field.data); context.putImageData(image, 0, 0)
  const map = { ...geometry, url: canvas.toDataURL(), scale: field.scale, pixels: field.width * field.height }
  cache.set(geometry.key, map)
  if (cache.size > 24) cache.delete(cache.keys().next().value!)
  return map
}
