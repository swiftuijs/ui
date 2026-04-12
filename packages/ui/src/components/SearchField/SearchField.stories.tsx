import type { Meta, StoryObj } from '@storybook/react-vite'

import { SearchField } from '.'

const meta = {
  title: 'SwiftUI/SearchField',
  component: SearchField,
  args: {
    label: 'Search',
    placeholder: 'Find coffee',
    value: 'Flat white',
  },
} satisfies Meta<typeof SearchField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    value: '',
  },
}
