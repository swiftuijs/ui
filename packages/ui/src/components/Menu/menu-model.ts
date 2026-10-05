import type { IMenuItem } from './index'

/** Keyboard traversal wraps and skips disabled entries in either menu level. */
export function findNextEnabledIndexForItems(items: IMenuItem[], startIndex: number, direction: 1 | -1) {
  if (!items.length) return -1
  for (let offset = 1; offset <= items.length; offset++) {
    const nextIndex = (startIndex + direction * offset + items.length) % items.length
    if (!items[nextIndex]?.disabled) return nextIndex
  }
  return -1
}

/** Preserve source order and one accessible heading at each section boundary. */
export function groupMenuItems(items: IMenuItem[], menuId: string) {
  let previousSection: string | undefined
  return items.map((item, index) => {
    const showSectionLabel = item.section !== undefined && item.section !== previousSection
    const showSeparator = index > 0 && showSectionLabel
    previousSection = item.section
    return { item, index, showSectionLabel, showSeparator,
      sectionId: item.section ? `${menuId}-section-${index}` : undefined }
  })
}
