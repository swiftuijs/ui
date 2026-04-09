import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Card, VStack } from '../'
import { LazyHGrid, type ILazyHGridProps } from '.'

const meta: Meta<typeof LazyHGrid> = {
  title: 'SwiftUI/LazyHGrid',
  component: LazyHGrid,
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

