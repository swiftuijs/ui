/** Convert viewport coordinates to a fixed descendant's containing block. */
export function fixedPositionOrigin(host: HTMLElement) {
  for (let node: HTMLElement | null = host; node; node = node.parentElement) {
    const style = getComputedStyle(node)
    const transformed = [style.transform, style.translate, style.scale, style.rotate,
      style.perspective, style.filter, style.backdropFilter].some(value => value && value !== 'none')
    if (transformed || /paint|layout|strict|content/.test(style.contain)
      || /transform|translate|scale|rotate|perspective|filter/.test(style.willChange)) {
      const rect = node.getBoundingClientRect()
      return { left: rect.left + node.clientLeft - node.scrollLeft, top: rect.top + node.clientTop - node.scrollTop }
    }
  }
  return { left: 0, top: 0 }
}
