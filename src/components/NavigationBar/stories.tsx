import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, HStack, Text, Button, NavigationStack } from '../'
import { NavigationBar, type INavigationBarProps } from '.'
import NavigationBarReadme from './README.mdx'

const meta: Meta<typeof NavigationBar> = {
  title: 'SwiftUI/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: NavigationBarReadme,
      description: {
        component: 'A navigation bar component that displays a title, optional back button, and toolbar items.'
      }
    }
  }
}

export default meta

type Story = StoryObj<INavigationBarProps>

export const Default: Story = {
  render: () => (
    <NavigationBar title="Home" />
  )
}

export const WithBackButton: Story = {
  render: () => (
    <NavigationBar 
      title="Details" 
      showBackButton={true}
      onBack={() => console.log('Back clicked')}
    />
  )
}

export const WithToolbarItems: Story = {
  render: () => (
    <NavigationBar 
      title="Product Details"
      showBackButton={true}
      onBack={() => console.log('Back clicked')}
      toolbarItems={
        <HStack spacing={8}>
          <Button>Share</Button>
          <Button>Edit</Button>
        </HStack>
      }
    />
  )
}

export const InNavigationStack: Story = {
  render: () => {
    return (
      <NavigationStack>
        <VStack spacing={20}>
          <NavigationBar title="Home" />
          <Text>Home Page Content</Text>
        </VStack>
      </NavigationStack>
    )
  }
}

