import { StandardPage, type IStandardProps } from './standard-page'
import { ActionSheet, type IActionSheetProps } from './action-sheet'

import './style.scss'

export type IPageProps = IActionSheetProps | IStandardProps

import React, { Component } from 'react'
import { IPageType } from 'src/types'

export class Page extends Component<IPageProps> {
  // ref 
  containerRef = React.createRef<HTMLDivElement>()
  pageType: IPageType
  onPageExited?: () => void
  constructor(props: IPageProps) {
    super(props)
    this.pageType = props.type || 'page'
    this.onPageExited = props.onPageExited
  }

  componentDidMount(): void {
    if (this.containerRef.current) {
      this.containerRef.current.setAttribute('date-page-status', 'entering')
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { onPageExited, ...restProps } = this.props
    switch (this.pageType) {
      case 'actionsheet':
        return <ActionSheet {...restProps} type='actionsheet' ref={this.containerRef} />
    
      default:
        return <StandardPage {...restProps} type='page' ref={this.containerRef} />
    }
  }

  // componentWillUnmount(): void {
  //   if (this.containerRef.current) {
  //     this.containerRef.current.setAttribute('date-page-status', 'exiting')
  //   }
  // }

  exitPage() {
    if (!this.containerRef.current) return
    const container = this.containerRef.current

    const animationEnd = () => {
      container.removeEventListener('animationend', animationEnd)
      this.onPageExited && this.onPageExited()
    }
    container.addEventListener('animationend', animationEnd)
    container.setAttribute('date-page-status', 'exiting')
  }
}
