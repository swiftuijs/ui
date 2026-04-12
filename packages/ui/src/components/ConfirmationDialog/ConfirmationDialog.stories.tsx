import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../Button'

import { ConfirmationDialog, type IConfirmationDialogProps } from '.'

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'SwiftUI/ConfirmationDialog',
  component: ConfirmationDialog,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IConfirmationDialogProps>

function DefaultDialog() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Confirmation Dialog</Button>
      <ConfirmationDialog
        title="Delete draft?"
        message="This action cannot be undone."
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        actions={[
          { label: 'Delete', style: 'destructive', action: () => setIsVisible(false) },
          { label: 'Cancel', style: 'cancel', action: () => setIsVisible(false) },
        ]}
      />
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultDialog />,
}
