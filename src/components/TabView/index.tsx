import { memo, useState, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

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
   * Tab content
   */
  content: ReactNode
  /**
   * Tab identifier (optional, uses index if not provided)
   */
  id?: string
}

/**
 * Props for TabView component
 */
export interface ITabViewProps extends IBaseComponent {
  /**
   * Tab items
   */
  items: ITabItem[]
  /**
   * Initial selected tab index
   * @default 0
   */
  initialIndex?: number
  /**
   * Selected tab index (controlled)
   */
  selectedIndex?: number
  /**
   * Tab selection change handler
   * @param index - Selected tab index
   */
  onSelectionChange?: (index: number) => void
  /**
   * Tab bar position
   * @default 'bottom'
   */
  tabBarPosition?: 'top' | 'bottom'
}

/**
 * A view that switches between multiple child views using interactive tabs.
 * 
 * TabView displays a tab bar with multiple tabs, each associated with a content view.
 * Users can switch between tabs by tapping the tab bar items.
 * 
 * @example
 * ```tsx
 * <TabView
 *   items={[
 *     { label: 'Home', content: <HomeView /> },
 *     { label: 'Settings', content: <SettingsView /> },
 *   ]}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/tabview
 */
export const TabView = memo(function TabView(props: ITabViewProps) {
  const {
    items,
    initialIndex = 0,
    selectedIndex: controlledIndex,
    onSelectionChange,
    tabBarPosition = 'bottom',
    ...restProps
  } = props

  const [internalIndex, setInternalIndex] = useState(initialIndex)
  const isControlled = controlledIndex !== undefined
  const selectedIndex = isControlled ? controlledIndex : internalIndex

  const handleTabClick = (index: number) => {
    if (!isControlled) {
      setInternalIndex(index)
    }
    if (onSelectionChange) {
      onSelectionChange(index)
    }
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('tab-view'), tabBarPosition === 'top' ? prefixClass('tab-view-top') : prefixClass('tab-view-bottom')],
  })

  const selectedContent = items[selectedIndex]?.content

  return (
    <div {...commonProps} {...finalRestProps}>
      {tabBarPosition === 'top' && (
        <div className={prefixClass('tab-bar')}>
          {items.map((item, index) => (
            <button
              key={item.id || index}
              className={`${prefixClass('tab-item')} ${selectedIndex === index ? prefixClass('tab-item-active') : ''}`}
              onClick={() => handleTabClick(index)}
              type="button"
            >
              {item.icon && <span className={prefixClass('tab-icon')}>{item.icon}</span>}
              <span className={prefixClass('tab-label')}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
      <div className={prefixClass('tab-content')}>
        {selectedContent}
      </div>
      {tabBarPosition === 'bottom' && (
        <div className={prefixClass('tab-bar')}>
          {items.map((item, index) => (
            <button
              key={item.id || index}
              className={`${prefixClass('tab-item')} ${selectedIndex === index ? prefixClass('tab-item-active') : ''}`}
              onClick={() => handleTabClick(index)}
              type="button"
            >
              {item.icon && <span className={prefixClass('tab-icon')}>{item.icon}</span>}
              <span className={prefixClass('tab-label')}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

