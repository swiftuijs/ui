import type { IPageBaseComponent, IPresentationDetent } from 'src/types'
import { useRef, forwardRef, useImperativeHandle } from 'react'
import { standardizeProps } from 'src/common'
import { DragBar } from './dragbar'
import { useTransitionHeight } from './use-transition-height'
import './style.scss'

export interface IActionSheetProps extends IPageBaseComponent {
  presentationDetents?: IPresentationDetent[]
  /**
   * page type, default to 'page'
   */
  type: 'actionsheet'
}

const DEFAULT_DETENTS: IPresentationDetent[] = ['medium', 'large']

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
