import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '../Badge'

import { LabeledContent, type ILabeledContentProps } from '.'

const meta: Meta<typeof LabeledContent> = {
  title: 'SwiftUI/LabeledContent',
  component: LabeledContent,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ILabeledContentProps>

export const Default: Story = {
  args: {
    label: 'Email',
    value: 'me@example.com',
  },
}

export const CustomValue: Story = {
  render: () => (
    <LabeledContent label="Status">
      <Badge variant="success">Connected</Badge>
    </LabeledContent>
  ),
}
