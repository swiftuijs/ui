import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Spacer, Text, VStack, HStack } from '../'
import { Button } from '../Button'
import { ScrollTarget } from '../ScrollTarget'
import { ScrollView, IScrollViewProps, type IScrollPosition } from '.'

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

function ProgrammaticPositionDemo() {
  const [scrollPosition, setScrollPosition] = useState<IScrollPosition>()

  return (
    <VStack spacing={12}>
      <HStack spacing={8}>
        <Button onClick={() => setScrollPosition({ target: 'top' })}>Scroll to top</Button>
        <Button onClick={() => setScrollPosition({ target: 'middle' })}>Scroll to middle</Button>
        <Button onClick={() => setScrollPosition({ target: 'bottom' })}>Scroll to bottom</Button>
      </HStack>
      <ScrollView scrollPosition={scrollPosition} style={{ height: '220px' }}>
        <VStack spacing={12}>
          <ScrollTarget scrollId="top">
            <Text>Top anchor</Text>
          </ScrollTarget>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i}>Scrollable item {i + 1}</Text>
          ))}
          <ScrollTarget scrollId="middle">
            <Text>Middle anchor</Text>
          </ScrollTarget>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={`tail-${i}`}>Tail item {i + 1}</Text>
          ))}
          <ScrollTarget scrollId="bottom">
            <Text>Bottom anchor</Text>
          </ScrollTarget>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

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

export const ProgrammaticPosition: Story = {
  render: () => <ProgrammaticPositionDemo />,
}
