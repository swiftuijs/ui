import React, { Component } from 'react'
import { IPageType } from 'src/types'
import type { ITransitionConfig } from 'src/types/transition'

import { NaviContext } from 'src/contexts'
import { eventBus } from 'src/common'
import { StandardPage, type IStandardProps } from './standard-page'
import { ActionSheet, type IActionSheetProps } from './action-sheet'

import './style.scss'

/**
 * Props for Page component.
 * Can be either ActionSheet or StandardPage props.
 */
export type IPageProps = (IActionSheetProps | IStandardProps) & {
  /**
   * Transition configuration for page animation
   */
  transition?: ITransitionConfig
}

/**
 * A container view that represents a single page in a navigation hierarchy.
 * 
 * Page is used internally by NavigationStack to manage individual pages.
 * It handles page transitions and lifecycle events.
 * 
 * @example
 * ```tsx
 * <Page id="page-1" type="page">
 *   <Text>Page Content</Text>
 * </Page>
 * ```
 */
export class Page extends Component<IPageProps> {
  
  static contextType = NaviContext
  declare context: React.ContextType<typeof NaviContext>

  containerRef = React.createRef<HTMLDivElement>()
  pageType: IPageType

  constructor(props: IPageProps) {
    super(props)
    this.pageType = props.type || 'page'
    console.log('[page] created', this.pageType, this.props.id)
  }

  componentDidMount(): void {
    if (!this.containerRef.current) return
    const container = this.containerRef.current

    if (this.props.noEnteringAnimation) {
      eventBus.emit(`${this.context.eventPrefix}.page-entered`, this.props.id)
      return
    }
    // add entering animation
    const onAnimationEnd = () => {
      eventBus.emit(`${this.context.eventPrefix}.page-entered`, this.props.id)
      container.removeEventListener('animationend', onAnimationEnd)
    }
    container.addEventListener('animationend', onAnimationEnd)
    container.setAttribute('data-page-status', 'entering')
  }
  // optimize performance, only update when id or type changes
  // TODO: this may cause unexpected issues, check if this is the best way to optimize
  shouldComponentUpdate(nextProps: Readonly<IPageProps>): boolean {
    return this.props.id !== nextProps.id || this.props.type !== nextProps.type
  }

  UNSAFE_componentWillUpdate(nextProps: Readonly<IPageProps>): void {
    console.log('[page] update', this.pageType, this.props.id)
    console.log('[page] previous', this.props, 'nextProps', nextProps)
  }

  render() {
    console.log('[page] render', this.pageType, this.props.id)
    const { noEnteringAnimation: _, transition, ...restProps } = this.props
    switch (this.pageType) {
      case 'actionsheet':
        return <ActionSheet {...restProps} type='actionsheet' ref={this.containerRef} />
    
      default:
        return (
          <StandardPage 
            {...restProps} 
            type='page' 
            ref={this.containerRef}
            transition={transition}
          />
        )
    }
  }


  /**
   * Exits the page with an optional callback.
   * 
   * Triggers the exit animation and calls the callback when the animation completes.
   * 
   * @param callback - Optional callback function executed after page exit animation is done
   */
  exitPage(callback?: IFn) {
    if (!this.containerRef.current) return
    const container = this.containerRef.current
    const animationEnd = () => {
      container.removeEventListener('animationend', animationEnd)
      if (callback) callback()
    }
    container.addEventListener('animationend', animationEnd)
    container.setAttribute('data-page-status', 'exiting')
  }
}
