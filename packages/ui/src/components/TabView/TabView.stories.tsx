import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VStack, Text, Button } from '../'
import { TabView, type ITabViewProps } from '.'

const meta: Meta<typeof TabView> = {
  title: 'SwiftUI/TabView',
  component: TabView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that switches between multiple child views using interactive tabs.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ITabViewProps>

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Home',
        value: 'home',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Home</Text>
            <Text>Welcome to the home tab</Text>
          </VStack>
        ),
      },
      {
        label: 'Search',
        value: 'search',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Search</Text>
            <Text>Search content goes here</Text>
          </VStack>
        ),
      },
      {
        label: 'Profile',
        value: 'profile',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
            <Text>Profile content goes here</Text>
          </VStack>
        ),
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Home',
        value: 'home',
        icon: '🏠',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text>Home Content</Text>
          </VStack>
        ),
      },
      {
        label: 'Favorites',
        value: 'favorites',
        icon: '⭐',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text>Favorites Content</Text>
          </VStack>
        ),
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: '⚙️',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text>Settings Content</Text>
          </VStack>
        ),
      },
    ],
  },
}

export const TopTabBar: Story = {
  args: {
    tabBarPosition: 'top',
    items: [
      {
        label: 'Tab 1',
        value: 'tab-1',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text>Tab 1 Content</Text>
          </VStack>
        ),
      },
      {
        label: 'Tab 2',
        value: 'tab-2',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text>Tab 2 Content</Text>
          </VStack>
        ),
      },
      {
        label: 'Tab 3',
        value: 'tab-3',
        content: (
          <VStack spacing={20} style={{ padding: '20px' }}>
            <Text>Tab 3 Content</Text>
          </VStack>
        ),
      },
    ],
  },
}

function ControlledTabView() {
  const [selection, setSelection] = useState('tab-1')

  return (
    <div>
      <div style={{ padding: '10px', marginBottom: '10px' }}>
        <Button
          onClick={() =>
            setSelection((prev) => {
              if (prev === 'tab-1') return 'tab-2'
              if (prev === 'tab-2') return 'tab-3'
              return 'tab-1'
            })
          }
        >
          Next Tab
        </Button>
        <Text style={{ marginLeft: '10px' }}>Selected: {selection}</Text>
      </div>
      <TabView
        items={[
          {
            label: 'Tab 1',
            value: 'tab-1',
            content: <VStack style={{ padding: '20px' }}><Text>Tab 1</Text></VStack>,
          },
          {
            label: 'Tab 2',
            value: 'tab-2',
            content: <VStack style={{ padding: '20px' }}><Text>Tab 2</Text></VStack>,
          },
          {
            label: 'Tab 3',
            value: 'tab-3',
            content: <VStack style={{ padding: '20px' }}><Text>Tab 3</Text></VStack>,
          },
        ]}
        selection={selection}
        onSelectionChange={(nextSelection) => setSelection(String(nextSelection))}
      />
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTabView />,
}

export const WithDisabledTab: Story = {
  args: {
    items: [
      {
        label: 'Home',
        value: 'home',
        content: <VStack style={{ padding: '20px' }}><Text>Home</Text></VStack>,
      },
      {
        label: 'Search',
        value: 'search',
        disabled: true,
        content: <VStack style={{ padding: '20px' }}><Text>Search</Text></VStack>,
      },
      {
        label: 'Profile',
        value: 'profile',
        content: <VStack style={{ padding: '20px' }}><Text>Profile</Text></VStack>,
      },
    ],
    defaultSelection: 'home',
  },
}
