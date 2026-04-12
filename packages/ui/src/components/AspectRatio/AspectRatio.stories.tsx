import type { Meta, StoryObj } from '@storybook/react'

import { AspectRatio, Card, Text, VStack } from '@swiftuijs/ui'

const meta: Meta<typeof AspectRatio> = {
  title: 'SwiftUI/AspectRatio',
  component: AspectRatio,
}

export default meta

type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <AspectRatio ratio={[4, 3]}>
      <Card>
        <VStack spacing={8}>
          <Text>AspectRatio content</Text>
          <Text>4:3 fit container</Text>
        </VStack>
      </Card>
    </AspectRatio>
  ),
}

export const Fill: Story = {
  render: () => (
    <AspectRatio ratio={[16, 9]} contentMode="fill">
      <img
        alt="Gradient"
        src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80"
      />
    </AspectRatio>
  ),
}
