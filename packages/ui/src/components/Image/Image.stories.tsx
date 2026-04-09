import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text, ZStack } from '../'
import { Image, IImageProps } from '.'

const meta: Meta<typeof Image> = {
  title: 'SwiftUI/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays an image.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IImageProps>

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/200x200',
    alt: 'Placeholder image'
  }
}

export const WithAltText: Story = {
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'A sample image'
  }
}

export const InHStack: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Left</Text>
      <Image src="https://via.placeholder.com/100x100" alt="Image" />
      <Text>Right</Text>
    </HStack>
  )
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>Above</Text>
      <Image src="https://via.placeholder.com/200x150" alt="Image" />
      <Text>Below</Text>
    </VStack>
  )
}

export const WithCustomStyle: Story = {
  args: {
    src: 'https://via.placeholder.com/250x250',
    alt: 'Styled image',
    style: {
      borderRadius: '8px',
      border: '2px solid #007AFF'
    }
  }
}

export const InZStack: Story = {
  render: () => (
    <ZStack style={{ width: '300px', height: '200px' }}>
      <Image src="https://via.placeholder.com/300x200" alt="Background" />
      <Text style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        Overlay Text
      </Text>
    </ZStack>
  )
}

export const Responsive: Story = {
  args: {
    src: 'https://via.placeholder.com/400x300',
    alt: 'Responsive image',
    style: {
      maxWidth: '100%',
      height: 'auto'
    }
  }
}

export const MultipleImages: Story = {
  render: () => (
    <VStack spacing={15}>
      <Image src="https://via.placeholder.com/200x150" alt="Image 1" />
      <Image src="https://via.placeholder.com/200x150" alt="Image 2" />
      <Image src="https://via.placeholder.com/200x150" alt="Image 3" />
    </VStack>
  )
}
