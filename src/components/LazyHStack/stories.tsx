import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, ScrollView } from '../'
import { LazyHStack, type ILazyHStackProps } from '.'

const meta: Meta<typeof LazyHStack> = {
  title: 'SwiftUI/LazyHStack',
  component: LazyHStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that arranges its children horizontally, loading them lazily.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ILazyHStackProps>

const items = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}))

export const Default: Story = {
  args: {
    spacing: 10,
    children: items.map(item => (
      <Text key={item.id} style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        {item.name}
      </Text>
    ))
  }
}

export const InScrollView: Story = {
  render: () => (
    <ScrollView direction="horizontal" style={{ width: '100%', height: '100px' }}>
      <LazyHStack spacing={10}>
        {items.map(item => (
          <Text key={item.id} style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', whiteSpace: 'nowrap' }}>
            {item.name}
          </Text>
        ))}
      </LazyHStack>
    </ScrollView>
  )
}

export const WithEstimatedWidth: Story = {
  args: {
    spacing: 10,
    estimatedItemWidth: 100,
    children: items.slice(0, 20).map(item => (
      <Text key={item.id} style={{ padding: '15px', backgroundColor: '#e8e8e8', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        {item.name}
      </Text>
    ))
  }
}

export const WithAlignment: Story = {
  args: {
    spacing: 10,
    alignment: 'center',
    children: items.slice(0, 10).map(item => (
      <Text key={item.id} style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        {item.name}
      </Text>
    ))
  }
}

