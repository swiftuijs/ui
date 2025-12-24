import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VStack, Text, Button } from '../'
import { DisclosureGroup, type IDisclosureGroupProps } from '.'

const meta: Meta<typeof DisclosureGroup> = {
  title: 'SwiftUI/DisclosureGroup',
  component: DisclosureGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that shows or hides its content based on a disclosure state.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IDisclosureGroupProps>

export const Default: Story = {
  args: {
    label: 'More Info',
    children: (
      <VStack spacing={10} style={{ padding: '15px' }}>
        <Text>Hidden content</Text>
        <Text>This content is shown when expanded</Text>
      </VStack>
    )
  }
}

export const DefaultExpanded: Story = {
  args: {
    label: 'Details',
    defaultExpanded: true,
    children: (
      <VStack spacing={10} style={{ padding: '15px' }}>
        <Text>This content is shown by default</Text>
        <Text>You can collapse it by clicking the label</Text>
      </VStack>
    )
  }
}

function ControlledDisclosureGroup() {
  const [expanded, setExpanded] = useState(false)

  return (
    <VStack spacing={20}>
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'} Programmatically
      </Button>
      <DisclosureGroup
        label="Settings"
        expanded={expanded}
        onExpandedChange={setExpanded}
      >
        <VStack spacing={10} style={{ padding: '15px' }}>
          <Text>Setting 1</Text>
          <Text>Setting 2</Text>
          <Text>Setting 3</Text>
        </VStack>
      </DisclosureGroup>
    </VStack>
  )
}

export const Controlled: Story = {
  render: () => <ControlledDisclosureGroup />
}

export const MultipleGroups: Story = {
  render: () => (
    <VStack spacing={15}>
      <DisclosureGroup label="Section 1">
        <VStack spacing={10} style={{ padding: '15px' }}>
          <Text>Content for section 1</Text>
        </VStack>
      </DisclosureGroup>
      <DisclosureGroup label="Section 2">
        <VStack spacing={10} style={{ padding: '15px' }}>
          <Text>Content for section 2</Text>
        </VStack>
      </DisclosureGroup>
      <DisclosureGroup label="Section 3">
        <VStack spacing={10} style={{ padding: '15px' }}>
          <Text>Content for section 3</Text>
        </VStack>
      </DisclosureGroup>
    </VStack>
  )
}

export const WithComplexContent: Story = {
  args: {
    label: 'Advanced Options',
    children: (
      <VStack spacing={15} style={{ padding: '15px' }}>
        <Text style={{ fontWeight: 'bold' }}>Advanced Settings</Text>
        <Text>Option 1: Enable feature A</Text>
        <Text>Option 2: Enable feature B</Text>
        <Text>Option 3: Enable feature C</Text>
        <Button>Apply Settings</Button>
      </VStack>
    )
  }
}

