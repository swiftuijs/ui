import { memo, type ReactNode } from 'react'
import { prefixClass } from 'src/common'
import { Button } from '../Button'
import { HStack } from '../HStack'
import { Spacer } from '../Spacer'
import { Text } from '../Text'

import './style.scss'

/**
 * Props for NavigationBar component
 */
export interface INavigationBarProps {
  /**
   * Navigation bar title
   */
  title?: string
  /**
   * Whether to show back button
   * @default false
   */
  showBackButton?: boolean
  /**
   * Callback when back button is clicked
   */
  onBack?: () => void
  /**
   * Toolbar items to display on the right side
   */
  toolbarItems?: ReactNode
}

/**
 * A navigation bar component that displays a title, optional back button, and toolbar items.
 * 
 * NavigationBar is used internally by StandardPage to provide iOS-style navigation.
 * It follows SwiftUI's navigation bar design patterns.
 * 
 * @example
 * ```tsx
 * <NavigationBar 
 *   title="Home"
 *   showBackButton={false}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * <NavigationBar 
 *   title="Details"
 *   showBackButton={true}
 *   onBack={() => navigateBack()}
 *   toolbarItems={<Button>Share</Button>}
 * />
 * ```
 */
export const NavigationBar = memo(function NavigationBar(props: INavigationBarProps) {
  const { title, showBackButton = false, onBack, toolbarItems } = props

  return (
    <div className={prefixClass('navigation-bar')}>
      {/* Back Button or Spacer */}
      <div className={prefixClass('navigation-bar-leading')}>
        {showBackButton ? (
          <Button
            onClick={onBack}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: '8px 12px 8px 0',
              minWidth: 'auto',
              color: 'var(--sw-color-blue, #007AFF)',
              fontSize: '17px',
            }}
          >
            <HStack spacing={4} alignment="center">
              <Text style={{ fontSize: '20px', lineHeight: 1 }}>‹</Text>
              <Text style={{ fontSize: '17px' }}>Back</Text>
            </HStack>
          </Button>
        ) : null}
      </div>

      {/* Title */}
      {title && (
        <div className={prefixClass('navigation-bar-title')}>
          <Text
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Text>
        </div>
      )}

      {/* Toolbar Items */}
      <div className={prefixClass('navigation-bar-trailing')}>
        {toolbarItems}
      </div>
    </div>
  )
})

