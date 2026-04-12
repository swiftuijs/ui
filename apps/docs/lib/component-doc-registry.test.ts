import { describe, expect, it } from 'vitest';

import {
  extractMetaComponent,
  extractStoryCode,
  transformStorySourceForDocs,
} from './component-doc-registry';

describe('component doc registry helpers', () => {
  it('extracts render-story jsx for code disclosure', () => {
    const input = `export const Default = {
  args: {
    children: 'Button',
    disabled: true,
  },
}

export const Custom = {
  render: () => (
    <div>
      <span>Custom</span>
    </div>
  ),
}
`;

    expect(extractStoryCode(input, 'Custom', 'Button')).toBe(`<div>
      <span>Custom</span>
    </div>`);
  });

  it('inlines local demo component implementations for render stories', () => {
    const input = `function DefaultDialog() {
  return (
    <>
      <button type="button">Open</button>
      <ConfirmationDialog isVisible onDismiss={() => {}} actions={[{ label: 'Delete' }]} />
    </>
  )
}

export const Default = {
  render: () => <DefaultDialog />,
}
`;

    expect(extractStoryCode(input, 'Default', 'ConfirmationDialog')).toBe(`function DefaultDialog() {
  return (
    <>
      <button type="button">Open</button>
      <ConfirmationDialog isVisible onDismiss={() => {}} actions={[{ label: 'Delete' }]} />
    </>
  )
}`);
  });

  it('builds component usage code from args-only stories', () => {
    const input = `export const Default = {
  args: {
    children: 'Button',
    disabled: true,
    variant: 'bordered',
  },
}
`;

    expect(extractStoryCode(input, 'Default', 'Button')).toBe(`<Button disabled variant="bordered">Button</Button>`);
  });

  it('extracts the meta component so args-only stories can render in docs', () => {
    const input = `const meta: Meta<typeof Button> = {
  title: 'SwiftUI/Button',
  component: Button,
}
`;

    expect(extractMetaComponent(input)).toBe('Button');
  });

  it('rewrites storybook stories into docs-safe preview modules', () => {
    const input = `import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '.'

const meta: Meta<typeof Button> = {
  title: 'SwiftUI/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button'
  }
}
`;

    expect(transformStorySourceForDocs(input, '../ui')).toContain(`import { Button } from '../ui'`);
    expect(transformStorySourceForDocs(input, '../ui')).toContain(`export const Default = {`);
    expect(transformStorySourceForDocs(input, '../ui')).not.toContain('export default meta');
  });

  it('drops interface-only prop imports from rewritten preview modules', () => {
    const input = `import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, IHStackProps } from '.'

const meta: Meta<typeof HStack> = {
  title: 'SwiftUI/HStack',
  component: HStack,
}

export default meta
type Story = StoryObj<IHStackProps>
`;

    expect(transformStorySourceForDocs(input, '../ui')).toContain(`import { HStack } from '../ui'`);
    expect(transformStorySourceForDocs(input, '../ui')).not.toContain('IHStackProps');
  });
});
