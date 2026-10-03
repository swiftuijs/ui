import { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'
import type { IPresentationDetent } from '@/types'
import { Modal } from '../_internal/Modal'
import { useSheetDrag } from '../_internal/use-sheet-drag'

import './style.scss'

/**
 * Props for Sheet component
 */
export interface ISheetProps extends IBaseComponent {
  /** Accessible name for the sheet. */
  title?: string
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
  /**
   * Initial detent when used in uncontrolled mode.
   */
  defaultSelectedDetent?: IPresentationDetent
  /**
   * Called when the selected detent changes.
   */
  onSelectedDetentChange?: (detent: IPresentationDetent) => void
  /**
   * Prevents interactive dismiss affordances like backdrop tap and Escape.
   * @default false
   */
  interactiveDismissDisabled?: boolean
}

const DETENT_HEIGHT_MAP: Record<'medium' | 'large', string> = {
  medium: '50%',
  large: '90%',
}

const DEFAULT_DETENTS: IPresentationDetent[] = ['large']

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

function resolveAvailableDetent(
  detent: IPresentationDetent | undefined,
  presentationDetents: IPresentationDetent[]
) {
  if (detent !== undefined && presentationDetents.includes(detent)) {
    return detent
  }

  return presentationDetents[0]
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
    title = 'Sheet',
    onDismiss,
    presentationStyle = 'pageSheet',
    showDragIndicator = true,
    backgroundInteraction = 'dismiss',
    backgroundStyle = 'automatic',
    cornerRadius,
    presentationDetents = DEFAULT_DETENTS,
    selectedDetent,
    defaultSelectedDetent,
    onSelectedDetentChange,
    interactiveDismissDisabled = false,
    children,
    ...restProps
  } = props

  const [internalSelectedDetent, setInternalSelectedDetent] = useState<IPresentationDetent>(() => {
    return resolveAvailableDetent(defaultSelectedDetent ?? selectedDetent, presentationDetents)
  })
  const availableDetents = presentationDetents.length ? presentationDetents : DEFAULT_DETENTS
  const isDetentControlled = selectedDetent !== undefined
  const resolvedDetent = resolveAvailableDetent(
    isDetentControlled ? selectedDetent : internalSelectedDetent,
    availableDetents
  )
  const resolvedDetentHeight = resolveDetentHeight(resolvedDetent)
  const canDismissInteractively = backgroundInteraction === 'dismiss' && !interactiveDismissDisabled
  const canAdjustDetents = presentationDetents.length > 1
  const wasPresented = useRef(false)

  useEffect(() => {
    const opening = isPresented && !wasPresented.current
    if (!isDetentControlled) {
      setInternalSelectedDetent(current => resolveAvailableDetent(
        opening ? defaultSelectedDetent : current,
        presentationDetents,
      ))
    }
    wasPresented.current = isPresented
  }, [defaultSelectedDetent, isDetentControlled, isPresented, presentationDetents])

  const handleDetentChange = (nextDetent: IPresentationDetent) => {
    if (!isDetentControlled) {
      setInternalSelectedDetent(nextDetent)
    }
    onSelectedDetentChange?.(nextDetent)
  }

  const { consumeClick, ...dragHandlers } = useSheetDrag({
    open: isPresented,
    detents: availableDetents,
    selectedDetent: resolvedDetent ?? 'large',
    dismissDisabled: interactiveDismissDisabled,
    onDismiss,
    onDetentChange: handleDetentChange,
  })

  if (!isPresented) return null

  const handleDragIndicatorClick = () => {
    if (!canAdjustDetents) {
      return
    }

    const currentIndex = presentationDetents.findIndex((detent) => detent === resolvedDetent)
    const fallbackIndex = currentIndex >= 0 ? currentIndex : 0
    const nextIndex = (fallbackIndex + 1) % presentationDetents.length
    handleDetentChange(presentationDetents[nextIndex])
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
    <Modal
        open={isPresented}
        onDismiss={onDismiss}
        dismissOnEscape={!interactiveDismissDisabled}
        dismissOnBackdrop={canDismissInteractively}
        overlayClassName={prefixClass('sheet-backdrop')}
        accessibleTitle={title}
        {...commonProps}
        {...finalRestProps}
        data-background-interaction={backgroundInteraction}
        data-background-style={backgroundStyle}
        data-interactive-dismiss-disabled={String(interactiveDismissDisabled)}
        data-presentation-detents={presentationDetents.join(',')}
        data-presentation-style={presentationStyle}
        data-selected-detent={resolvedDetent == null ? undefined : String(resolvedDetent)}
        ref={ref}
      >
        <div className={prefixClass('sheet-content')}>
        {showDragIndicator && presentationStyle !== 'fullScreen' && (
          <button
            aria-label="Adjust sheet height"
            className={prefixClass('sheet-drag-indicator')}
            data-testid="sheet-drag-indicator"
            disabled={!canAdjustDetents && interactiveDismissDisabled}
            {...dragHandlers}
            onClick={event => { if (!consumeClick(event.detail)) handleDragIndicatorClick() }}
            type="button"
          />
        )}
          <div className={prefixClass('sheet-body')}>{children}</div>
        </div>
    </Modal>
  )
})
