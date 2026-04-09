import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../'
import { Alert, type IAlertProps } from '.'

const meta: Meta<typeof Alert> = {
  title: 'SwiftUI/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container that presents an alert dialog.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IAlertProps>

function DefaultAlert() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Alert</Button>
      <Alert
        title="Alert"
        message="This is an alert message"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
      />
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultAlert />
}

function SimpleAlert() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Simple Alert</Button>
      <Alert
        title="Notice"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
      />
    </>
  )
}

export const Simple: Story = {
  render: () => <SimpleAlert />
}

function WithCustomButtonsDemo() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Alert with Custom Buttons</Button>
      <Alert
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        buttons={[
          { label: 'Cancel', action: () => setIsVisible(false), style: 'cancel' },
          { label: 'Delete', action: () => { setIsVisible(false); alert('Deleted!') }, style: 'destructive' }
        ]}
      />
    </>
  )
}

export const WithCustomButtons: Story = {
  render: () => <WithCustomButtonsDemo />
}

function WithMultipleButtonsDemo() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Alert with Multiple Buttons</Button>
      <Alert
        title="Choose Action"
        message="What would you like to do?"
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        buttons={[
          { label: 'Cancel', action: () => setIsVisible(false), style: 'cancel' },
          { label: 'Save', action: () => { setIsVisible(false); alert('Saved!') } },
          { label: 'Delete', action: () => { setIsVisible(false); alert('Deleted!') }, style: 'destructive' }
        ]}
      />
    </>
  )
}

export const WithMultipleButtons: Story = {
  render: () => <WithMultipleButtonsDemo />
}

function WarningAlert() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Warning</Button>
      <Alert
        title="Warning"
        message="This action may have unintended consequences. Please proceed with caution."
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        buttons={[
          { label: 'Cancel', action: () => setIsVisible(false), style: 'cancel' },
          { label: 'Continue', action: () => setIsVisible(false) }
        ]}
      />
    </>
  )
}

export const Warning: Story = {
  render: () => <WarningAlert />
}

