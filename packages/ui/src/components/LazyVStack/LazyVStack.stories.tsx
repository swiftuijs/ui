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
      <Text key={item.id} style={{ padding: '10px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '4px' }}>
        {item.name}
      </Text>
    ))
  }
}

export const InScrollView: Story = {
  render: () => (
    <ScrollView style={{ height: '400px' }}>
      <LazyVStack spacing={10}>
        {Array.from({ length: 1000 }, (_, index) => ({ id: index + 1, name: `Item ${index + 1}` })).map(item => (
          <Text key={item.id} style={{ padding: '15px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '8px' }}>
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
      <Text key={item.id} style={{ padding: '15px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '4px' }}>
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
      <Text key={item.id} style={{ padding: '10px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '4px' }}>
        {item.name}
      </Text>
    ))
  }
}

