import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { ColorPicker, type IColorPickerProps } from '.'

const meta: Meta<typeof ColorPicker> = {
  title: 'SwiftUI/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IColorPickerProps>

function DemoColorPicker() {
  const [value, setValue] = useState('#0a84ff')

  return <ColorPicker label="Accent" onChange={setValue} value={value} />
}

export const Default: Story = {
  render: () => <DemoColorPicker />,
}
