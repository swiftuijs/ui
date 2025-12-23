import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text } from '../'
import { ZStack, IZStackProps } from '.'

const meta: Meta<typeof ZStack> = {
  title: 'SwiftUI/ZStack',
  component: ZStack
}

export default meta

type Story = StoryObj<IZStackProps>

export const ZStackNormal: Story = {
  render() {
    return (
      <ZStack>
        <Text style={{color: 'lightblue'}}> Layer 1 in Background</Text>
        <VStack>
          <Text>Layer 2</Text>
        </VStack>
      </ZStack>
    )
  }
}
