import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spacer, Text, VStack, HStack } from '../'
import { ScrollView, IScrollViewProps } from '.'

const meta: Meta<typeof ScrollView> = {
  title: 'SwiftUI/ScrollView',
  component: ScrollView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A scrollable view.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IScrollViewProps>

export const Default: Story = {
  render: () => (
    <ScrollView style={{ height: '200px' }}>
      <VStack spacing={10}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i}>Item {i + 1}</Text>
        ))}
      </VStack>
    </ScrollView>
  )
}

export const Vertical: Story = {
  args: {
    direction: 'vertical'
  },
  render: () => (
    <ScrollView direction="vertical" style={{ height: '200px' }}>
      <VStack spacing={10}>
        {Array.from({ length: 30 }, (_, i) => (
          <Text key={i}>Vertical Item {i + 1}</Text>
        ))}
      </VStack>
    </ScrollView>
  )
}

export const Horizontal: Story = {
  args: {
    direction: 'horizontal'
  },
  render: () => (
    <ScrollView direction="horizontal" style={{ width: '100%', height: '100px' }}>
      <HStack spacing={10}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i} style={{ whiteSpace: 'nowrap' }}>Item {i + 1}</Text>
        ))}
      </HStack>
    </ScrollView>
  )
}

export const WithoutIndicators: Story = {
  args: {
    showsIndicators: false
  },
  render: () => (
    <ScrollView showsIndicators={false} style={{ height: '200px' }}>
      <VStack spacing={10}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i}>Item {i + 1} (no scrollbar)</Text>
        ))}
      </VStack>
    </ScrollView>
  )
}

export const WithSpacer: Story = {
  render: () => (
    <ScrollView style={{ height: '200px' }}>
      <VStack spacing={10}>
        <Text>Top</Text>
        <Spacer />
        {Array.from({ length: 10 }, (_, i) => (
          <Text key={i}>Item {i + 1}</Text>
        ))}
        <Spacer />
        <Text>Bottom</Text>
      </VStack>
    </ScrollView>
  )
}

export const LongContent: Story = {
  render: () => (
    <ScrollView style={{ height: '300px' }}>
      <VStack spacing={15}>
        {Array.from({ length: 50 }, (_, i) => (
          <Text key={i}>Long content item {i + 1}</Text>
        ))}
      </VStack>
    </ScrollView>
  )
}

export const CustomStyle: Story = {
  render: () => (
    <ScrollView 
      style={{ 
        height: '200px', 
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px'
      }}
    >
      <VStack spacing={10}>
        {Array.from({ length: 15 }, (_, i) => (
          <Text key={i}>Styled Item {i + 1}</Text>
        ))}
      </VStack>
    </ScrollView>
  )
}