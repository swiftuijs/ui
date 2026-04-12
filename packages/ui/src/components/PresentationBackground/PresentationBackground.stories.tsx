import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { PresentationBackground, type IPresentationBackgroundProps } from './index'

const meta: Meta<typeof PresentationBackground> = {
  title: 'SwiftUI/PresentationBackground',
  component: PresentationBackground,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IPresentationBackgroundProps>

export const Automatic: Story = {
  render: () => (
    <PresentationBackground>
      <Text style={{ padding: '16px 20px' }}>Default modal chrome</Text>
    </PresentationBackground>
  ),
}

export const Materials: Story = {
  render: () => (
      <VStack spacing={12}>
      <PresentationBackground backgroundStyle="thinMaterial">
        <Text style={{ padding: '14px 18px' }}>Thin material panel</Text>
      </PresentationBackground>
      <PresentationBackground backgroundStyle="regularMaterial" shape="rounded">
        <Text style={{ padding: '16px 20px' }}>Regular material card</Text>
      </PresentationBackground>
      <PresentationBackground backgroundStyle="clear" shape="capsule">
        <Text style={{ padding: '12px 18px' }}>Clear chrome token</Text>
      </PresentationBackground>
    </VStack>
  ),
}
