import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, HStack, Menu, NavigationBar, TabView, Text, Toolbar, UIProvider, VStack } from '../'
import { Glass } from '.'
const meta: Meta<typeof Glass> = { title: 'SwiftUI/Glass', component: Glass, tags: ['autodocs'] }
export default meta
type Story = StoryObj<typeof Glass>
export const Default: Story = {
  render: () => <UIProvider glass theme="system">
    <VStack spacing={20} style={{ padding: 32, borderRadius: 24, background: 'linear-gradient(135deg, #bfdbfe, #ddd6fe, #fbcfe8)' }}>
      <Glass><HStack><Text>Regular material</Text><Button>Done</Button></HStack></Glass>
      <Glass glass={{ variant: 'clear', intensity: 0.8 }}><Text>Clear material over a rich background</Text></Glass>
      <Glass glass={false}><Text>Effects disabled</Text></Glass>
      <Glass glass={{ intensity: 0 }}><Text>Zero intensity</Text></Glass>
    </VStack>
  </UIProvider>,
}

export const NavigationSurfaces: Story = {
  render: () => <UIProvider glass={{ enabled: true, intensity: 0.6 }} theme="system">
    <div style={{ padding: 12, borderRadius: 24, background: 'linear-gradient(135deg, color-mix(in srgb, var(--sw-color-background-primary) 70%, #bfdbfe), color-mix(in srgb, var(--sw-color-background-primary) 70%, #fbcfe8))' }}>
      <NavigationBar title="Library" showBackButton toolbarItems={<Button>Done</Button>} />
      <div style={{ height: 220 }}>
        <TabView items={[
          { label: 'Recent', content: <VStack spacing={16} style={{ padding: 24 }}><Text>Recent documents</Text><Menu trigger={<Button>Document actions</Button>} items={[{ label: 'Rename' }, { label: 'Duplicate' }]} /></VStack> },
          { label: 'Shared', content: <Text>Shared documents</Text> },
        ]} />
      </div>
      <Toolbar aria-label="Library actions" items={[
        { placement: 'navigation', content: <Button>Add</Button> },
        { placement: 'principal', content: <Text>2 documents</Text> },
        { placement: 'confirmationAction', content: <Button>Select</Button> },
      ]} />
    </div>
  </UIProvider>,
}
