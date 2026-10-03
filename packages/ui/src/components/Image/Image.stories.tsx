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
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E',
    alt: 'Placeholder image'
  }
}

export const WithAltText: Story = {
  args: {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E',
    alt: 'A sample image'
  }
}

export const InHStack: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Left</Text>
      <Image src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E" alt="Image" />
      <Text>Right</Text>
    </HStack>
  )
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>Above</Text>
      <Image src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E" alt="Image" />
      <Text>Below</Text>
    </VStack>
  )
}

export const WithCustomStyle: Story = {
  args: {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E',
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
      <Image src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E" alt="Background" />
      <Text style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        Overlay Text
      </Text>
    </ZStack>
  )
}

export const Responsive: Story = {
  args: {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E',
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
      <Image src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E" alt="Image 1" />
      <Image src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E" alt="Image 2" />
      <Image src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E" alt="Image 3" />
    </VStack>
  )
}
