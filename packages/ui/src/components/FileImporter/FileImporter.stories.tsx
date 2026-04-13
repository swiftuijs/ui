import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { FileImporter, type IFileImporterProps } from '.'

const meta: Meta<typeof FileImporter> = {
  title: 'SwiftUI/FileImporter',
  component: FileImporter,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IFileImporterProps>

function DemoFileImporter() {
  const [value, setValue] = useState('No file selected')

  return (
    <VStack spacing={12}>
      <FileImporter onSelect={(files) => setValue(files.map((file) => file.name).join(', '))}>
        Import file
      </FileImporter>
      <Text>{value}</Text>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <DemoFileImporter />,
}

export const MultipleSelection: Story = {
  render: () => (
    <VStack spacing={12}>
      <FileImporter
        allowedContentTypes={['image/png', 'image/jpeg']}
        allowsMultipleSelection
        onSelect={() => undefined}
      >
        Import images
      </FileImporter>
      <Text>Uses SwiftUI-style selection aliases for accepted content types and multiple selection.</Text>
    </VStack>
  ),
}
