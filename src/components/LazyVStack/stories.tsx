import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, ScrollView } from '../'
import { LazyVStack, type ILazyVStackProps } from '.'

const meta: Meta<typeof LazyVStack> = {
  title: 'SwiftUI/LazyVStack',
  component: LazyVStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that arranges its children vertically, loading them lazily.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ILazyVStackProps>

const items = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}))

export const Default: Story = {
  args: {
    spacing: 10,
    children: items.map(item => (
      <Text key={item.id} style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        {item.name}
      </Text>
    ))
  }
}

export const InScrollView: Story = {
  render: () => (
    <ScrollView style={{ height: '400px' }}>
      <LazyVStack spacing={10}>
        {items.map(item => (
          <Text key={item.id} style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            {item.name}
          </Text>
        ))}
      </LazyVStack>
    </ScrollView>
  )
}

export const WithEstimatedHeight: Story = {
  args: {
    spacing: 10,
    estimatedItemHeight: 50,
    children: items.slice(0, 20).map(item => (
      <Text key={item.id} style={{ padding: '15px', backgroundColor: '#e8e8e8', borderRadius: '4px' }}>
        {item.name}
      </Text>
    ))
  }
}

export const WithAlignment: Story = {
  args: {
    spacing: 10,
    alignment: 'leading',
    children: items.slice(0, 10).map(item => (
      <Text key={item.id} style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        {item.name}
      </Text>
    ))
  }
}

