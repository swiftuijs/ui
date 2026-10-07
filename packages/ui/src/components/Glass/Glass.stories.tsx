import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Alert, Button, ConfirmationDialog, HStack, Menu, NavigationBar, Sheet, TabView, Text, Toolbar, UIProvider, VStack } from '../'
import { Glass } from '.'
const meta: Meta<typeof Glass> = { title: 'SwiftUI/Glass', component: Glass, tags: ['autodocs'] }
export default meta
type Story = StoryObj<typeof Glass>
export const Default: Story = {
  render: () => <UIProvider glass theme="system">
    <VStack spacing={20} style={{ padding: 32, borderRadius: 24, background: 'linear-gradient(135deg, color-mix(in srgb, var(--sw-color-background-primary) 35%, #2563eb), color-mix(in srgb, var(--sw-color-background-primary) 35%, #7c3aed), color-mix(in srgb, var(--sw-color-background-primary) 35%, #db2777))' }}>
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

function PresentationMaterials() {
  const [presentation, setPresentation] = useState<'sheet' | 'alert' | 'actions' | null>(null)
  return <UIProvider glass={{ enabled: true, intensity: 0.6, variant: 'clear' }} theme="system">
    <VStack spacing={16} style={{ padding: 32, minHeight: 500, borderRadius: 24, background: 'linear-gradient(135deg, var(--sw-color-background-secondary), color-mix(in srgb, var(--sw-color-background-primary) 50%, #7c3aed))' }}>
      <Text>Presentations favor regular material, even when controls use clear.</Text>
      <Button onClick={() => setPresentation('sheet')}>Open material sheet</Button>
      <Button onClick={() => setPresentation('alert')}>Open material alert</Button>
      <Button onClick={() => setPresentation('actions')}>Open material actions</Button>
    </VStack>
    <Sheet title="Material sheet" isPresented={presentation === 'sheet'} onDismiss={() => setPresentation(null)} presentationDetents={['medium', 'large']}>
      <VStack spacing={16}><Text>Keep the task readable above the background.</Text><Button onClick={() => setPresentation(null)}>Close sheet</Button></VStack>
    </Sheet>
    <Alert title="Material alert" message="A short, legible message." isVisible={presentation === 'alert'} onDismiss={() => setPresentation(null)} />
    <ConfirmationDialog title="Material actions" message="Choose an action." isVisible={presentation === 'actions'} onDismiss={() => setPresentation(null)} actions={[{ label: 'Continue' }, { label: 'Cancel', style: 'cancel' }]} />
  </UIProvider>
}

export const Presentations: Story = { render: () => <PresentationMaterials /> }
