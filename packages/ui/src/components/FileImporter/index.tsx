import { memo, useRef } from 'react'

import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A button-backed file picker that forwards selected files.
 *
 * @see https://developer.apple.com/documentation/swiftui/fileimporter
 */
export interface IFileImporterProps extends Omit<IBaseElementComponent<'button'>, 'type' | 'onSelect'> {
  /**
   * Accepted file types.
   */
  accept?: string
  /**
   * Whether multiple files can be selected.
   *
   * @default false
   */
  multiple?: boolean
  /**
   * Called with the selected files.
   */
  onSelect: (files: Array<globalThis.File>) => void
}

export const FileImporter = memo(function FileImporter(props: IFileImporterProps) {
  const { accept, multiple = false, onSelect, onClick, ...restProps } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('fileimporter'),
  })

  return (
    <>
      <button
        {...commonProps}
        {...finalRestProps}
        type="button"
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented) {
            return
          }
          inputRef.current?.click()
        }}
      >
        {children}
      </button>
      <input
        accept={accept}
        data-testid="file-importer-input"
        hidden
        multiple={multiple}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
          if (files.length > 0) {
            onSelect(files)
          }
        }}
        ref={inputRef}
        type="file"
      />
    </>
  )
})
