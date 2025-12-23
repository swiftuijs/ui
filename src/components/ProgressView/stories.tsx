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
      <ProgressView progress={0} />
      <ProgressView progress={0.25} />
      <ProgressView progress={0.5} />
      <ProgressView progress={0.75} />
      <ProgressView progress={1} />
      <ProgressView completed={30} total={100} />
      <ProgressView indeterminate />
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
      <ProgressView progress={progress} />
    </VStack>
  )
}

export const Animated: Story = {
  render: () => <AnimatedProgressDemo />,
}

