import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text, Button } from '../'
import { Section, ISectionProps } from '.'

const meta: Meta<typeof Section> = {
  title: 'SwiftUI/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container view that groups related content.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ISectionProps>

export const Default: Story = {
  args: {
    children: <Text>Section content</Text>
  }
}

export const WithHeader: Story = {
  args: {
    header: <Text style={{ fontWeight: 'bold' }}>Section Header</Text>,
    children: <Text>Section content goes here</Text>
  }
}

export const MultipleSections: Story = {
  render: () => (
    <VStack spacing={20}>
      <Section header={<Text style={{ fontWeight: 'bold' }}>First Section</Text>}>
        <Text>Content of first section</Text>
      </Section>
      <Section header={<Text style={{ fontWeight: 'bold' }}>Second Section</Text>}>
        <Text>Content of second section</Text>
      </Section>
    </VStack>
  )
}

export const WithButtons: Story = {
  render: () => (
    <Section header={<Text style={{ fontWeight: 'bold' }}>Actions</Text>}>
      <VStack spacing={10}>
        <Button>Primary Action</Button>
        <Button>Secondary Action</Button>
      </VStack>
    </Section>
  )
}

export const ComplexContent: Story = {
  render: () => (
    <Section header={<Text style={{ fontWeight: 'bold', fontSize: '18px' }}>Details</Text>}>
      <VStack spacing={10}>
        <Text>Line 1</Text>
        <Text>Line 2</Text>
        <Text>Line 3</Text>
      </VStack>
    </Section>
  )
}

export const CustomStyle: Story = {
  render: () => (
    <Section 
      header={<Text style={{ fontWeight: 'bold' }}>Styled Section</Text>}
      style={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
    >
      <Text>Custom styled section content</Text>
    </Section>
  )
}
