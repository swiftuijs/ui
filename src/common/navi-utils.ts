/**
 * generate page id
 * @param prefix page id prefix
 * @returns string
 */
export function generatePageId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2)}`
}