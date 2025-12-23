import type { IPageBaseComponent, IPresentationDetent } from 'src/types'
import { useRef, forwardRef, useImperativeHandle } from 'react'
import { standardizeProps } from 'src/common'
import { DragBar } from './dragbar'
import { useTransitionHeight } from './use-transition-height'
import './style.scss'

/**
 * Props for ActionSheet component.
 */
export interface IActionSheetProps extends IPageBaseComponent {
  /**
   * The presentation detents for the action sheet.
   * Detents define the stopping points when dragging the sheet.
   * 
   * @default ['medium', 'large']
   */
  presentationDetents?: IPresentationDetent[]
  /**
   * The page type. Must be 'actionsheet' for ActionSheet component.
   */
  type: 'actionsheet'
}

const DEFAULT_DETENTS: IPresentationDetent[] = ['medium', 'large']

/**
 * A view that presents an action sheet.
 * 
 * ActionSheet is a modal presentation style that slides up from the bottom of the screen.
 * It supports different detent sizes (medium, large, or custom percentages).
 * 
 * @example
 * ```tsx
 * <ActionSheet id="sheet-1" presentationDetents={['medium', 'large']}>
 *   <Text>Action Sheet Content</Text>
 * </ActionSheet>
 * ```
 */
export const ActionSheet = forwardRef(function ActionSheet(props: IActionSheetProps, ref) {
  const containerRef = useRef<HTMLDivElement | undefined>(undefined)
  const changeHeightEventName = useRef(`change-height-${Math.random().toString(36).slice(2)}`)

  const { type, presentationDetents = DEFAULT_DETENTS, ...pProps } = props
  const { commonProps, restProps, children } = standardizeProps(pProps,
    {
      className: ['sw-page'],
      'data-page-type': type,
    }
  )

  useTransitionHeight({
    container: containerRef,
    eventToChangeDetent: changeHeightEventName.current,
    presentationDetents,
  })

  // forward ref
  useImperativeHandle(ref, () => containerRef.current ?? undefined, [])

  return (
    <div {...commonProps} {...restProps} ref={containerRef}>
      <DragBar
        eventToChangeDetent={changeHeightEventName.current}
        container={containerRef}
        presentationDetents={presentationDetents} />
      {children}
    </div>
  )
})
