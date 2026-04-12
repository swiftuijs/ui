import { forwardRef, type CSSProperties } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

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
  /**
   * Whether interacting with the backdrop dismisses the sheet.
   * @default 'dismiss'
   */
  backgroundInteraction?: 'dismiss' | 'none'
  /**
   * Visual background treatment for the presented sheet.
   * @default 'automatic'
   */
  backgroundStyle?: 'automatic' | 'thinMaterial' | 'regularMaterial' | 'clear'
  /**
   * Overrides the sheet corner radius.
   */
  cornerRadius?: number | string
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
    backgroundInteraction = 'dismiss',
    backgroundStyle = 'automatic',
    cornerRadius,
    children,
    ...restProps
  } = props

  if (!isPresented) {
    return null
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundInteraction !== 'dismiss') {
      return
    }

    if (e.target === e.currentTarget && onDismiss) {
      onDismiss()
    }
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('sheet'),
      prefixClass(`sheet-${presentationStyle}`),
      prefixClass(`sheet-${backgroundStyle}`),
    ],
    style: {
      '--sw-sheet-corner-radius':
        typeof cornerRadius === 'number' ? `${cornerRadius}px` : cornerRadius,
    } as CSSProperties,
  })

  return (
    <div
      className={prefixClass('sheet-backdrop')}
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        {...commonProps}
        {...finalRestProps}
        data-background-interaction={backgroundInteraction}
        data-background-style={backgroundStyle}
        data-presentation-style={presentationStyle}
        ref={ref}
        role="dialog"
        aria-modal="true"
      >
        {showDragIndicator && presentationStyle !== 'fullScreen' && (
          <div className={prefixClass('sheet-drag-indicator')} data-testid="sheet-drag-indicator" />
        )}
        <div className={prefixClass('sheet-content')}>
          {children}
        </div>
      </div>
    </div>
  )
})
