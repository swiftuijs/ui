import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { throttle, generateUniqueId } from './fn-utils'

describe('fn-utils', () => {
  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should throttle function calls', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled()
      throttled()
      throttled()

      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(0)

      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('generateUniqueId', () => {
    it('should generate unique ids with prefix', () => {
      const id1 = generateUniqueId('test')
      const id2 = generateUniqueId('test')

      expect(id1).toMatch(/^test-/)
      expect(id2).toMatch(/^test-/)
      expect(id1).not.toBe(id2)
    })

    it('should generate different ids for different prefixes', () => {
      const id1 = generateUniqueId('prefix1')
      const id2 = generateUniqueId('prefix2')

      expect(id1).toMatch(/^prefix1-/)
      expect(id2).toMatch(/^prefix2-/)
    })
  })
})

