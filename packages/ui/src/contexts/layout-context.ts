/**
 * Layout related context
 */
import { createContext } from 'react'

export interface ILayoutContext {
  boxDirection: 'row' | 'column'
}

export const LayoutContext = createContext<ILayoutContext>({
  boxDirection: 'row',
})

