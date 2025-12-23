import ReactDom from 'react-dom/client'
import { NavigationStack, SafeArea, useSizeClass } from 'src/index'
import { HomePage } from './pages/home'

export const App = () => {
  const sizeClass = useSizeClass()
  
  return (
    <SafeArea edges={['top', 'bottom', 'left', 'right']}>
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          maxWidth: sizeClass?.horizontal === 'regular' ? '1200px' : '100%',
          margin: '0 auto',
          backgroundColor: 'var(--sw-color-background-primary, #FFFFFF)',
        }}
      >
        <NavigationStack>
          <HomePage />
        </NavigationStack>
      </div>
    </SafeArea>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
