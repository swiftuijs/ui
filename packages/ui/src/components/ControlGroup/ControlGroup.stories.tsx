import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'

import { ControlGroup, type IControlGroupProps } from '.'

const meta: Meta<typeof ControlGroup> = {
  title: 'SwiftUI/ControlGroup',
  component: ControlGroup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IControlGroupProps>

export const Default: Story = {
  render: () => (
    <ControlGroup label="Formatting">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ControlGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ControlGroup label="Actions" orientation="vertical">
      <Button>Reply</Button>
      <Button>Forward</Button>
      <Button>Archive</Button>
    </ControlGroup>
  ),
}
