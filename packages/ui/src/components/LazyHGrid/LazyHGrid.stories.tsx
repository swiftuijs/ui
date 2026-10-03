import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Card, VStack, ScrollView } from '../'
import { LazyHGrid, type ILazyHGridProps } from '.'

const meta: Meta<typeof LazyHGrid> = {
  title: 'SwiftUI/LazyHGrid',
  component: LazyHGrid,
  decorators: [(Story) => <ScrollView direction="horizontal" style={{ width: '100%' }}><Story /></ScrollView>],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that arranges its children in a horizontal grid, loading them lazily.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ILazyHGridProps>

const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}))

export const Default: Story = {
  args: {
    rows: 2,
    spacing: 10,
    children: items.map(item => (
      <Card key={item.id}>
        <VStack spacing={5} style={{ padding: '15px' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </VStack>
      </Card>
    ))
  }
}

export const ThreeRows: Story = {
  args: {
    rows: 3,
    spacing: 15,
    children: items.map(item => (
      <Card key={item.id}>
        <VStack spacing={5} style={{ padding: '20px' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </VStack>
      </Card>
    ))
  }
}

export const FourRows: Story = {
  args: {
    rows: 4,
    spacing: 10,
    children: items.map(item => (
      <Card key={item.id}>
        <VStack spacing={5} style={{ padding: '15px' }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </VStack>
      </Card>
    ))
  }
}

export const WithImages: Story = {
  render: () => (
    <LazyHGrid rows={2} spacing={10}>
      {items.map(item => (
        <Card key={item.id}>
          <VStack spacing={5}>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
            <Text style={{ padding: '10px', fontWeight: 'bold' }}>{item.name}</Text>
          </VStack>
        </Card>
      ))}
    </LazyHGrid>
  )
}

export const LargeGrid: Story = {
  render: () => {
    const largeItems = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`
    }))

    return (
      <LazyHGrid rows={3} spacing={10}>
        {largeItems.map(item => (
          <Card key={item.id}>
            <VStack spacing={5} style={{ padding: '15px' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            </VStack>
          </Card>
        ))}
      </LazyHGrid>
    )
  }
}


export const InScrollView: Story = {
  render: () => (
    <ScrollView direction="horizontal" style={{ height: 320 }}>
      <LazyHGrid rows={2} spacing={8} estimatedItemWidth={64}>
        {Array.from({ length: 1000 }, (_, index) => <div key={index}
          style={{ padding: 16, minWidth: 120, background: 'var(--sw-color-background-secondary)' }}>Item {index + 1}</div>)}
      </LazyHGrid>
    </ScrollView>
  ),
}
