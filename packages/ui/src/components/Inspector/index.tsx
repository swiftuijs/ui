import { memo, type ReactNode } from 'react'

import { prefixClass, standardizeProps, standardizeUnit } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IInspectorProps extends IBaseComponent {
  /**
   * Whether the inspector is visible.
   */
  isPresented: boolean
  /**
   * Called when the visibility should change.
   */
  onOpenChange?: (isPresented: boolean) => void
  /**
   * Inspector content rendered in the side panel.
   */
  content: ReactNode
  /**
   * Placement of the inspector relative to the main content.
   *
   * @default 'trailing'
   */
  placement?: 'leading' | 'trailing'
  /**
   * Panel width.
   *
   * @default 320
   */
  width?: number | string
  /**
   * Accessible title for the inspector region.
   */
  title?: string
  /**
   * Dismiss button label.
   *
   * @default 'Hide inspector'
   */
  dismissLabel?: string
}

/**
 * Inspector presents supplemental controls or details beside primary content.
 */
export const Inspector = memo(function Inspector(props: IInspectorProps) {
  const {
    children,
    content,
    dismissLabel = 'Hide inspector',
    isPresented,
    onOpenChange,
    placement = 'trailing',
    title = 'Inspector',
    width = 320,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('inspector'),
      prefixClass(`inspector-${placement}`),
    ],
  })

  return (
    <section
      {...commonProps}
      {...finalRestProps}
      data-placement={placement}
      data-testid="inspector-root"
    >
      {placement === 'leading' && isPresented ? (
        <aside
          aria-label={title}
          className={prefixClass('inspector-panel')}
          role="complementary"
          style={{ inlineSize: standardizeUnit(width) }}
        >
          <div className={prefixClass('inspector-header')}>
            <span className={prefixClass('inspector-title')}>{title}</span>
            <button
              className={prefixClass('inspector-dismiss')}
              onClick={() => onOpenChange?.(false)}
              type="button"
            >
              {dismissLabel}
            </button>
          </div>
          <div className={prefixClass('inspector-body')}>{content}</div>
        </aside>
      ) : null}
      <div className={prefixClass('inspector-main')}>
        {children}
      </div>
      {placement === 'trailing' && isPresented ? (
        <aside
          aria-label={title}
          className={prefixClass('inspector-panel')}
          role="complementary"
          style={{ inlineSize: standardizeUnit(width) }}
        >
          <div className={prefixClass('inspector-header')}>
            <span className={prefixClass('inspector-title')}>{title}</span>
            <button
              className={prefixClass('inspector-dismiss')}
              onClick={() => onOpenChange?.(false)}
              type="button"
            >
              {dismissLabel}
            </button>
          </div>
          <div className={prefixClass('inspector-body')}>{content}</div>
        </aside>
      ) : null}
    </section>
  )
})
