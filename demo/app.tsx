import ReactDom from 'react-dom/client'
import { VStack, Button, HStack,
  Text, Divider, NavigationLink,
  NavigationStack, Spacer } from 'src/index'

const About = () => {
  return (
    <VStack>
      <Text>About</Text>
      <NavigationLink dismiss transitionName='home'>Home</NavigationLink>
    </VStack>
  )
}


export const App = () => {
  return (
    <NavigationStack style={{
      '--safe-area-top': '40px',
      '--safe-area-bottom': '40px',
    }}>
      <VStack>
        <Spacer />
        <Text>1</Text>
        <Divider />
        <Text>3</Text>
        <HStack>
          <Text>4</Text>
          <Spacer />
          <Text>5</Text>
        </HStack>
        <Spacer />
        <NavigationLink destination={About} transitionName='home'>About</NavigationLink>
        <Button>6</Button>
      </VStack>
    </NavigationStack>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
