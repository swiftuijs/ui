import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text, Button } from '../'
import { ZStack, IZStackProps } from '.'

const meta: Meta<typeof ZStack> = {
  title: 'SwiftUI/ZStack',
  component: ZStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that overlays its children, aligning them in both axes.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IZStackProps>

export const Default: Story = {
  render: () => (
    <ZStack style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}>
      <Text style={{ color: 'lightblue' }}>Background Layer</Text>
      <VStack>
        <Text>Foreground Layer</Text>
      </VStack>
    </ZStack>
  )
}

export const WithAlignment: Story = {
  args: {
    alignment: 'center',
    children: (
      <>
        <div style={{ width: '100px', height: '100px', backgroundColor: 'rgba(0,122,255,0.3)' }} />
        <Text>Centered Text</Text>
      </>
    )
  }
}

export const ImageOverlay: Story = {
  render: () => (
    <ZStack style={{ width: '300px', height: '200px' }}>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }} />
      <VStack alignment="center">
        <Text style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Overlay Text
        </Text>
      </VStack>
    </ZStack>
  )
}

export const ButtonOverlay: Story = {
  render: () => (
    <ZStack style={{ width: '250px', height: '150px' }}>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5' }} />
      <Button>Overlay Button</Button>
    </ZStack>
  )
}

export const MultipleLayers: Story = {
  render: () => (
    <ZStack style={{ width: '200px', height: '200px' }}>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,0,0,0.2)' }} />
      <div style={{ width: '80%', height: '80%', backgroundColor: 'rgba(0,255,0,0.2)' }} />
      <div style={{ width: '60%', height: '60%', backgroundColor: 'rgba(0,0,255,0.2)' }} />
      <Text>Top Layer</Text>
    </ZStack>
  )
}

export const TopLeading: Story = {
  args: {
    alignment: 'top-leading',
    children: (
      <>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />
        <Text style={{ padding: '10px' }}>Top Leading</Text>
      </>
    )
  }
}

export const BottomTrailing: Story = {
  args: {
    alignment: 'bottom-trailing',
    children: (
      <>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />
        <Text style={{ padding: '10px' }}>Bottom Trailing</Text>
      </>
    )
  }
}
