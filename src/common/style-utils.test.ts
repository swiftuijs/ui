import { describe, it, expect } from 'vitest'
import { clsx, mergeStyleData, standardizeUnit, prefixClass } from './style-utils'

describe('style-utils', () => {
  describe('prefixClass', () => {
    it('should prefix class name', () => {
      expect(prefixClass('button')).toBe('sw-button')
      expect(prefixClass('text')).toBe('sw-text')
    })
  })

  describe('clsx', () => {
    it('should combine string class names', () => {
      expect(clsx('a', 'b', 'c')).toBe('a b c')
    })

    it('should handle falsy values', () => {
      expect(clsx('a', null, undefined, false, 'b')).toBe('a b')
    })

    it('should handle arrays', () => {
      expect(clsx(['a', 'b'], 'c')).toBe('a b c')
    })

    it('should handle nested arrays', () => {
      expect(clsx(['a', ['b', 'c']], 'd')).toBe('a b c d')
    })

    it('should handle objects', () => {
      expect(clsx({ a: true, b: false, c: true })).toBe('a c')
    })

    it('should handle object with function values', () => {
      expect(clsx({ a: () => true, b: () => false })).toBe('a')
    })

    it('should handle function values', () => {
      expect(clsx(() => 'a b')).toBe('a b')
    })

    it('should handle function that returns array', () => {
      expect(clsx(() => ['a', 'b'])).toBe('a b')
    })

    it('should handle mixed inputs', () => {
      expect(clsx('a', ['b', 'c'], { d: true, e: false })).toBe('a b c d')
    })

    it('should handle function errors gracefully', () => {
      const fn = () => {
        throw new Error('test')
      }
      expect(() => clsx({ a: fn })).not.toThrow()
    })
  })

  describe('mergeStyleData', () => {
    it('should merge styles with user style overriding computed', () => {
      const result = mergeStyleData(
        { style: { color: 'red', fontSize: '14px' } },
        { style: { color: 'blue', padding: '10px' } }
      )
      expect(result.style).toEqual({
        color: 'red', // user style overrides
        fontSize: '14px',
        padding: '10px',
      })
    })

    it('should merge classNames', () => {
      const result = mergeStyleData(
        { className: 'a b' },
        { className: 'c d' }
      )
      expect(result.className).toBe('a b c d')
    })

    it('should handle only computed style', () => {
      const result = mergeStyleData(
        {},
        { style: { padding: '10px' } }
      )
      expect(result.style).toEqual({ padding: '10px' })
    })

    it('should handle only user style', () => {
      const result = mergeStyleData(
        { style: { color: 'red' } },
        {}
      )
      expect(result.style).toEqual({ color: 'red' })
    })

    it('should handle data attributes', () => {
      const result = mergeStyleData(
        { 'data-test': 'value1' },
        { 'data-test2': 'value2' }
      )
      expect(result['data-test']).toBe('value1')
      expect(result['data-test2']).toBe('value2')
    })

    it('should handle empty inputs', () => {
      const result = mergeStyleData({}, {})
      expect(result).toEqual({})
    })
  })

  describe('standardizeUnit', () => {
    it('should add px unit to numbers', () => {
      expect(standardizeUnit(10)).toBe('10px')
      expect(standardizeUnit(0)).toBe('0px')
    })

    it('should return string values as-is', () => {
      expect(standardizeUnit('10rem')).toBe('10rem')
      expect(standardizeUnit('50%')).toBe('50%')
    })

    it('should use custom unit', () => {
      expect(standardizeUnit(10, 'rem')).toBe('10rem')
    })
  })
})
