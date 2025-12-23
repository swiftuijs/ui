import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { Image, IImageProps } from '.'

const meta: Meta<typeof Image> = {
  title: 'SwiftUI/Image',
  component: Image
}

export default meta

type Story = StoryObj<IImageProps>

export const ImageBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <Image />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function ImageWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Image />
      <Text>Right</Text>
    </VStack>
  )
}

export function ImageLeading () {
  return (
    <HStack>
      <Image />
      <Text>Text</Text>
    </HStack>
  )
}
