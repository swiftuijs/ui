import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, HStack, Text } from '../'
import { GeometryReader, type IGeometryReaderProps } from '.'

const meta: Meta<typeof GeometryReader> = {
  title: 'SwiftUI/GeometryReader',
  component: GeometryReader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that provides geometry information to its children, allowing you to create responsive layouts based on container size.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IGeometryReaderProps>

export const Default: Story = {
  render: () => (
    <GeometryReader>
      {(geometry) => (
        <VStack spacing={10}>
          <Text>Width: {geometry.width}px</Text>
          <Text>Height: {geometry.height}px</Text>
          <Text>X: {geometry.x}px</Text>
          <Text>Y: {geometry.y}px</Text>
        </VStack>
      )}
    </GeometryReader>
  )
}

export const ResponsiveLayout: Story = {
  render: () => (
    <GeometryReader>
      {(geometry) => {
        const isWide = geometry.width > 600
        return isWide ? (
          <HStack spacing={20}>
            <Text>Wide Layout</Text>
            <Text>Width: {geometry.width}px</Text>
          </HStack>
        ) : (
          <VStack spacing={20}>
            <Text>Narrow Layout</Text>
            <Text>Width: {geometry.width}px</Text>
          </VStack>
        )
      }}
    </GeometryReader>
  )
}

export const DynamicSizing: Story = {
  render: () => (
    <div style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
      <GeometryReader>
        {(geometry) => (
          <VStack spacing={10} style={{ padding: '20px' }}>
            <Text style={{ fontSize: Math.min(geometry.width / 20, 24) }}>
              Responsive Font Size
            </Text>
            <div
              style={{
                width: `${Math.min(geometry.width * 0.8, 400)}px`,
                height: `${Math.min(geometry.height * 0.5, 200)}px`,
                backgroundColor: '#007AFF',
                borderRadius: '8px',
              }}
            />
            <Text>Container: {geometry.width} × {geometry.height}px</Text>
          </VStack>
        )}
      </GeometryReader>
    </div>
  )
}

export const CenteredContent: Story = {
  render: () => (
    <div style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}>
      <GeometryReader>
        {(geometry) => (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <VStack spacing={10}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Centered Content
              </Text>
              <Text>Container: {geometry.width} × {geometry.height}px</Text>
            </VStack>
          </div>
        )}
      </GeometryReader>
    </div>
  )
}

