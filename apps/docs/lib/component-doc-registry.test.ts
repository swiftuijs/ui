import { describe, expect, it } from 'vitest';

import {
  extractMetaComponent,
  extractStoryCode,
  transformStorySourceForDocs,
} from './component-doc-registry';

describe('component doc registry helpers', () => {
  it('extracts complete story source blocks for code disclosure', () => {
    const input = `export const Default = {
  args: {
    children: 'Button',
    disabled: true,
  },
}

export const Custom = {
  render: () => <div>Custom</div>,
}
`;

    expect(extractStoryCode(input, 'Default')).toBe(`export const Default = {
  args: {
    children: 'Button',
    disabled: true,
  },
}`);
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
