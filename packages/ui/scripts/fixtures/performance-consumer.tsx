import React, { memo, useContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useHorizontalSizeClass, useSizeClass } from '../../dist/contexts/size-class.js'
import { useReducedMotion } from '../../dist/hooks/use-reduced-motion.js'
import { LayoutContext } from '../../dist/contexts/layout-context.js'
import { HStack } from '../../dist/components/HStack/index.js'
import { Popover } from '../../dist/components/Popover/index.js'
import { Glass } from '../../dist/components/Glass/index.js'
import { UIProvider } from '../../dist/components/UIProvider/index.js'
import '../../dist/style/index.css'

const counts = { sizeRenders: 0, layoutRenders: 0, mediaActive: 0, anchorReads: 0, floatingReads: 0, glassEncodes: 0, glassRenders: 0, observers: 0 }
const match = window.matchMedia.bind(window)
window.matchMedia = query => {
  const media = match(query)
  const add = media.addEventListener.bind(media), remove = media.removeEventListener.bind(media)
  media.addEventListener = (type, ...args) => { if (type === 'change') counts.mediaActive++; return add(type, ...args) }
  media.removeEventListener = (type, ...args) => { if (type === 'change') counts.mediaActive--; return remove(type, ...args) }
  return media
}
const encode = HTMLCanvasElement.prototype.toDataURL
HTMLCanvasElement.prototype.toDataURL = function (...args) { counts.glassEncodes++; return encode.apply(this, args) }
const NativeObserver = window.ResizeObserver
window.ResizeObserver = class extends NativeObserver {
  private targets = new Set<Element>()
  observe(...args: Parameters<ResizeObserver['observe']>) {
    if (!this.targets.has(args[0])) { this.targets.add(args[0]); counts.observers++ }
    return super.observe(...args)
  }
  unobserve(target: Element) { if (this.targets.delete(target)) counts.observers--; return super.unobserve(target) }
  disconnect() { counts.observers -= this.targets.size; this.targets.clear(); return super.disconnect() }
}
const rect = Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = function () {
  if (this.id === 'anchor') counts.anchorReads++
  if (this.classList.contains('sw-popover')) counts.floatingReads++
  return rect.call(this)
}

function SizeProbe() { const axis = useHorizontalSizeClass(); counts.sizeRenders++; return <output data-axis="">{axis}</output> }
function FullSizeProbe() { const size = useSizeClass(); counts.sizeRenders++; return <output data-axis="">{size?.width}</output> }
function MotionProbe() { return <output>{String(useReducedMotion())}</output> }
const LayoutProbe = memo(function LayoutProbe() {
  const value = useContext(LayoutContext)
  counts.layoutRenders++
  return <output>{value.boxDirection}</output>
})
const layoutChildren = Array.from({ length: 100 }, (_, i) => <LayoutProbe key={i} />)
function LayoutCase() {
  const [tick, setTick] = useState(0)
  return <><button id="tick" onClick={() => setTick(n => n + 1)}>Update parent</button>
    <HStack data-tick={tick}>{layoutChildren}</HStack></>
}
function GlassContent() { counts.glassRenders++; return <button>Sharp control</button> }
function GlassCase({ enabled, renderer = 'auto' }: { enabled: boolean; renderer?: 'auto' | 'css' }) {
  return <UIProvider glass={{ enabled, renderer, variant: 'clear' }}>
    {Array.from({ length: 40 }, (_, i) => <Glass key={i} style={{ width: 160, height: 80, borderRadius: 24 }}><GlassContent /></Glass>)}
  </UIProvider>
}
const anchor = { current: document.getElementById('anchor') }
const root = createRoot(document.getElementById('root')!)
const mount = (mode: string) => root.render(
  mode === 'axis' ? Array.from({ length: 100 }, (_, i) => <SizeProbe key={i} />)
    : mode === 'full-size' ? Array.from({ length: 100 }, (_, i) => <FullSizeProbe key={i} />)
    : mode === 'motion' ? Array.from({ length: 100 }, (_, i) => <MotionProbe key={i} />)
    : mode === 'layout' ? <LayoutCase />
    : mode === 'glass' ? <GlassCase enabled />
    : mode === 'glass-off' ? <GlassCase enabled={false} />
    : mode === 'glass-css' ? <GlassCase enabled renderer="css" />
    : mode === 'popover' ? <Popover anchorRef={anchor} isPresented title="Performance popover">Measured surface</Popover>
    : <p>Unmounted</p>,
)
Object.assign(window, { performanceFixture: { counts, mount } })
