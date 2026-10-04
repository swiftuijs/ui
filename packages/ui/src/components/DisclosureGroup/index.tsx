import { memo, useId, useState, useRef } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'
import { useMotionPresence } from '../_internal/use-motion-presence'

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
  const contentRef = useRef<HTMLDivElement | null>(null)
  const present = useMotionPresence(expanded, contentRef)
  const baseId = useId().replace(/:/g, '')
  const buttonId = `${baseId}-disclosure-button`
  const contentId = `${baseId}-disclosure-content`

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
        id={buttonId}
        type="button"
        className={prefixClass('disclosuregroup-toggle')}
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        <span className={prefixClass('disclosuregroup-label')}>{label}</span>
        <span className={prefixClass('disclosuregroup-icon')} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m4 2 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      {present && (
        <div
          ref={node => {
            contentRef.current = node
            if (node) node.style.setProperty('--sw-disclosure-height', `${node.scrollHeight}px`)
          }}
          id={contentId}
          className={prefixClass('disclosuregroup-region')}
          data-state={expanded ? 'open' : 'closed'}
          aria-hidden={!expanded || undefined}
          role="region"
          aria-labelledby={buttonId}
        >
          <div className={prefixClass('disclosuregroup-content')}>{children}</div>
        </div>
      )}
    </div>
  )
})
