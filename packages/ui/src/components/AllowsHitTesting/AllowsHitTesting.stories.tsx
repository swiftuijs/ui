import type { Meta, StoryObj } from '@storybook/react-vite'

import { AllowsHitTesting, Button, Card, Text, VStack, type IAllowsHitTestingProps } from '@/components'

const meta: Meta<typeof AllowsHitTesting> = {
  title: 'SwiftUI/AllowsHitTesting',
  component: AllowsHitTesting,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IAllowsHitTestingProps>

export const Enabled: Story = {
  render: () => (
    <AllowsHitTesting>
      <Button>Primary action</Button>
    </AllowsHitTesting>
  ),
}

export const DisabledOverlay: Story = {
  render: () => (
    <VStack spacing={12}>
      <Card>
        <Text>Background content</Text>
      </Card>
      <AllowsHitTesting enabled={false}>
        <Button>Overlay action</Button>
      </AllowsHitTesting>
    </VStack>
  ),
}
