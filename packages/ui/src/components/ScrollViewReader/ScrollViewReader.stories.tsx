import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { ScrollTarget } from '../ScrollTarget'
import { ScrollView } from '../ScrollView'
import { VStack } from '../VStack'
import { ScrollViewReader } from './index'

const meta: Meta<typeof ScrollViewReader> = {
  title: 'SwiftUI/ScrollViewReader',
  component: ScrollViewReader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScrollViewReader>

export const Default: Story = {
  render: () => (
    <ScrollViewReader>
      {(proxy) => (
        <VStack spacing={12}>
          <Button onClick={() => proxy.scrollTo('details', { behavior: 'smooth', block: 'nearest' })}>
            Jump to details
          </Button>
          <ScrollView style={{ height: '220px' }}>
            <VStack spacing={16}>
              <ScrollTarget scrollId="summary">
                <div style={{ minHeight: '180px' }}>Summary section</div>
              </ScrollTarget>
              <ScrollTarget scrollId="details">
                <div style={{ minHeight: '180px' }}>Details section</div>
              </ScrollTarget>
            </VStack>
          </ScrollView>
        </VStack>
      )}
    </ScrollViewReader>
  ),
}
