import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card, ContainerBackground, Text, VStack, type IContainerBackgroundProps } from '@/components'

const meta: Meta<typeof ContainerBackground> = {
  title: 'SwiftUI/ContainerBackground',
  component: ContainerBackground,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IContainerBackgroundProps>

export const Automatic: Story = {
  render: () => (
    <ContainerBackground>
      <Text style={{ padding: '12px 16px' }}>Automatic container surface</Text>
    </ContainerBackground>
  ),
}

export const NavigationSecondary: Story = {
  render: () => (
    <VStack spacing={12}>
      <ContainerBackground placement="navigation" emphasis="secondary">
        <Text style={{ padding: '12px 16px' }}>Navigation title group</Text>
      </ContainerBackground>
      <Card>
        <Text>Underlying content</Text>
      </Card>
    </VStack>
  ),
}
