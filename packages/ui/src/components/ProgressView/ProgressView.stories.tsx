import { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ProgressView } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof ProgressView> = {
  title: 'SwiftUI/ProgressView',
  component: ProgressView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProgressView>

export const Default: Story = {
  render: () => (
    <VStack spacing={16}>
      <ProgressView aria-label="Zero progress" value={0} />
      <ProgressView aria-label="Quarter progress" value={0.25} />
      <ProgressView aria-label="Half progress" value={0.5} />
      <ProgressView aria-label="Three-quarter progress" value={0.75} />
      <ProgressView aria-label="Complete progress" value={1} />
    </VStack>
  ),
}

export const Determinate: Story = {
  render: () => (
    <VStack spacing={16}>
      <ProgressView
        aria-label="File upload"
        label="Uploading file"
        currentValueLabel="30%"
        value={30}
        total={100}
      />
      <ProgressView
        aria-label="Install progress"
        label="Installing update"
        currentValueLabel="4 of 7"
        value={4}
        total={7}
      />
    </VStack>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <VStack spacing={16}>
      <Text>Waiting for server response</Text>
      <ProgressView
        aria-label="Loading"
        indeterminate
      />
    </VStack>
  ),
}

const AnimatedProgressDemo = () => {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 0
        return prev + 0.1
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <VStack spacing={16}>
      <Text>Progress: {Math.round(progress * 100)}%</Text>
      <ProgressView
        aria-label="Animated progress"
        value={progress}
        currentValueLabel={`${Math.round(progress * 100)}%`}
      />
    </VStack>
  )
}

export const Animated: Story = {
  render: () => <AnimatedProgressDemo />,
}
