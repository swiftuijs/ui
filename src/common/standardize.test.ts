import { describe, it, expect } from 'vitest'
import type { IBaseComponent } from 'src/types'
import { standardizeProps } from './standardize'

describe('standardizeProps', () => {
  it('should extract style and className', () => {
    const result = standardizeProps(
      { style: { color: 'red' }, className: 'test', children: 'content' },
      { className: 'default' }
    )
    expect(result.commonProps.style).toEqual({ color: 'red' })
    expect(result.commonProps.className).toContain('test')
    expect(result.commonProps.className).toContain('default')
    expect(result.children).toBe('content')
  })

  it('should handle alignment', () => {
    const result = standardizeProps(
      { alignment: 'center' },
      {}
    )
    expect(result.commonProps['data-alignment']).toBe('center')
  })

  it('should pass through rest props', () => {
    const props = { 'data-testid': 'test', onClick: () => {} } as Partial<IBaseComponent & { 'data-testid'?: string; onClick?: () => void }>
    const result = standardizeProps(
      props,
      {}
    )
    expect((result.restProps as Record<string, unknown>)['data-testid']).toBe('test')
    expect((result.restProps as Record<string, unknown>).onClick).toBeDefined()
  })

  it('should merge extra props', () => {
    const result = standardizeProps(
      { className: 'user' },
      { className: 'extra', style: { padding: '10px' } }
    )
    expect(result.commonProps.className).toContain('user')
    expect(result.commonProps.className).toContain('extra')
    expect(result.commonProps.style).toEqual({ padding: '10px' })
  })
})

