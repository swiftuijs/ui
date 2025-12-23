import ReactDom from 'react-dom/client'
import { NavigationStack } from 'src/index'
import { HomePage } from './pages/home'

export const App = () => {
  return (
    <NavigationStack>
      <HomePage />
    </NavigationStack>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
