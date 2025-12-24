import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, HStack, Text, Button } from '../'
import { ForEach, type IForEachProps } from '.'

const meta: Meta<typeof ForEach> = {
  title: 'SwiftUI/ForEach',
  component: ForEach,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A utility function for rendering arrays of data.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IForEachProps<any>>

const items = [
  { id: 1, name: 'Item 1', value: 10 },
  { id: 2, name: 'Item 2', value: 20 },
  { id: 3, name: 'Item 3', value: 30 }
]

export const Default: Story = {
  args: {
    data: items,
    keyExtractor: (item) => item.id,
    renderItem: (item) => (
      <Text>{item.name} - Value: {item.value}</Text>
    )
  }
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10}>
      <ForEach
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <Text style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            {item.name}
          </Text>
        )}
      />
    </VStack>
  )
}

export const WithIndex: Story = {
  render: () => (
    <VStack spacing={10}>
      <ForEach
        data={items}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={(item, index) => (
          <HStack spacing={10}>
            <Text style={{ fontWeight: 'bold' }}>{index + 1}.</Text>
            <Text>{item.name}</Text>
          </HStack>
        )}
      />
    </VStack>
  )
}

export const WithButtons: Story = {
  render: () => (
    <VStack spacing={10}>
      <ForEach
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <HStack spacing={10}>
            <Text>{item.name}</Text>
            <Button onClick={() => alert(`Clicked ${item.name}`)}>
              Action
            </Button>
          </HStack>
        )}
      />
    </VStack>
  )
}

export const ComplexItems: Story = {
  render: () => {
    const complexItems = [
      { id: 1, title: 'First Item', description: 'Description 1', count: 5 },
      { id: 2, title: 'Second Item', description: 'Description 2', count: 10 },
      { id: 3, title: 'Third Item', description: 'Description 3', count: 15 }
    ]

    return (
      <VStack spacing={15}>
        <ForEach
          data={complexItems}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <VStack spacing={5} style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={{ color: '#666' }}>Count: {item.count}</Text>
            </VStack>
          )}
        />
      </VStack>
    )
  }
}

