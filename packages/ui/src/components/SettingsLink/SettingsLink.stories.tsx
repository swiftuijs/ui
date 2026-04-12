import type { Meta, StoryObj } from '@storybook/react-vite'

import { SettingsLink, type ISettingsLinkProps } from './index'

const meta: Meta<typeof SettingsLink> = {
  title: 'SwiftUI/SettingsLink',
  component: SettingsLink,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ISettingsLinkProps>

export const Default: Story = {
  args: {},
}

export const DestinationOverride: Story = {
  args: {
    href: '/settings/notifications',
    label: 'Notification settings',
  },
}
