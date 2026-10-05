import { describe, expect, it } from 'vitest';

import {
  extractMetaComponent,
  extractRunnableStoryCode,
  transformStorySourceForDocs,
} from './component-doc-registry';

describe('component doc registry helpers', () => {
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

    expect(transformStorySourceForDocs(input, '../ui')).toContain(
      `import { Button } from '../ui'`,
    );
    expect(transformStorySourceForDocs(input, '../ui')).toContain(
      `export const Default = {`,
    );
    expect(transformStorySourceForDocs(input, '../ui')).not.toContain(
      'export default meta',
    );
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

    expect(transformStorySourceForDocs(input, '../ui')).toContain(
      `import { HStack } from '../ui'`,
    );
    expect(transformStorySourceForDocs(input, '../ui')).not.toContain(
      'IHStackProps',
    );
  });
});

it('retains hook state, nested helpers and helper data in standalone examples', () => {
  const source = `import { useState } from 'react';
import { Button } from '.';
const labels = ['Save'];
export const Helper = () => <span>{labels[0]}</span>;
export const Default = { render: () => {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}><Helper />{count}</Button>;
}};`;
  const code = extractRunnableStoryCode(source, 'Default', 'Button');
  expect(code).toContain("from '@swiftuijs/ui'");
  expect(code).toContain('const [count, setCount]');
  expect(code).toMatch(/const labels = \[.[Ss]ave.\]/);
  expect(code).toContain('const Helper');
  expect(code).toContain('export default function Example');
  expect(code).not.toContain('export const Default');
});

it('preserves quoted accessible props and inherited fixture defaults', () => {
  const code = extractRunnableStoryCode(
    `import { Button } from '.';
const meta = { component: Button, args: { 'aria-label': 'Save', children: 'Save', disabled: true } };
export const Default = { args: { disabled: false } };`,
    'Default',
    'Button',
  );
  expect(code).toContain('aria-label="Save"');
  expect(code).toContain('disabled={false}');
  expect(code.match(/disabled/g)).toHaveLength(1);
  expect(code).toContain('>Save</Button>');
});
