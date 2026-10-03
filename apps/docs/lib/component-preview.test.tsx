// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { createElement, useState } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { ComponentDocPage } from '../components/component-doc-page';

const { loadPreview } = vi.hoisted(() => ({ loadPreview: vi.fn() }));
vi.mock('../.generated/component-docs', () => ({
  componentDocRegistry: {
    button: {
      slug: 'button',
      status: 'adapted',
      swiftui: 'Button',
      props: [],
      inheritedPropsNote: null,
      examples: [
        {
          exportName: 'Default',
          title: 'Default',
          code: 'export default function Example() {}',
        },
        { exportName: 'Additional', title: 'Additional', code: '' },
      ],
    },
  },
  componentPreviewRegistry: { button: loadPreview },
}));

function CounterStory({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return createElement(
    'button',
    { onClick: () => setCount((value) => value + 1) },
    `${label}: ${count}`,
  );
}
const previews = {
  Default: { render: CounterStory, args: { label: 'First counter' } },
  Additional: { render: CounterStory, args: { label: 'Extra counter' } },
};
beforeEach(() => {
  loadPreview.mockReset().mockResolvedValue(previews);
});
afterEach(() => cleanup());

it('mounts hook-based stories as independent components and defers collapsed examples', async () => {
  const user = userEvent.setup();
  render(<ComponentDocPage slug={['components', 'button']} />);
  expect(screen.getByText('Loading preview…')).toBeInTheDocument();
  await user.click(
    await screen.findByRole('button', { name: 'First counter: 0' }),
  );
  expect(
    screen.getByRole('button', { name: 'First counter: 1' }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Extra counter: 0' }),
  ).not.toBeInTheDocument();
  await user.click(screen.getByText('Additional'));
  await user.click(
    await screen.findByRole('button', { name: 'Extra counter: 0' }),
  );
  expect(
    screen.getByRole('button', { name: 'Extra counter: 1' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'First counter: 1' }),
  ).toBeInTheDocument();
});

it('distinguishes a failed preview from loading and allows retry', async () => {
  loadPreview.mockRejectedValueOnce(new Error('Temporary network failure'));
  const user = userEvent.setup();
  render(<ComponentDocPage slug={['components', 'button']} />);
  await user.click(await screen.findByRole('button', { name: 'Retry' }));
  expect(
    await screen.findByRole('button', { name: 'First counter: 0' }),
  ).toBeInTheDocument();
  expect(loadPreview).toHaveBeenCalledTimes(2);
});

it('keeps requirements ahead of the full API and the primary code visible', async () => {
  render(
    <ComponentDocPage slug={['components', 'button']}>
      <section>Requires a visible label</section>
    </ComponentDocPage>,
  );
  await screen.findByRole('button', { name: 'First counter: 0' });
  const requirement = screen.getByText('Requires a visible label');
  const api = screen.getByRole('heading', { name: 'API reference' });
  expect(
    requirement.compareDocumentPosition(api) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
  expect(
    screen.getByText('export default function Example() {}'),
  ).toBeVisible();
});

it('copies the whole standalone example', async () => {
  const user = userEvent.setup();
  render(<ComponentDocPage slug={['components', 'button']} />);
  await user.click(screen.getByRole('button', { name: 'Copy code' }));
  expect(await navigator.clipboard.readText()).toBe(
    'export default function Example() {}',
  );
  expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
});
