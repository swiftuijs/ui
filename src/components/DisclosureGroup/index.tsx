import { memo, useState } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A view that shows or hides its content based on a disclosure state.
 * 
 * DisclosureGroup creates an expandable/collapsible section with a toggle control.
 * 
 * @example
 * ```tsx
 * <DisclosureGroup label="More Info">
 *   <Text>Hidden content</Text>
 * </DisclosureGroup>
 * ```
 */
export interface IDisclosureGroupProps extends IBaseComponent {
  /**
   * The label for the disclosure toggle.
   */
  label: string
  /**
   * Whether the group is initially expanded.
   * 
   * @default false
   */
  defaultExpanded?: boolean
  /**
   * Controlled expanded state.
   * If provided, the component becomes controlled.
   */
  expanded?: boolean
  /**
   * Callback fired when the expanded state changes.
   */
  onExpandedChange?: (expanded: boolean) => void
}

export const DisclosureGroup = memo(function DisclosureGroup(props: IDisclosureGroupProps) {
  const {
    label,
    defaultExpanded = false,
    expanded: controlledExpanded,
    onExpandedChange,
    ...restProps
  } = props

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isControlled = controlledExpanded !== undefined
  const expanded = isControlled ? controlledExpanded : internalExpanded

  const handleToggle = () => {
    const newExpanded = !expanded
    if (!isControlled) {
      setInternalExpanded(newExpanded)
    }
    onExpandedChange?.(newExpanded)
  }

  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: [prefixClass('disclosuregroup'), expanded && prefixClass('disclosuregroup-expanded')]
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      <button
        type="button"
        className={prefixClass('disclosuregroup-toggle')}
        onClick={handleToggle}
        aria-expanded={expanded}
      >
        <span className={prefixClass('disclosuregroup-label')}>{label}</span>
        <span className={prefixClass('disclosuregroup-icon')}>
          {expanded ? '▼' : '▶'}
        </span>
      </button>
      {expanded && (
        <div className={prefixClass('disclosuregroup-content')}>
          {children}
        </div>
      )}
    </div>
  )
})

