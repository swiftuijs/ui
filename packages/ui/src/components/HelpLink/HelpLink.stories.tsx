import type { Meta, StoryObj } from '@storybook/react-vite'

import { HelpLink, type IHelpLinkProps } from './index'

const meta: Meta<typeof HelpLink> = {
  title: 'SwiftUI/HelpLink',
  component: HelpLink,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IHelpLinkProps>

export const Default: Story = {
  args: {
    href: 'https://example.com/help',
  },
}

export const CustomLabel: Story = {
  args: {
    href: 'https://example.com/support',
    label: 'View support article',
  },
}
