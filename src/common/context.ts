import { createContext } from 'react';


export interface IStyleContext {
  boxDirection: 'row' | 'column'
}

export const StyleContext = createContext<IStyleContext>({
  boxDirection: 'row',
});

