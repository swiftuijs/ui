import React, { Component } from 'react'
import { IPageType } from 'src/types'

import { NaviContext } from 'src/contexts'
import { eventBus } from 'src/common'
import { StandardPage, type IStandardProps } from './standard-page'
import { ActionSheet, type IActionSheetProps } from './action-sheet'

import './style.scss'

export type IPageProps = IActionSheetProps | IStandardProps


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
    container.setAttribute('date-page-status', 'entering')
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { noEnteringAnimation, ...restProps } = this.props
    switch (this.pageType) {
      case 'actionsheet':
        return <ActionSheet {...restProps} type='actionsheet' ref={this.containerRef} />
    
      default:
        return <StandardPage {...restProps} type='page' ref={this.containerRef} />
    }
  }


  /**
   * exit page
   * @param callback callback function executed after page exit animation is done
   * @returns 
   */
  exitPage(callback?: IFn) {
    if (!this.containerRef.current) return
    const container = this.containerRef.current
    const animationEnd = () => {
      container.removeEventListener('animationend', animationEnd)
      callback && callback()
    }
    container.addEventListener('animationend', animationEnd)
    container.setAttribute('date-page-status', 'exiting')
  }
}
