import { describe, expect, it } from 'vitest'

import {
  getSizeClassInfo,
  SIZE_CLASS_REGULAR_MIN,
} from './size-class'

describe('size-class', () => {
  it('treats widths below the horizontal minimum as compact', () => {
    expect(
      getSizeClassInfo({
        width: SIZE_CLASS_REGULAR_MIN.horizontal - 1,
        height: SIZE_CLASS_REGULAR_MIN.vertical,
      })
    ).toEqual({
      horizontal: 'compact',
      vertical: 'regular',
      width: 374,
      height: 667,
    })
  })

  it('treats the shared minimum thresholds as the start of regular size classes', () => {
    expect(
      getSizeClassInfo({
        width: SIZE_CLASS_REGULAR_MIN.horizontal,
        height: SIZE_CLASS_REGULAR_MIN.vertical,
      })
    ).toEqual({
      horizontal: 'regular',
      vertical: 'regular',
      width: 375,
      height: 667,
    })
  })

  it('returns null when viewport data is unavailable', () => {
    expect(getSizeClassInfo(null)).toBeNull()
  })
})
