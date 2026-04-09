import { describe, it, expect, vi } from 'vitest'
import { startViewTransition } from './view-transition'

describe('view-transition', () => {
  describe('startViewTransition', () => {
    it('should call the update function', async () => {
      const update = vi.fn()
      await startViewTransition({ update, type: 'forwards' })
      expect(update).toHaveBeenCalledTimes(1)
    })

    it('should handle forwards transition type', async () => {
      const update = vi.fn()
      await startViewTransition({ update, type: 'forwards' })
      expect(update).toHaveBeenCalled()
    })

    it('should handle backwards transition type', async () => {
      const update = vi.fn()
      await startViewTransition({ update, type: 'backwards' })
      expect(update).toHaveBeenCalled()
    })

    it('should return a promise', () => {
      const update = vi.fn()
      const result = startViewTransition({ update, type: 'forwards' })
      expect(result).toBeInstanceOf(Promise)
    })
  })
})

