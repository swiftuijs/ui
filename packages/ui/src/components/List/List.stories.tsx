import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text, Section, Divider, Button, HStack, Spacer } from '../'
import { List, IListProps } from '.'

const meta: Meta<typeof List> = {
  title: 'SwiftUI/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that presents rows of data arranged in a single column.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IListProps>

export const Default: Story = {
  args: {
    children: (
      <VStack spacing={0}>
        <div style={{ padding: '15px' }}><Text>Item 1</Text></div>
        <Divider />
        <div style={{ padding: '15px' }}><Text>Item 2</Text></div>
        <Divider />
        <div style={{ padding: '15px' }}><Text>Item 3</Text></div>
      </VStack>
    )
  }
}

export const WithSections: Story = {
  render: () => (
    <List>
      <Section header={<Text style={{ fontWeight: 'bold' }}>Section 1</Text>}>
        <VStack spacing={0}>
          <div style={{ padding: '15px' }}><Text>Item 1</Text></div>
          <Divider />
          <div style={{ padding: '15px' }}><Text>Item 2</Text></div>
        </VStack>
      </Section>
      <Section header={<Text style={{ fontWeight: 'bold' }}>Section 2</Text>}>
        <VStack spacing={0}>
          <div style={{ padding: '15px' }}><Text>Item 3</Text></div>
          <Divider />
          <div style={{ padding: '15px' }}><Text>Item 4</Text></div>
        </VStack>
      </Section>
    </List>
  )
}

export const SimpleList: Story = {
  render: () => (
    <List>
      <VStack spacing={0}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i}>
            <div style={{ padding: '15px' }}>
              <Text>List Item {i + 1}</Text>
            </div>
            {i < 4 && <Divider />}
          </div>
        ))}
      </VStack>
    </List>
  )
}

export const WithActions: Story = {
  render: () => (
    <List>
      <VStack spacing={0}>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i}>
            <div style={{ padding: '15px' }}>
              <HStack spacing={10}>
                <Text>Item {i + 1}</Text>
                <Spacer />
                <Button>Action</Button>
              </HStack>
            </div>
            {i < 2 && <Divider />}
          </div>
        ))}
      </VStack>
    </List>
  )
}

export const CustomStyle: Story = {
  render: () => (
    <List style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <VStack spacing={0}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <div style={{ padding: '15px' }}>
              <Text>Styled Item {i + 1}</Text>
            </div>
            {i < 3 && <Divider />}
          </div>
        ))}
      </VStack>
    </List>
  )
}
