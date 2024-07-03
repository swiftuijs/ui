import 'react'

declare module 'react' {
  // allow react style support css variable
  export interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
