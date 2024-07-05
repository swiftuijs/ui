import ReactDom from 'react-dom/client'
import { VStack, Button, HStack, ScrollView,
  Text, Divider, NavigationLink,
  NavigationStack, Spacer } from 'src/index'

const About = () => {
  return (
    <ScrollView>
    <VStack spacing={10}>
      <Text>About</Text>
      <NavigationLink dismiss transitionName='home'>Home</NavigationLink>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, possimus vero ipsa eveniet eligendi totam. Sed possimus repellat voluptatem, unde molestias ab esse similique placeat debitis illum numquam hic corporis.
      </div>
      <Spacer />
      <Button>Back</Button>
      <Text lineLimit={3}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam inventore fugit ducimus labore qui culpa sint magnam, eligendi rerum doloribus rem maxime, dignissimos repudiandae voluptatem non adipisci iusto eaque voluptatum!
      </Text>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam inventore fugit ducimus labore qui culpa sint magnam, eligendi rerum doloribus rem maxime, dignissimos repudiandae voluptatem non adipisci iusto eaque voluptatum!
      </div>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam inventore fugit ducimus labore qui culpa sint magnam, eligendi rerum doloribus rem maxime, dignissimos repudiandae voluptatem non adipisci iusto eaque voluptatum!
      </div>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam inventore fugit ducimus labore qui culpa sint magnam, eligendi rerum doloribus rem maxime, dignissimos repudiandae voluptatem non adipisci iusto eaque voluptatum!
      </div>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam inventore fugit ducimus labore qui culpa sint magnam, eligendi rerum doloribus rem maxime, dignissimos repudiandae voluptatem non adipisci iusto eaque voluptatum!
      </div>
    </VStack>
    </ScrollView>
  )
}


export const App = () => {
  return (
    <NavigationStack>
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
        <HStack spacing={10}>
          <Text>66</Text>
          <Text>77</Text>
        </HStack>
        <ScrollView direction='horizontal'>
          <HStack>
            <Text>6</Text>
            <Spacer />
            <div style={{wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam harum optio doloribus similique, veniam perferendis ab repellendus ullam nihil eum culpa voluptates magni, consectetur expedita quis non numquam nemo.</div>
            <Text>7</Text>
          </HStack>
        </ScrollView>
        <Spacer />
        <NavigationLink destination={About} transitionName='home' pageOptions={{type: 'actionsheet'}}>About</NavigationLink>
        <Button>6</Button>
      </VStack>
    </NavigationStack>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
