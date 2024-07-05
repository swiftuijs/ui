import ReactDom from 'react-dom/client'
import { VStack, 
  NavigationLink,
  NavigationStack } from 'src/index'

import { Home } from './home'
import { News } from './news'
import { About } from './about'



export const App = () => {
  return (
    <NavigationStack>
      <VStack spacing={20}>
        <NavigationLink destination={Home}>Home</NavigationLink>
        <NavigationLink destination={News}>News ZStack</NavigationLink>
        <NavigationLink destination={About}>About</NavigationLink>
      </VStack>
    </NavigationStack>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
