import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState, type ComponentRef } from 'react'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { Popover, type IPopoverProps } from '.'

const meta: Meta<typeof Popover> = {
  title: 'SwiftUI/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IPopoverProps>

function DefaultPopover() {
  const [isPresented, setIsPresented] = useState(false)
  const anchorRef = useRef<ComponentRef<'button'>>(null)

  return (
    <>
      <button ref={anchorRef} className="sw-button" onClick={() => setIsPresented((value) => !value)} type="button">
        Show Popover
      </button>
      <Popover anchorRef={anchorRef} isPresented={isPresented} onDismiss={() => setIsPresented(false)}>
        <VStack spacing="sm">
          <Text>Quick actions</Text>
          <Text style={{ color: 'var(--sw-color-label-secondary)' }}>
            Popovers stay anchored to the triggering control.
          </Text>
        </VStack>
      </Popover>
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultPopover />,
}
