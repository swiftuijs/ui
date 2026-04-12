import type { Meta, StoryObj } from '@storybook/react-vite'

import { OutlineGroup } from './index'

type Node = {
  id: string
  title: string
  children?: Node[]
}

const tree: Node[] = [
  {
    id: 'design',
    title: 'Design',
    children: [
      { id: 'assets', title: 'Assets' },
      { id: 'reviews', title: 'Reviews' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    children: [{ id: 'ios', title: 'iOS' }],
  },
]

const meta: Meta<typeof OutlineGroup<Node>> = {
  title: 'SwiftUI/OutlineGroup',
  component: OutlineGroup as never,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <OutlineGroup
      data={tree}
      getChildren={(item) => item.children}
      getKey={(item) => item.id}
      renderItem={(item) => item.title}
    />
  ),
}
