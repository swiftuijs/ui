import { useEffect, useId, useRef, useState, useSyncExternalStore, type ComponentRef } from 'react'
import { useUIConfig, type useGlassAppearance } from '@/contexts/ui-config'
import type { GlassMap } from '../glass-optics'
import { createFrameUpdate } from '../frame-update'
import './style.scss'

// URL syntax alone doesn't prove backdrop displacement works. Keep enhancement
// conservative: Chromium only; WebKit/iOS and Gecko retain the CSS material.
const query = '(prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active)'
const subscribers = new Set<() => void>()
let media: ReturnType<typeof window.matchMedia> | undefined
const notify = () => subscribers.forEach(listener => listener())
function supportsRefraction() {
  return typeof window !== 'undefined' && /(?:Chrome|Chromium|Edg)\//.test(window.navigator.userAgent)
    && Boolean(window.CSS?.supports('backdrop-filter', 'url(#sw-glass-probe)'))
}
function snapshot() {
  if (!supportsRefraction()) return false
  return !(media?.matches ?? window.matchMedia(query).matches)
}
function subscribe(listener: () => void) {
  if (!supportsRefraction()) return () => {}
  subscribers.add(listener)
  if (subscribers.size === 1) { media = window.matchMedia(query); media.addEventListener('change', notify) }
  return () => {
    subscribers.delete(listener)
    if (!subscribers.size) { media?.removeEventListener('change', notify); media = undefined }
  }
}
const serverSnapshot = () => false

function Refraction({ appearance }: { appearance: ReturnType<typeof useGlassAppearance> }) {
  const capable = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const { tokens } = useUIConfig()
  const ref = useRef<ComponentRef<'span'>>(null)
  const [map, setMap] = useState<GlassMap>()
  const id = `sw-glass-${useId().replace(/[^\w-]/g, '')}`
  const blur = parseFloat(String(appearance.style['--sw-glass-blur' as keyof typeof appearance.style]))
  const strength = Number(appearance.style['--sw-glass-strength' as keyof typeof appearance.style])

  useEffect(() => {
    const host = ref.current?.parentElement
    if (!capable) { setMap(undefined); return }
    if (!host || typeof ResizeObserver === 'undefined') return
    let disposed = false, key = '', timer: ReturnType<typeof setTimeout> | undefined
    let image: ComponentRef<'img'> | undefined
    let optics: typeof import('../glass-optics') | undefined
    const update = (immediate = false) => {
      if (!optics || disposed) return
      const style = getComputedStyle(host)
      const geometry = optics.glassGeometry(host.clientWidth, host.clientHeight,
        [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius])
      if (geometry?.key === key) return
      key = geometry?.key ?? ''
      clearTimeout(timer)
      setMap(undefined)
      if (!geometry) return
      const build = () => {
        if (disposed) return
        try {
          const next = optics!.glassMap(geometry)
          // Verify image policy/decoding before enabling the filter (e.g. CSP).
          image = new window.Image()
          image.onload = () => { if (!disposed && key === next.key) setMap(next) }
          image.onerror = () => { /* Keep the CSS fallback if data images are blocked. */ }
          image.src = next.url
        } catch { /* Keep the CSS fallback if encoding is unavailable. */ }
      }
      // Resize/drag bursts temporarily use CSS, then build once after settling.
      if (immediate) build(); else timer = setTimeout(build, 120)
    }
    const frame = createFrameUpdate(() => update())
    const observer = new ResizeObserver(frame.schedule)
    observer.observe(host)
    const attributes = new window.MutationObserver(frame.schedule)
    attributes.observe(host, { attributes: true, attributeFilter: ['style', 'class'] })
    void import('../glass-optics').then(module => { if (!disposed) { optics = module; update(true) } })
      .catch(() => { /* A failed optional chunk must not break the control. */ })
    return () => {
      disposed = true; clearTimeout(timer); frame.cancel(); observer.disconnect(); attributes.disconnect()
      if (image) { image.onload = null; image.onerror = null }
    }
  // Scoped radius tokens can change geometry without changing the box size.
  }, [capable, appearance, tokens])

  const ready = capable && Boolean(map)
  return <span ref={ref} aria-hidden="true" className="sw-glass-backdrop" data-ready={ready ? 'true' : 'false'}>
    {ready && map ? <svg width="0" height="0" focusable="false">
      <defs><filter id={id} filterUnits="userSpaceOnUse" x="-24" y="-24" width={map.width + 48} height={map.height + 48} colorInterpolationFilters="sRGB">
        <feImage href={map.url} x="0" y="0" width={map.width} height={map.height} preserveAspectRatio="none" result="field" />
        <feDisplacementMap in="SourceGraphic" in2="field" scale={map.scale * strength} xChannelSelector="R" yChannelSelector="G" result="refracted" />
        <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="frosted" />
        <feColorMatrix in="field" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 1 0 0" result="rim" />
        <feComposite in="refracted" in2="rim" operator="in" result="edge" />
        <feComposite in="frosted" in2="rim" operator="out" result="center" />
        <feComposite in="edge" in2="center" operator="over" />
      </filter></defs>
    </svg> : null}
    {ready ? <span className="sw-glass-optics" style={{ backdropFilter: `url("#${id}") saturate(var(--sw-glass-saturation))`, WebkitBackdropFilter: `url("#${id}") saturate(var(--sw-glass-saturation))` }} /> : null}
  </span>
}

/** Decorative backdrop only. Off/CSS surfaces have no renderer, observers or SVG. */
export function GlassBackdrop({ appearance }: { appearance: ReturnType<typeof useGlassAppearance> }) {
  return appearance['data-glass'] === 'on' && appearance['data-glass-renderer'] !== 'css' ? <Refraction appearance={appearance} /> : null
}
