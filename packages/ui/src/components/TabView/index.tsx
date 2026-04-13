import { memo, useEffect, useId, useRef, useState, type ComponentRef, type KeyboardEvent, type ReactNode } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

export type TabValue = string | number
type TabButtonElement = ComponentRef<'button'>

/**
 * Tab item configuration
 */
export interface ITabItem {
  /**
   * Tab label
   */
  label: string
  /**
   * Tab icon (optional)
   */
  icon?: ReactNode
  /**
   * Optional badge content shown alongside the tab label.
   */
  badge?: ReactNode
  /**
   * Tab content
   */
  content: ReactNode
  /**
   * Stable selection value for this tab.
   */
  value?: TabValue
  /**
   * Whether the tab can be selected.
   */
  disabled?: boolean
}

/**
 * Props for TabView component
 */
export interface ITabViewProps extends Omit<IBaseElementComponent<'div'>, 'children'> {
  /**
   * Tab items
   */
  items: ITabItem[]
  /**
   * Initial selected tab value for uncontrolled usage.
   */
  defaultSelection?: TabValue
  /**
   * Controlled selected tab value.
   */
  selection?: TabValue
  /**
   * Legacy uncontrolled index alias.
   */
  initialIndex?: number
  /**
   * Legacy controlled index alias.
   */
  selectedIndex?: number
  /**
   * Tab selection change handler.
   */
  onSelectionChange?: (selection: TabValue) => void
  /**
   * Tab bar position.
   *
   * @default 'bottom'
   */
  tabBarPosition?: 'top' | 'bottom'
}

/**
 * A view that switches between multiple child views using interactive tabs.
 *
 * TabView exposes web-native `tablist`, `tab`, and `tabpanel` semantics while
 * aligning with SwiftUI's selection-driven mental model.
 *
 * @example
 * ```tsx
 * <TabView
 *   items={[
 *     { label: 'Home', value: 'home', content: <HomeView /> },
 *     { label: 'Settings', value: 'settings', content: <SettingsView /> },
 *   ]}
 *   selection="home"
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/tabview
 */
export const TabView = memo(function TabView(props: ITabViewProps) {
  const {
    items,
    defaultSelection,
    selection,
    initialIndex = 0,
    selectedIndex,
    onSelectionChange,
    tabBarPosition = 'bottom',
    ...restProps
  } = props

  const normalizedItems = items.map((item, index) => ({
    ...item,
    value: item.value ?? index,
  }))
  const firstEnabledItem = normalizedItems.find((item) => !item.disabled)
  const fallbackSelection = normalizedItems[initialIndex]?.disabled
    ? firstEnabledItem?.value ?? 0
    : normalizedItems[initialIndex]?.value ?? firstEnabledItem?.value ?? 0
  const controlledSelection = selection ?? (selectedIndex !== undefined ? normalizedItems[selectedIndex]?.value : undefined)
  const isControlled = controlledSelection !== undefined
  const [internalSelection, setInternalSelection] = useState<TabValue>(() => defaultSelection ?? fallbackSelection)
  const currentSelection = isControlled ? controlledSelection : internalSelection
  const currentSelectionIndex = normalizedItems.findIndex((item) => item.value === currentSelection)
  const preferredActiveItem = currentSelectionIndex >= 0 ? normalizedItems[currentSelectionIndex] : undefined
  const resolvedActiveItem = preferredActiveItem && !preferredActiveItem.disabled ? preferredActiveItem : firstEnabledItem
  const activeIndex = Math.max(
    0,
    resolvedActiveItem ? normalizedItems.findIndex((item) => item.value === resolvedActiveItem.value) : 0
  )
  const activeItem = normalizedItems[activeIndex]
  const baseId = useId().replace(/:/g, '')
  const tabRefs = useRef<Array<TabButtonElement | null>>([])

  useEffect(() => {
    if (!isControlled && normalizedItems.length > 0 && !normalizedItems.some((item) => item.value === internalSelection)) {
      setInternalSelection(defaultSelection ?? fallbackSelection)
    }
  }, [defaultSelection, fallbackSelection, internalSelection, isControlled, normalizedItems])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('tab-view'), tabBarPosition === 'top' ? prefixClass('tab-view-top') : prefixClass('tab-view-bottom')],
  })

  const {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
    ...containerProps
  } = finalRestProps

  const handleSelection = (nextSelection: TabValue) => {
    if (nextSelection === activeItem?.value) {
      return
    }

    if (!isControlled) {
      setInternalSelection(nextSelection)
    }

    onSelectionChange?.(nextSelection)
  }

  const focusAndSelect = (nextIndex: number) => {
    if (!normalizedItems.length) {
      return
    }

    let boundedIndex = (nextIndex + normalizedItems.length) % normalizedItems.length
    let attempts = 0

    while (normalizedItems[boundedIndex]?.disabled && attempts < normalizedItems.length) {
      boundedIndex = (boundedIndex + 1) % normalizedItems.length
      attempts += 1
    }

    const nextItem = normalizedItems[boundedIndex]

    if (!nextItem || nextItem.disabled) {
      return
    }

    tabRefs.current[boundedIndex]?.focus()
    handleSelection(nextItem.value)
  }

  const handleKeyDown = (event: KeyboardEvent<TabButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        focusAndSelect(index + 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        focusAndSelect(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusAndSelect(0)
        break
      case 'End':
        event.preventDefault()
        focusAndSelect(normalizedItems.length - 1)
        break
      default:
        break
    }
  }

  const renderTabs = () => (
    <div
      className={prefixClass('tab-bar')}
      role="tablist"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {normalizedItems.map((item, index) => {
        const isActive = index === activeIndex
        const tabId = `${baseId}-tab-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <button
            key={String(item.value)}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            id={tabId}
            role="tab"
            aria-selected={isActive}
            aria-controls={panelId}
            disabled={item.disabled}
            tabIndex={isActive ? 0 : -1}
            className={`${prefixClass('tab-item')} ${isActive ? prefixClass('tab-item-active') : ''}`}
            onClick={() => {
              if (item.disabled) return
              handleSelection(item.value)
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            type="button"
          >
            {item.icon && <span className={prefixClass('tab-icon')}>{item.icon}</span>}
            <span className={prefixClass('tab-label')}>{item.label}</span>
            {item.badge !== undefined && item.badge !== null && (
              <span className={prefixClass('tab-badge')}>{item.badge}</span>
            )}
          </button>
        )
      })}
    </div>
  )

  return (
    <div {...commonProps} {...containerProps}>
      {tabBarPosition === 'top' && renderTabs()}
      <div
        id={`${baseId}-panel-${activeIndex}`}
        className={prefixClass('tab-content')}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
        tabIndex={0}
      >
        {activeItem?.content}
      </div>
      {tabBarPosition === 'bottom' && renderTabs()}
    </div>
  )
})
