import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button, Glass, HStack, Menu, Sheet, Text, Toggle, VStack } from '../'
import { UIProvider } from '.'

const meta: Meta<typeof UIProvider> = { title: 'SwiftUI/UIProvider', component: UIProvider, tags: ['autodocs'] }
export default meta
type Story = StoryObj<typeof UIProvider>

function AppearanceDemo({ system = false }: { system?: boolean }) {
  const [dark, setDark] = useState(false), [glass, setGlass] = useState(true), [open, setOpen] = useState(false)
  return <UIProvider theme={system ? 'system' : dark ? 'dark' : 'light'} accentColor={dark ? '#C4B5FD' : '#7952B3'} glass={{ enabled: glass, intensity: 0.6 }}
    tokens={{ '--sw-radius-sheet': '28px', '--sw-color-action-fill': '#7952B3' }}>
    <VStack spacing={20} style={{ padding: 24, borderRadius: 24, background: 'var(--sw-color-background-secondary)' }}>
      {!system && <HStack spacing={12}><Text>Dark theme</Text><Toggle aria-label="Dark theme" isOn={dark} onChange={setDark} /></HStack>}
      <HStack spacing={12}><Text>Liquid Glass</Text><Toggle aria-label="Liquid Glass" isOn={glass} onChange={setGlass} /></HStack>
      <div style={{ padding: '32px 16px', borderRadius: 24, background: 'linear-gradient(135deg, #93c5fd, #c4b5fd, #fbcfe8)' }}>
        <Glass style={{ justifyContent: 'space-between', gap: 12 }}>
          <Button onClick={() => setOpen(true)}>Open themed sheet</Button>
          <Menu trigger={<Button>Actions</Button>} items={[{ label: 'Edit' }, { label: 'Delete', destructive: true }]} />
        </Glass>
      </div>
      <Glass glass={false}><Text>Opaque override</Text></Glass>
      <Sheet title="Themed sheet" isPresented={open} onDismiss={() => setOpen(false)}>
        <h2>Sheet preferences</h2>
        <Text>The portal keeps the selected theme and accent color.</Text>
        <Menu trigger={<Button>Sheet actions</Button>} items={[{ label: 'Edit preferences' }]} />
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Sheet>
    </VStack>
  </UIProvider>
}
export const Default: Story = { render: () => <AppearanceDemo /> }
export const SystemTheme: Story = { render: () => <AppearanceDemo system /> }
