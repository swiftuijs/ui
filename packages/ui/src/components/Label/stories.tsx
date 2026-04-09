import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label, type ILabelProps } from '.'

const meta: Meta<typeof Label> = {
  title: 'SwiftUI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays an icon and a title.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ILabelProps>

export const Default: Story = {
  args: {
    icon: '🏠',
    title: 'Home',
  },
}

export const IconOnly: Story = {
  args: {
    icon: '⭐',
    title: 'Favorites',
    variant: 'iconOnly',
  },
}

export const TitleOnly: Story = {
  args: {
    icon: '⚙️',
    title: 'Settings',
    variant: 'titleOnly',
  },
}

