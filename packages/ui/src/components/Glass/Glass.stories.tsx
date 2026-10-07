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

function OpticalComparison() {
  const [renderer, setRenderer] = useState<'auto' | 'css'>('auto')
  const [shape, setShape] = useState<'rounded' | 'capsule' | 'circle'>('rounded')
  const [compact, setCompact] = useState(false)
  const [sharpCorners, setSharpCorners] = useState(false)
  const [count, setCount] = useState(0)
  const width = compact ? 220 : 280
  return <UIProvider theme="system">
    <div style={{ padding: 16, color: 'var(--sw-color-label-primary)', background: 'var(--sw-color-background-secondary)' }}>
      <HStack spacing={8} style={{ flexWrap: 'wrap', marginBottom: 16 }}>
        <Button onClick={() => setRenderer(renderer === 'auto' ? 'css' : 'auto')}>{renderer === 'auto' ? 'Use CSS fallback' : 'Use refraction'}</Button>
        <Button onClick={() => setCompact(!compact)}>Resize glass</Button>
        <Button onClick={() => setSharpCorners(!sharpCorners)}>Change radius</Button>
        <label>Shape <select aria-label="Glass shape" value={shape} onChange={event => setShape(event.target.value as typeof shape)}>
          <option value="rounded">Rounded rectangle</option><option value="capsule">Capsule</option><option value="circle">Circle</option>
        </select></label>
        <output>{count} activations</output>
      </HStack>
      <div className="glass-optics-scene" style={{ position: 'relative', height: 440, borderRadius: 20, overflow: 'hidden',
        background: 'repeating-linear-gradient(0deg, transparent 0 23px, #ffffff70 23px 24px), repeating-linear-gradient(90deg, transparent 0 23px, #ffffff70 23px 24px), linear-gradient(110deg, #0369a1, #4338ca 45%, #be185d)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: 24, top: 80, color: '#ffffffbb', font: 'bold 72px system-ui', whiteSpace: 'nowrap' }}>Aa 0123</div>
        <div aria-hidden="true" style={{ position: 'absolute', left: 16, right: 16, top: 260, height: 12, background: '#fde68a', transform: 'rotate(-12deg)' }} />
        <Glass aria-label="Optical material" glass={{ enabled: true, renderer, variant: 'clear', intensity: 0.8 }}
          style={{ position: 'absolute', left: '50%', top: 85, transform: 'translateX(-50%)', width, maxWidth: 'calc(100% - 32px)',
            height: shape === 'circle' ? width : shape === 'capsule' ? 80 : 190, justifyContent: 'center',
            borderRadius: shape === 'rounded' ? (sharpCorners ? 8 : 54) : shape === 'circle' ? '50%' : 999 }}>
          <Button buttonStyle="borderedProminent" onClick={() => setCount(value => value + 1)}>Test foreground</Button>
        </Glass>
      </div>
      <Text style={{ marginTop: 12 }}>The rim bends the grid; the foreground stays sharp. CSS fallback softens the background.</Text>
    </div>
  </UIProvider>
}

export const Optics: Story = { render: () => <OpticalComparison /> }
