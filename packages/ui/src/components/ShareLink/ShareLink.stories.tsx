import type { Meta, StoryObj } from '@storybook/react-vite'

import { ShareLink, type IShareLinkProps } from '.'

const meta: Meta<typeof ShareLink> = {
  title: 'SwiftUI/ShareLink',
  component: ShareLink,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IShareLinkProps>

export const Default: Story = {
  args: {
    item: 'https://swiftuijs.evecalm.com/docs',
    subject: 'SwiftUI.js',
    message: 'Take a look',
    children: 'Share docs',
  },
}
