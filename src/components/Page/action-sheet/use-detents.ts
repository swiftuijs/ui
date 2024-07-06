import { useMemo } from 'react'
import type { IPresentationDetent } from 'src/types'
import { viewportStore } from 'src/contexts'

const PERCENT_MAP = {
  medium: '60%',
  large: '90%'
}

const DEFAULT_SCREEN_HEIGHT = 800

/**
 * calculate detents size based on screen height, re-calc when resize
 * @param detents detents list
 * @returns 
 */
export function useDetents(detents: IPresentationDetent[]) {
  const viewportInfo = viewportStore.useStore()

  return useMemo(() => {
    const screenHeight = viewportInfo?.height || DEFAULT_SCREEN_HEIGHT
    const sizes = detents.map((detent) => {
      if (typeof detent === 'number') {
        return detent
      }
      // @ts-expect-error fix this
      const percent: string = PERCENT_MAP[detent] || detent
      if (!/^\d+%$/.test(percent)) {
        throw new Error(`Invalid detent size: ${detent}, should be a number or a percentage string like '60%'`)
      }
      return Math.floor(screenHeight * parseFloat(percent) / 100)
    })
    const defaultSize = sizes[0]
    return {
      // sort by size, from small to large, and remove duplicates
      sizes: sizes.sort((a, b) => a - b).filter((size, idx, arr) => arr.indexOf(size) === idx),
      default: defaultSize,
    }
  }, [detents, viewportInfo])
}
