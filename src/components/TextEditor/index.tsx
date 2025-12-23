import { memo, type ChangeEvent } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for TextEditor component
 */
export interface ITextEditorProps extends Omit<IBaseComponent, 'children'> {
  /**
   * Editor value
   */
  value?: string
  /**
   * Value change handler
   */
  onChange?: (value: string) => void
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Minimum number of lines
   * @default 1
   */
  minLines?: number
  /**
   * Maximum number of lines
   */
  maxLines?: number
  /**
   * Whether the editor is disabled
   */
  disabled?: boolean
}

/**
 * A view that displays and edits multiline text.
 * 
 * TextEditor is a multiline text input component, similar to SwiftUI's TextEditor.
 * It provides a textarea-like interface for editing longer text content.
 * 
 * @example
 * ```tsx
 * <TextEditor
 *   value={text}
 *   onChange={setText}
 *   placeholder="Enter text..."
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/texteditor
 */
export const TextEditor = memo(function TextEditor(props: ITextEditorProps) {
  const {
    value = '',
    onChange,
    placeholder,
    minLines = 1,
    maxLines,
    disabled = false,
    ...restProps
  } = props

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('text-editor')],
  })

  const rows = maxLines ? Math.min(Math.max(value.split('\n').length, minLines), maxLines) : Math.max(value.split('\n').length, minLines)

  return (
    <textarea
      {...commonProps}
      {...finalRestProps}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  )
})

