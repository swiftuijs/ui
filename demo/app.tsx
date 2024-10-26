import ReactDom from 'react-dom/client'
import { VStack, 
  NavigationLink,
  NavigationStack } from 'src/index'

import { Home } from './home'
import { ZStackView } from './zstack-view'
import { About } from './about'
import { Messages } from './messages'



export const App = () => {
  return (
    <NavigationStack>
      <VStack spacing={20}>
        <NavigationLink destination={Messages}>Message</NavigationLink>
        <NavigationLink destination={Home}>Home</NavigationLink>
        <NavigationLink destination={About}>About</NavigationLink>
        <NavigationLink destination={ZStackView}>ZStack</NavigationLink>
      </VStack>
    </NavigationStack>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
