import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VStack, HStack, Text, Button, Toggle } from '../'
import { GroupBox, type IGroupBoxProps } from '.'

const meta: Meta<typeof GroupBox> = {
  title: 'SwiftUI/GroupBox',
  component: GroupBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that visually groups related content with a border and optional label.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IGroupBoxProps>

export const Default: Story = {
  args: {
    label: 'Settings',
    children: (
      <VStack spacing={10} style={{ padding: '15px' }}>
        <Text>Setting 1</Text>
        <Text>Setting 2</Text>
      </VStack>
    )
  }
}

export const WithoutLabel: Story = {
  args: {
    children: (
      <VStack spacing={10} style={{ padding: '15px' }}>
        <Text>Content without label</Text>
        <Text>This GroupBox has no label</Text>
      </VStack>
    )
  }
}

export const WithFormControls: Story = {
  render: () => {
    const [toggle1, setToggle1] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    
    return (
      <GroupBox label="Preferences">
        <VStack spacing={15} style={{ padding: '15px' }}>
          <HStack spacing={10}>
            <Text>Enable notifications</Text>
            <Toggle isOn={toggle1} onChange={setToggle1} />
          </HStack>
          <HStack spacing={10}>
            <Text>Enable dark mode</Text>
            <Toggle isOn={toggle2} onChange={setToggle2} />
          </HStack>
        </VStack>
      </GroupBox>
    )
  }
}

export const MultipleGroupBoxes: Story = {
  render: () => (
    <VStack spacing={15}>
      <GroupBox label="Account">
        <VStack spacing={10} style={{ padding: '15px' }}>
          <Text>Username: user123</Text>
          <Text>Email: user@example.com</Text>
        </VStack>
      </GroupBox>
      <GroupBox label="Settings">
        <VStack spacing={10} style={{ padding: '15px' }}>
          <Text>Language: English</Text>
          <Text>Theme: Light</Text>
        </VStack>
      </GroupBox>
    </VStack>
  )
}

export const WithButtons: Story = {
  args: {
    label: 'Actions',
    children: (
      <VStack spacing={10} style={{ padding: '15px' }}>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </VStack>
    )
  }
}

