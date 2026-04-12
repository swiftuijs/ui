import type { Meta, StoryObj } from '@storybook/react'

import { Card, ContentMargins, Text, VStack } from '@swiftuijs/ui'

const meta: Meta<typeof ContentMargins> = {
  title: 'SwiftUI/ContentMargins',
  component: ContentMargins,
}

export default meta

type Story = StoryObj<typeof ContentMargins>

export const Default: Story = {
  render: () => (
    <ContentMargins>
      <Card>
        <Text>Regular content margin wrapper</Text>
      </Card>
    </ContentMargins>
  ),
}

export const EdgeSpecific: Story = {
  render: () => (
    <ContentMargins edges={['top', 'horizontal']} value="compact">
      <VStack spacing={8}>
        <Text>Top + horizontal inset</Text>
        <Card>
          <Text>Compact margins</Text>
        </Card>
      </VStack>
    </ContentMargins>
  ),
}
