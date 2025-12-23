import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { NaviContext, useNaviContext } from './navi-context'
import type { ReactNode } from 'react'
import React from 'react'

describe('navi-context', () => {
  describe('NaviContext', () => {
    it('should have default values', () => {
      expect(NaviContext).toBeDefined()
      expect(NaviContext.displayName).toBeUndefined()
    })
  })

  describe('useNaviContext', () => {
    it('should return default context values when used outside provider', () => {
      const { result } = renderHook(() => useNaviContext())
      expect(result.current.eventPrefix).toBe('')
      expect(result.current.append).toBeDefined()
      expect(result.current.removeLast).toBeDefined()
      expect(result.current.count).toBeDefined()
      expect(result.current.dismiss).toBeDefined()
    })

    it('should return default count value', () => {
      const { result } = renderHook(() => useNaviContext())
      expect(result.current.count()).toBe(0)
    })

    it('should have no-op functions by default', () => {
      const { result } = renderHook(() => useNaviContext())
      expect(() => {
        result.current.append({ component: () => null })
        result.current.removeLast()
        result.current.dismiss()
      }).not.toThrow()
    })

    it('should use provided context values', () => {
      const mockContext = {
        eventPrefix: 'test-prefix',
        append: vi.fn(),
        removeLast: vi.fn(),
        count: vi.fn(() => 5),
        dismiss: vi.fn(),
      }

      const wrapper = ({ children }: { children: ReactNode }) => (
        <NaviContext.Provider value={mockContext}>
          {children}
        </NaviContext.Provider>
      )

      const { result } = renderHook(() => useNaviContext(), { wrapper })
      expect(result.current.eventPrefix).toBe('test-prefix')
      expect(result.current.count()).toBe(5)
    })
  })
})

