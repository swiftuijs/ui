import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, HStack, Text, Button, Image } from '../'
import { Card, type ICardProps } from '.'

const meta: Meta<typeof Card> = {
  title: 'SwiftUI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that presents content on a card.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ICardProps>

export const Default: Story = {
  args: {
    children: (
      <VStack spacing={10} style={{ padding: '20px' }}>
        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Card Title</Text>
        <Text>Card content goes here</Text>
      </VStack>
    )
  }
}

export const WithImage: Story = {
  render: () => (
    <Card>
      <VStack spacing={10}>
        <Image src="https://via.placeholder.com/300x200" alt="Card image" />
        <VStack spacing={5} style={{ padding: '15px' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Card with Image</Text>
          <Text>This card contains an image and text content.</Text>
        </VStack>
      </VStack>
    </Card>
  )
}

export const WithButtons: Story = {
  render: () => (
    <Card>
      <VStack spacing={15} style={{ padding: '20px' }}>
        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Action Card</Text>
        <Text>This card contains action buttons.</Text>
        <HStack spacing={10}>
          <Button>Primary</Button>
          <Button>Secondary</Button>
        </HStack>
      </VStack>
    </Card>
  )
}

export const MultipleCards: Story = {
  render: () => (
    <VStack spacing={15}>
      <Card>
        <VStack spacing={10} style={{ padding: '20px' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Card 1</Text>
          <Text>First card content</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={10} style={{ padding: '20px' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Card 2</Text>
          <Text>Second card content</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={10} style={{ padding: '20px' }}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Card 3</Text>
          <Text>Third card content</Text>
        </VStack>
      </Card>
    </VStack>
  )
}

export const CustomStyle: Story = {
  render: () => (
    <Card style={{ padding: '25px', borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
      <VStack spacing={10}>
        <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Custom Styled Card</Text>
        <Text>This card has custom styling applied.</Text>
      </VStack>
    </Card>
  )
}

