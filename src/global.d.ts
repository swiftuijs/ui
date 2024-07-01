// import 'react';

declare module 'react' {
  // allow react style support css variable
  export interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type  IFn = (...rest: any[]) => any