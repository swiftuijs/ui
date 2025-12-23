import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text, NavigationStack } from '../'
import { NavigationLink, INavigationLinkProps } from '.'

const meta: Meta<typeof NavigationLink> = {
  title: 'SwiftUI/NavigationLink',
  component: NavigationLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that controls a navigation presentation.'
      }
    }
  }
}

export default meta

type Story = StoryObj<INavigationLinkProps>

function DetailPage() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Detail Page</Text>
      <Text>This is a detail page navigated from NavigationLink</Text>
      <NavigationLink dismiss>Go Back</NavigationLink>
    </VStack>
  )
}

export const Default: Story = {
  render: () => (
    <NavigationStack>
      <VStack spacing={20}>
        <NavigationLink destination={DetailPage}>
          <Text>Go to Detail</Text>
        </NavigationLink>
      </VStack>
    </NavigationStack>
  )
}

export const WithText: Story = {
  render: () => (
    <NavigationStack>
      <VStack spacing={20}>
        <NavigationLink destination={DetailPage}>
          <Text>Navigate to Detail Page</Text>
        </NavigationLink>
      </VStack>
    </NavigationStack>
  )
}

export const Dismiss: Story = {
  render: () => (
    <NavigationStack>
      <VStack spacing={20}>
        <NavigationLink destination={DetailPage}>
          <Text>Go to Detail</Text>
        </NavigationLink>
      </VStack>
    </NavigationStack>
  )
}

export const ActionSheet: Story = {
  render: () => {
    function SheetContent() {
      return (
        <VStack spacing={20}>
          <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Action Sheet</Text>
          <Text>This is an action sheet</Text>
          <NavigationLink dismiss>Dismiss</NavigationLink>
        </VStack>
      )
    }
    return (
      <NavigationStack>
        <VStack spacing={20}>
          <NavigationLink destination={SheetContent} pageOptions={{ type: 'actionsheet' }}>
            <Text>Show Action Sheet</Text>
          </NavigationLink>
        </VStack>
      </NavigationStack>
    )
  }
}

export const MultipleLinks: Story = {
  render: () => {
    function Page1() {
      return (
        <VStack spacing={20}>
          <Text>Page 1</Text>
          <NavigationLink dismiss>Back</NavigationLink>
        </VStack>
      )
    }
    function Page2() {
      return (
        <VStack spacing={20}>
          <Text>Page 2</Text>
          <NavigationLink dismiss>Back</NavigationLink>
        </VStack>
      )
    }
    return (
      <NavigationStack>
        <VStack spacing={15}>
          <NavigationLink destination={Page1}>
            <Text>Go to Page 1</Text>
          </NavigationLink>
          <NavigationLink destination={Page2}>
            <Text>Go to Page 2</Text>
          </NavigationLink>
        </VStack>
      </NavigationStack>
    )
  }
}

export const ExternalURL: Story = {
  args: {
    destination: 'https://example.com',
    children: 'External Link'
  }
}
