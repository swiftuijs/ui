import { memo, useRef } from 'react'

import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * PhotosPicker opens an image-only file picker and forwards selected assets.
 *
 * @see https://developer.apple.com/documentation/photosui/photospicker
 */
export interface IPhotosPickerProps extends Omit<IBaseElementComponent<'button'>, 'type' | 'onSelect'> {
  /**
   * Maximum number of selected items. Values above 1 enable multi-select.
   */
  selectionLimit?: number
  /**
   * Called with the selected image files.
   */
  onSelect: (files: Array<globalThis.File>) => void
}

export const PhotosPicker = memo(function PhotosPicker(props: IPhotosPickerProps) {
  const { onClick, onSelect, selectionLimit = 1, ...restProps } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const allowMultiple = selectionLimit !== 1
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('photospicker'),
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
        accept="image/*"
        data-testid="photos-picker-input"
        hidden
        multiple={allowMultiple}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
          if (files.length === 0) {
            return
          }
          const limitedFiles = selectionLimit > 0 ? files.slice(0, selectionLimit) : files
          onSelect(limitedFiles)
        }}
        ref={inputRef}
        type="file"
      />
    </>
  )
})
