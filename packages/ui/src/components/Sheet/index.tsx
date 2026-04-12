import { forwardRef, type CSSProperties } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'
import type { IPresentationDetent } from '@/types'

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
  /**
   * Available detents for the sheet height.
   * @default ['large']
   */
  presentationDetents?: IPresentationDetent[]
  /**
   * Currently selected detent.
   */
  selectedDetent?: IPresentationDetent
}

const DETENT_HEIGHT_MAP: Record<'medium' | 'large', string> = {
  medium: '60%',
  large: '90%',
}

function resolveDetentHeight(detent: IPresentationDetent | undefined) {
  if (detent == null) {
    return undefined
  }

  if (typeof detent === 'number') {
    return `${detent}px`
  }

  if (detent === 'medium' || detent === 'large') {
    return DETENT_HEIGHT_MAP[detent]
  }

  return detent
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
    presentationDetents = ['large'],
    selectedDetent,
    children,
    ...restProps
  } = props

  const resolvedDetent = selectedDetent ?? presentationDetents[0]
  const resolvedDetentHeight = resolveDetentHeight(resolvedDetent)

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
      '--sw-sheet-height': resolvedDetentHeight,
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
        data-presentation-detents={presentationDetents.join(',')}
        data-presentation-style={presentationStyle}
        data-selected-detent={resolvedDetent == null ? undefined : String(resolvedDetent)}
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
