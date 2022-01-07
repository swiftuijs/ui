import React from 'react'
import { Story, Meta } from '@storybook/react'
import * as sw from '../index'

export default {
  title: 'Example/ScrollView',
  component: sw.ScrollView
} as Meta

export function ScrollViewVertical () {
  return (
    <sw.ScrollView>
      {Array(200).fill(0).map((v, i) => {
        return <sw.Text>index {i}</sw.Text>
      })}
    </sw.ScrollView>
  )
}

export function ScrollViewHorizontal () {
  return (
    <sw.ScrollView direction="horizontal">
      <sw.Spacer />
      {Array(200).fill(0).map((v, i) => {
        return <sw.Text>index {i}</sw.Text>
      })}
    </sw.ScrollView>
  )
}