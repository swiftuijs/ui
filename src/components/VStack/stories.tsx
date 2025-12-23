import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Spacer } from '../'
import { VStack, IVStackProps } from '.'

const meta: Meta<typeof VStack> = {
  title: 'SwiftUI/VStack',
  component: VStack
}

export default meta

type Story = StoryObj<IVStackProps>

export const VStackNormal: Story = {
  render() {
    return (
      <VStack>
        <Text>SSSS</Text>
        <Text>SSSS</Text>
      </VStack>
    )
  }
}

export function VStackWithSpacer () {
  return (
    <VStack>
      <Spacer />
      <Text>SSSS</Text>
      <Text>SSSS</Text>
    </VStack>
  )
}