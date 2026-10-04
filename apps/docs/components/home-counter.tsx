'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@swiftuijs/ui/components/Button';
import { Text } from '@swiftuijs/ui/components/Text';
import { VStack } from '@swiftuijs/ui/components/VStack';

export function HomeCounter({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [showCode, setShowCode] = useState(false);
  return (
    <>
      <div className="px-6 py-7">
        <VStack spacing={12} alignment="leading">
          <Text aria-live="polite">{count} clicks</Text>
          <Button
            buttonStyle="bordered"
            onClick={() => setCount((value) => value + 1)}
          >
            Add one
          </Button>
        </VStack>
      </div>
      <button
        type="button"
        aria-expanded={showCode}
        aria-controls="home-example-code"
        onClick={() => setShowCode((value) => !value)}
        className="mx-5 mb-4 inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm text-fd-muted-foreground hover:bg-fd-accent lg:hidden"
      >
        {showCode ? 'Hide example code' : 'View example code'}{' '}
        <span aria-hidden="true">{showCode ? '−' : '+'}</span>
      </button>
      <div id="home-example-code" className={showCode ? '' : 'hidden lg:block'}>
        {children}
      </div>
    </>
  );
}
