import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text, NavigationStack, NavigationLink, ScrollView } from '../../'
import { StandardPage, type IStandardProps } from '.'
import StandardPageReadme from './README.mdx'

const meta: Meta<typeof StandardPage> = {
  title: 'SwiftUI/StandardPage',
  component: StandardPage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: StandardPageReadme,
      description: {
        component: 'A standard page container used in NavigationStack with optional navigation bar.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IStandardProps>

export const Default: Story = {
  render: () => (
    <NavigationStack>
      <StandardPage id="page-1">
        <VStack spacing={20}>
          <Text>Page Content</Text>
        </VStack>
      </StandardPage>
    </NavigationStack>
  )
}

export const WithNavigationTitle: Story = {
  render: () => (
    <NavigationStack>
      <StandardPage id="page-1" navigationTitle="Home">
        <VStack spacing={20}>
          <Text>Page with Navigation Title</Text>
        </VStack>
      </StandardPage>
    </NavigationStack>
  )
}

export const WithToolbarItems: Story = {
  render: () => (
    <NavigationStack>
      <StandardPage 
        id="page-1" 
        navigationTitle="Edit Profile"
        toolbarItems={<Text>Save</Text>}
      >
        <VStack spacing={20}>
          <Text>Page with Toolbar Items</Text>
        </VStack>
      </StandardPage>
    </NavigationStack>
  )
}

export const WithBackButton: Story = {
  render: () => {
    function DetailPage() {
      return (
        <StandardPage id="detail" navigationTitle="Details">
          <VStack spacing={20}>
            <Text>Detail Page with Back Button</Text>
          </VStack>
        </StandardPage>
      )
    }
    
    return (
      <NavigationStack>
        <StandardPage id="home" navigationTitle="Home">
          <VStack spacing={20}>
            <NavigationLink destination={DetailPage}>
              <Text>Go to Detail</Text>
            </NavigationLink>
          </VStack>
        </StandardPage>
      </NavigationStack>
    )
  }
}

export const ScrollableContent: Story = {
  render: () => (
    <NavigationStack>
      <StandardPage id="page-1" navigationTitle="Scrollable Page">
        <ScrollView>
          <VStack spacing={20}>
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i}>Item {i + 1}</Text>
            ))}
          </VStack>
        </ScrollView>
      </StandardPage>
    </NavigationStack>
  )
}

