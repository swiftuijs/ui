import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, ScrollView } from '../'
import { LazyHStack, type ILazyHStackProps } from '.'

const meta: Meta<typeof LazyHStack> = {
  title: 'SwiftUI/LazyHStack',
  component: LazyHStack,
  decorators: [(Story) => <ScrollView direction="horizontal" style={{ width: '100%' }}><Story /></ScrollView>],
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
      <Text key={item.id} style={{ padding: '10px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        {item.name}
      </Text>
    ))
  }
}

export const InScrollView: Story = {
  render: () => (
    <ScrollView direction="horizontal" style={{ width: '100%', height: '100px' }}>
      <LazyHStack spacing={10}>
        {Array.from({ length: 1000 }, (_, index) => ({ id: index + 1, name: `Item ${index + 1}` })).map(item => (
          <Text key={item.id} style={{ padding: '15px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '8px', whiteSpace: 'nowrap' }}>
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
      <Text key={item.id} style={{ padding: '15px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '4px', whiteSpace: 'nowrap' }}>
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
      <Text key={item.id} style={{ padding: '10px', backgroundColor: 'var(--sw-color-background-secondary)', borderRadius: '4px', whiteSpace: 'nowrap' }}>
        {item.name}
      </Text>
    ))
  }
}

