import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, Text, VStack } from '../'
import { Inspector, type IInspectorProps } from '.'

const meta: Meta<typeof Inspector> = {
  title: 'SwiftUI/Inspector',
  component: Inspector,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Inspector>

function Demo(props: Partial<IInspectorProps>) {
  const [isPresented, setIsPresented] = useState(true)

  return (
    <VStack spacing={12}>
      <Button onClick={() => setIsPresented((value) => !value)}>
        {isPresented ? 'Hide inspector' : 'Show inspector'}
      </Button>
      <Inspector
        content={
          <VStack spacing={8}>
            <Text>Selection details</Text>
            <Text>Properties</Text>
            <Text>Actions</Text>
          </VStack>
        }
        isPresented={isPresented}
        onOpenChange={setIsPresented}
        style={{ minHeight: '280px' }}
        title="Inspector"
        {...props}
      >
        <VStack spacing={8}>
          <Text>Main document content</Text>
          <Text>Inspector is useful for secondary controls and metadata.</Text>
        </VStack>
      </Inspector>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Demo />,
}

export const Leading: Story = {
  render: () => <Demo placement="leading" />,
}
