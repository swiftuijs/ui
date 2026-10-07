import { describe, expect, it } from 'vitest'
import { createGlassField, glassBoundary, glassGeometry } from './glass-optics'

describe('bounded glass optics', () => {
  it('keeps the center neutral and opposite edges symmetric', () => {
    const geometry = glassGeometry(300, 200, ['54px', '54px', '54px', '54px'])!
    const field = createGlassField(geometry)
    const pixel = (x: number, y: number) => Array.from(field.data.slice((y * field.width + x) * 4, (y * field.width + x + 1) * 4))
    expect(pixel(150, 100)).toEqual([128, 128, 0, 255])
    const left = pixel(4, 100), right = pixel(295, 100)
    expect(left[0]).toBeGreaterThan(128)
    expect(left[0] + right[0]).toBe(255)
    expect(left[2]).toBeGreaterThan(200)
  })
  it('does not reverse sample order at a straight rim', () => {
    const field = createGlassField(glassGeometry(300, 200, ['0px', '0px', '0px', '0px'])!)
    let previous = -Infinity
    for (let x = 0; x < 40; x++) {
      const red = field.data[(100 * field.width + x) * 4] / 255
      const sampled = x + field.scale * (red - 0.5)
      expect(sampled).toBeGreaterThan(previous)
      previous = sampled
    }
  })
  it('normalizes percentages and oversized radii, including asymmetric and elliptical corners', () => {
    const circle = glassGeometry(80, 80, ['999px', '999px', '999px', '999px'])!
    expect(circle.corners).toEqual([[40, 40], [40, 40], [40, 40], [40, 40]])
    expect(glassGeometry(80, 80, ['50%', '50%', '50%', '50%'])!.key).toBe(circle.key)
    const asymmetric = glassGeometry(400, 600, ['300px', '0px', '0px', '0px'])!
    expect(glassBoundary(220, 40, asymmetric).nx).toBeLessThan(0)
    const ellipse = glassGeometry(300, 200, ['60px 30px', '0px', '0px', '0px'])!
    const normal = glassBoundary(20, 10, ellipse)
    expect(Math.hypot(normal.nx, normal.ny)).toBeCloseTo(1)
    expect(normal.distance).toBeGreaterThan(0)
  })
  it('bounds encoding work for a large sheet and rejects empty geometry', () => {
    const field = createGlassField(glassGeometry(3840, 2160, ['40px', '40px', '0px', '0px'])!)
    expect(field.width * field.height).toBeLessThanOrEqual(131_072)
    expect(Math.max(field.width, field.height)).toBeLessThanOrEqual(768)
    expect(Number.isFinite(field.scale)).toBe(true)
    expect(glassGeometry(0, 200, ['0px', '0px', '0px', '0px'])).toBeUndefined()
    expect(glassGeometry(Infinity, 200, ['0px', '0px', '0px', '0px'])).toBeUndefined()
  })
})
