/** Measure settled scale and apply viewport clipping offsets after anchoring. */
export function fitToViewport(node: HTMLElement) {
  node.style.removeProperty('--sw-floating-shift-x')
  node.style.removeProperty('--sw-floating-shift-y')
  const scale = node.style.getPropertyValue('scale')
  const priority = node.style.getPropertyPriority('scale')
  node.style.setProperty('scale', '1', 'important')
  const box = node.getBoundingClientRect()
  if (scale) node.style.setProperty('scale', scale, priority)
  else node.style.removeProperty('scale')
  const x = Math.max(8 - box.x, Math.min(0, window.innerWidth - 8 - box.right))
  const y = Math.max(8 - box.y, Math.min(0, window.innerHeight - 8 - box.bottom))
  node.style.setProperty('--sw-floating-shift-x', `${x}px`)
  node.style.setProperty('--sw-floating-shift-y', `${y}px`)
}
