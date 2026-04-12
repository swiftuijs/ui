import { Children, memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IBaseSplitViewProps extends IBaseComponent {
  /**
   * Relative pane fractions applied in source order.
   */
  fractions?: number[]
  /**
   * Whether dividers are rendered between panes.
   *
   * @default true
   */
  showDividers?: boolean
}

type SplitOrientation = 'horizontal' | 'vertical'

interface IBaseSplitViewInternalProps extends IBaseSplitViewProps {
  orientation: SplitOrientation
  testId: string
}

export const BaseSplitView = memo(function BaseSplitView(props: IBaseSplitViewInternalProps) {
  const {
    orientation,
    testId,
    fractions = [],
    showDividers = true,
    children,
    ...restProps
  } = props

  const panes = Children.toArray(children)

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('splitview'),
      prefixClass(`${orientation === 'horizontal' ? 'hsplitview' : 'vsplitview'}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-orientation={orientation}
      data-testid={testId}
    >
      {panes.map((pane, index) => {
        const fraction = fractions[index] ?? 1
        const isLast = index === panes.length - 1

        return (
          <div key={`pane-${index}`} className={prefixClass('splitview-segment')}>
            <div
              className={prefixClass('splitview-pane')}
              data-testid="splitview-pane"
              style={{ flexGrow: fraction, flexBasis: 0 }}
            >
              {pane}
            </div>
            {showDividers && !isLast ? (
              <div
                aria-hidden="true"
                className={prefixClass('splitview-divider')}
                data-orientation={orientation}
                data-testid="splitview-divider"
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
})
