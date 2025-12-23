import { forwardRef } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Sheet component
 */
export interface ISheetProps extends IBaseComponent {
  /**
   * Whether the sheet is presented
   */
  isPresented: boolean
  /**
   * Callback when sheet is dismissed
   */
  onDismiss?: () => void
  /**
   * Sheet presentation style
   * @default 'pageSheet'
   */
  presentationStyle?: 'pageSheet' | 'formSheet' | 'fullScreen'
  /**
   * Whether to show drag indicator
   * @default true
   */
  showDragIndicator?: boolean
}

/**
 * A view that presents content as a modal sheet.
 * 
 * Sheet is a modal presentation style that slides up from the bottom of the screen.
 * It's similar to ActionSheet but provides more presentation options.
 * 
 * @example
 * ```tsx
 * <Sheet isPresented={showSheet} onDismiss={() => setShowSheet(false)}>
 *   <VStack>
 *     <Text>Sheet Content</Text>
 *   </VStack>
 * </Sheet>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/sheet
 */
export const Sheet = forwardRef<HTMLDivElement, ISheetProps>(function Sheet(
  props,
  ref
) {
  const {
    isPresented,
    onDismiss,
    presentationStyle = 'pageSheet',
    showDragIndicator = true,
    children,
    ...restProps
  } = props

  if (!isPresented) {
    return null
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onDismiss) {
      onDismiss()
    }
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('sheet'),
      prefixClass(`sheet-${presentationStyle}`),
    ],
  })

  return (
    <div
      className={prefixClass('sheet-backdrop')}
      onClick={handleBackdropClick}
    >
      <div
        {...commonProps}
        {...finalRestProps}
        ref={ref}
        role="dialog"
        aria-modal="true"
      >
        {showDragIndicator && presentationStyle !== 'fullScreen' && (
          <div className={prefixClass('sheet-drag-indicator')} />
        )}
        <div className={prefixClass('sheet-content')}>
          {children}
        </div>
      </div>
    </div>
  )
})

