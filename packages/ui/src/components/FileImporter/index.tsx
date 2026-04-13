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
   * SwiftUI-aligned alias for accepted file types.
   */
  allowedContentTypes?: string[]
  /**
   * Whether multiple files can be selected.
   *
   * @default false
   */
  multiple?: boolean
  /**
   * SwiftUI-aligned alias for multiple selection.
   *
   * @default false
   */
  allowsMultipleSelection?: boolean
  /**
   * Called with the selected files.
   */
  onSelect: (files: Array<globalThis.File>) => void
}

export const FileImporter = memo(function FileImporter(props: IFileImporterProps) {
  const {
    accept,
    multiple = false,
    allowedContentTypes,
    allowsMultipleSelection = false,
    onSelect,
    onClick,
    ...restProps
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const resolvedAccept = allowedContentTypes?.length ? allowedContentTypes.join(',') : accept
  const resolvedMultiple = allowsMultipleSelection || multiple
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
        accept={resolvedAccept}
        data-testid="file-importer-input"
        hidden
        multiple={resolvedMultiple}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
          if (files.length > 0) {
            onSelect(files)
          }
          event.target.value = ''
        }}
        ref={inputRef}
        type="file"
      />
    </>
  )
})
