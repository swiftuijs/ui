import type { Meta, StoryObj } from '@storybook/react'

import { Card, ContainerRelativeFrame, HStack, Text, VStack } from '@swiftuijs/ui'

const meta: Meta<typeof ContainerRelativeFrame> = {
  title: 'SwiftUI/ContainerRelativeFrame',
  component: ContainerRelativeFrame,
}

export default meta

type Story = StoryObj<typeof ContainerRelativeFrame>

export const Horizontal: Story = {
  render: () => (
    <HStack spacing={12}>
      <ContainerRelativeFrame count={3} span={1} spacing={12}>
        <Card><Text>1/3</Text></Card>
      </ContainerRelativeFrame>
      <ContainerRelativeFrame count={3} span={2} spacing={12}>
        <Card><Text>2/3</Text></Card>
      </ContainerRelativeFrame>
    </HStack>
  ),
}

export const Vertical: Story = {
  render: () => (
    <VStack spacing={12}>
      <ContainerRelativeFrame axis="vertical" length={120}>
        <Card><Text>120px tall</Text></Card>
      </ContainerRelativeFrame>
      <ContainerRelativeFrame axis="vertical" length={180}>
        <Card><Text>180px tall</Text></Card>
      </ContainerRelativeFrame>
    </VStack>
  ),
}
