import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhotosPicker } from '.'

const meta = {
  title: 'SwiftUI/PhotosPicker',
  component: PhotosPicker,
  args: {
    children: 'Choose photos',
    onSelect: () => undefined,
    selectionLimit: 1,
  },
} satisfies Meta<typeof PhotosPicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleSelection: Story = {
  args: {
    children: 'Choose gallery items',
    selectionLimit: 4,
  },
}
