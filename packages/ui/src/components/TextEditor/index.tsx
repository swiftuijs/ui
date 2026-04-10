import { memo, useEffect, useMemo, useRef, useState, type ChangeEventHandler } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * Props for TextEditor component
 */
export interface ITextEditorProps extends Omit<IBaseElementComponent<'textarea'>, 'children' | 'value' | 'defaultValue' | 'onChange'> {
  /**
   * The current value of the editor.
   */
  value?: string
  /**
   * The initial value of the editor when uncontrolled.
   */
  defaultValue?: string
  /**
   * Native textarea change handler.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  /**
   * Value-first change handler for SwiftUI-style ergonomics.
   */
  onValueChange?: (value: string) => void
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Native textarea row count. When omitted, TextEditor grows with content and
   * keeps a sensible size between 3 and 8 rows based on its current content.
   */
  rows?: number
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
 *   onValueChange={setText}
 *   placeholder="Enter text..."
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/texteditor
 */
export const TextEditor = memo(function TextEditor(props: ITextEditorProps) {
  const {
    value,
    defaultValue,
    onChange,
    onValueChange,
    placeholder,
    rows,
    ...restProps
  } = props

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isControlled = value !== undefined
  const clampRows = (nextValue: string) => Math.min(Math.max(nextValue.split(/\r\n|\r|\n/).length || 1, 3), 8)
  const initialDerivedRows = useMemo(
    () => clampRows(value ?? defaultValue ?? ''),
    [defaultValue, value]
  )
  const [derivedRows, setDerivedRows] = useState(initialDerivedRows)
  const resolvedRows = rows ?? derivedRows

  useEffect(() => {
    if (!isControlled) {
      return
    }

    setDerivedRows(clampRows(value ?? ''))
  }, [isControlled, value])

  useEffect(() => {
    if (isControlled || rows !== undefined) {
      return
    }

    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    const syncFromDom = () => {
      setDerivedRows(clampRows(textarea.value))
    }

    syncFromDom()

    const form = textarea.form

    if (!form) {
      return
    }

    const handleReset = () => {
      Promise.resolve().then(syncFromDom)
    }

    form.addEventListener('reset', handleReset)

    return () => {
      form.removeEventListener('reset', handleReset)
    }
  }, [isControlled, rows])

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const nextValue = event.target.value

    if (!isControlled && rows === undefined) {
      setDerivedRows(clampRows(nextValue))
    }

    onChange?.(event)
    onValueChange?.(nextValue)
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('text-editor')],
  })

  return (
    <textarea
      key={isControlled ? 'controlled' : 'uncontrolled'}
      ref={textareaRef}
      {...commonProps}
      {...finalRestProps}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onChange={handleChange}
      placeholder={placeholder}
      rows={resolvedRows}
    />
  )
})
