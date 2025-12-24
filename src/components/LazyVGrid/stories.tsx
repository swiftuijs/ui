import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Card, VStack } from '../'
import { LazyVGrid, type ILazyVGridProps } from '.'

const meta: Meta<typeof LazyVGrid> = {
  title: 'SwiftUI/LazyVGrid',
  component: LazyVGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that arranges its children in a grid, loading them lazily.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ILazyVGridProps>

const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`
}))

export const Default: Story = {
  args: {
    columns: 3,
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

export const TwoColumns: Story = {
  args: {
    columns: 2,
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

export const FourColumns: Story = {
  args: {
    columns: 4,
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
    <LazyVGrid columns={3} spacing={10}>
      {items.map(item => (
        <Card key={item.id}>
          <VStack spacing={5}>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
            <Text style={{ padding: '10px', fontWeight: 'bold' }}>{item.name}</Text>
          </VStack>
        </Card>
      ))}
    </LazyVGrid>
  )
}

export const LargeGrid: Story = {
  render: () => {
    const largeItems = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`
    }))

    return (
      <LazyVGrid columns={3} spacing={10}>
        {largeItems.map(item => (
          <Card key={item.id}>
            <VStack spacing={5} style={{ padding: '15px' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            </VStack>
          </Card>
        ))}
      </LazyVGrid>
    )
  }
}

