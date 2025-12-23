import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text,  } from '../'
import { Section, ISectionProps } from '.'

const meta: Meta<typeof Section> = {
  title: 'SwiftUI/Section',
  component: Section
}

export default meta

type Story = StoryObj<ISectionProps>

export const SectionBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <Section />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function SectionWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Section>
        <Text>Right</Text>
      </Section>
      <Text>Right</Text>
    </VStack>
  )
}

export function SectionLeading () {
  return (
    <HStack>
      <Section />
      <Text>Text</Text>
    </HStack>
  )
}
