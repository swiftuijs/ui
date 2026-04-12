import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { TextSelection } from './index'

describe('TextSelection', () => {
  it('marks wrapped content as selectable by default', () => {
    render(
      <TextSelection>
        <span>Copyable code block</span>
      </TextSelection>
    )

    const wrapper = screen.getByText('Copyable code block').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-text-selection', 'enabled')
    expect(wrapper).toHaveClass('sw-textselection')
    expect(wrapper).toHaveStyle({ userSelect: 'text' })
  })

  it('can disable selection semantics', () => {
    render(
      <TextSelection selection="disabled">
        <span>Static label</span>
      </TextSelection>
    )

    const wrapper = screen.getByText('Static label').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-text-selection', 'disabled')
    expect(wrapper).toHaveClass('sw-textselection-disabled')
    expect(wrapper).toHaveStyle({ userSelect: 'none' })
  })
})
