import { memo, useId } from 'react'

import type { ChangeEvent, KeyboardEvent } from 'react'

import type { IBaseElementComponent } from '@/types'
import { clsx, prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * SearchField provides a search-specific text input with SwiftUI-style
 * value callbacks while keeping native search input semantics.
 *
 * @see https://developer.apple.com/documentation/swiftui/view/searchable(text:placement:prompt:)
 */
export interface ISearchFieldProps extends Omit<IBaseElementComponent<'input'>, 'children' | 'onChange' | 'onSubmit' | 'type'> {
  /**
   * Accessible label for the search field.
   */
  label: string
  /**
   * Current search text.
   */
  value?: string
  /**
   * Placeholder text shown when the field is empty.
   */
  placeholder?: string
  /**
   * Standard change handler for web-style form integrations.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * Value-first change handler for SwiftUI-style state updates.
   */
  onValueChange?: (value: string) => void
  /**
   * Called when the user submits the current query with Enter.
   */
  onSubmit?: (value: string) => void
}

export const SearchField = memo(function SearchField(props: ISearchFieldProps) {
  const { label, onChange, onSubmit, onValueChange, placeholder, value, ...restProps } = props
  const inputId = useId()
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('searchfield'),
  })

  return (
    <>
      <label className={prefixClass('searchfield-label')} htmlFor={inputId}>
        {label}
      </label>
      <input
        {...commonProps}
        {...finalRestProps}
        className={clsx(prefixClass('searchfield'), commonProps.className)}
        id={inputId}
        onChange={(event) => {
          onChange?.(event)
          onValueChange?.(event.target.value)
        }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            onSubmit?.(event.currentTarget.value)
          }
        }}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </>
  )
})
