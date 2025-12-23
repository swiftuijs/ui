import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { Link, ILinkProps } from '.'

const meta: Meta<typeof Link> = {
  title: 'SwiftUI/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A control for navigating to a URL.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ILinkProps>

export const Default: Story = {
  args: {
    destination: 'https://example.com',
    children: 'Visit Example'
  }
}

export const WithText: Story = {
  args: {
    destination: 'https://apple.com',
    children: 'Visit Apple'
  }
}

export const NewTab: Story = {
  args: {
    destination: 'https://example.com',
    target: '_blank',
    children: 'Open in New Tab'
  }
}

export const InHStack: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Check out</Text>
      <Link destination="https://example.com">this link</Link>
      <Text>for more info</Text>
    </HStack>
  )
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10}>
      <Link destination="https://example.com">First Link</Link>
      <Link destination="https://apple.com">Second Link</Link>
      <Link destination="https://github.com">Third Link</Link>
    </VStack>
  )
}

export const CustomStyle: Story = {
  args: {
    destination: 'https://example.com',
    children: 'Styled Link',
    style: {
      color: '#007AFF',
      textDecoration: 'underline',
      fontSize: '18px'
    }
  }
}

export const MultipleLinks: Story = {
  render: () => (
    <VStack spacing={15}>
      <Link destination="https://example.com">Example.com</Link>
      <Link destination="https://apple.com" target="_blank">Apple.com (new tab)</Link>
      <Link destination="https://github.com">GitHub</Link>
    </VStack>
  )
}
