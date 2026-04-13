import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VStack, Text, Button } from '../'
import { Sheet, type ISheetProps } from '.'

const meta: Meta<typeof Sheet> = {
  title: 'SwiftUI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that presents content as a modal sheet.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ISheetProps>

function DefaultSheet() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Sheet</Button>
      <Sheet isPresented={isPresented} onDismiss={() => setIsPresented(false)}>
        <VStack spacing={20}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Sheet Title</Text>
          <Text>This is a sheet presentation</Text>
          <Button onClick={() => setIsPresented(false)}>Dismiss</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultSheet />,
}

function FormSheetComponent() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Form Sheet</Button>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        presentationStyle="formSheet"
      >
        <VStack spacing={20}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Form Sheet</Text>
          <Text>This is a form sheet style</Text>
          <Button onClick={() => setIsPresented(false)}>Close</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const FormSheet: Story = {
  render: () => <FormSheetComponent />,
}

function FullScreenSheet() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Full Screen</Button>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        presentationStyle="fullScreen"
        showDragIndicator={false}
      >
        <VStack spacing={20} style={{ padding: '20px' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Full Screen</Text>
          <Text>This is a full screen presentation</Text>
          <Button onClick={() => setIsPresented(false)}>Close</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const FullScreen: Story = {
  render: () => <FullScreenSheet />,
}

function MaterialSheet() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Material Sheet</Button>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        backgroundStyle="thinMaterial"
        cornerRadius={28}
      >
        <VStack spacing={20} style={{ padding: '20px' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Material Sheet</Text>
          <Text>Thin material background with a custom corner radius.</Text>
          <Button onClick={() => setIsPresented(false)}>Dismiss</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const Material: Story = {
  render: () => <MaterialSheet />,
}

function LockedBackdropSheet() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Locked Sheet</Button>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        backgroundInteraction="none"
      >
        <VStack spacing={20} style={{ padding: '20px' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Locked Backdrop</Text>
          <Text>Backdrop taps no longer dismiss this sheet.</Text>
          <Button onClick={() => setIsPresented(false)}>Close explicitly</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const LockedBackdrop: Story = {
  render: () => <LockedBackdropSheet />,
}

function DetentSheet() {
  const [isPresented, setIsPresented] = useState(false)
  const [selectedDetent, setSelectedDetent] = useState<'medium' | 'large'>('medium')

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Detent Sheet</Button>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        presentationDetents={['medium', 'large']}
        selectedDetent={selectedDetent}
        onSelectedDetentChange={(detent) => {
          if (detent === 'medium' || detent === 'large') {
            setSelectedDetent(detent)
          }
        }}
      >
        <VStack spacing={20} style={{ padding: '20px' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Detent Sheet</Text>
          <Text>This sheet starts at the medium detent and cycles when you activate the drag indicator.</Text>
          <Text>Current detent: {selectedDetent}</Text>
          <Button onClick={() => setIsPresented(false)}>Dismiss</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const Detents: Story = {
  render: () => <DetentSheet />,
}

function UncontrolledDetentSheet() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Uncontrolled Detent Sheet</Button>
      <Sheet
        defaultSelectedDetent="medium"
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        presentationDetents={['medium', 'large']}
      >
        <VStack spacing={20} style={{ padding: '20px' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Uncontrolled Detent Sheet</Text>
          <Text>This sheet resets to its default detent each time it is presented.</Text>
          <Button onClick={() => setIsPresented(false)}>Dismiss</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const UncontrolledDetents: Story = {
  render: () => <UncontrolledDetentSheet />,
}

function InteractiveDismissDisabledSheet() {
  const [isPresented, setIsPresented] = useState(false)

  return (
    <>
      <Button onClick={() => setIsPresented(true)}>Show Locked Interaction Sheet</Button>
      <Sheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        interactiveDismissDisabled
      >
        <VStack spacing={20} style={{ padding: '20px' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Interactive Dismiss Disabled</Text>
          <Text>Backdrop taps and Escape no longer dismiss this presentation.</Text>
          <Button onClick={() => setIsPresented(false)}>Close explicitly</Button>
        </VStack>
      </Sheet>
    </>
  )
}

export const InteractiveDismissDisabled: Story = {
  render: () => <InteractiveDismissDisabledSheet />,
}
