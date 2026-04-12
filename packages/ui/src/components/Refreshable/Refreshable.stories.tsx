import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Text } from '../Text'

import { Refreshable, type IRefreshableProps } from './index'

const meta: Meta<typeof Refreshable> = {
  title: 'SwiftUI/Refreshable',
  component: Refreshable,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IRefreshableProps>

export const Default: Story = {
  render: () => {
    function Demo() {
      const [updatedAt, setUpdatedAt] = useState('Never')

      return (
        <Refreshable
          onRefresh={async () => {
            await new Promise((resolve) => setTimeout(resolve, 300))
            setUpdatedAt(new Date().toLocaleTimeString())
          }}
        >
          <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 16 }}>
            <Text>Last updated: {updatedAt}</Text>
          </div>
        </Refreshable>
      )
    }

    return <Demo />
  },
}

export const WithToolbar: Story = {
  render: () => (
    <Refreshable
      onRefresh={() => Promise.resolve()}
      toolbar={<Text>Updated just now</Text>}
    >
      <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 16 }}>
        Feed content
      </div>
    </Refreshable>
  ),
}
