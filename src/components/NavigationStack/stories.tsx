import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationLink, VStack, Section, HStack, ScrollView, Text, Spacer, Button, ZStack  } from '../'
import { useNaviContext } from '../../contexts'
import { NavigationStack, INavigationStackProps } from '.'

const meta: Meta<typeof NavigationStack> = {
  title: 'SwiftUI/NavigationStack',
  component: NavigationStack
}

export default meta

const style = `
  html {
    font-family: system-ui, sans-serif;
    width: 100%;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  #storybook-root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

document.head.insertAdjacentHTML('beforeend', `<style>${style}</style>`)


type Story = StoryObj<INavigationStackProps>

export const NavigationStackBetween: Story = {
  render() {
    return (
      <NavigationStack>
        <VStack spacing={20}>
          <NavigationLink destination={Messages}>Message</NavigationLink>
          <NavigationLink destination={About}>About</NavigationLink>
          <NavigationLink destination={ZStackView}>ZStack</NavigationLink>
        </VStack>
      </NavigationStack>
    )
  }
}

function Messages() {
  return (
    <VStack alignment='bottom-trailing'>
      <Section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, nam vero enim dolorum aliquid quia, nesciunt quaerat eveniet maxime corporis praesentium sint aut sit at, soluta ad nemo temporibus iure?
      </Section>
      <NavigationLink destination={About} pageOptions={{ type: 'actionsheet' }}>About</NavigationLink>
    </VStack>
  )
}

export const About = () => {
  return (
    <ScrollView showsIndicators={false}>
      <VStack spacing={10}>
        <Text>About</Text>
        <NavigationLink dismiss>Back to previous</NavigationLink>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, possimus vero ipsa eveniet eligendi totam. Sed possimus repellat voluptatem, unde molestias ab esse similique placeat debitis illum numquam hic corporis.
        </div>
        <Spacer />
        <Button>Some button</Button>
        <NavigationLink destination={ZStackView} >Go to News</NavigationLink>
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

function ZStackView() {
  const navi = useNaviContext()
  const gotoHome = () => navi.removeLast(999)
  return (
    <ZStack alignment='bottom-trailing'>
      <VStack spacing={20}>
        <Text>1</Text>
        <Spacer />
        <Text lineLimit={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eaque perspiciatis obcaecati recusandae, aperiam eligendi deserunt ad voluptatem magnam, aspernatur impedit. Earum eum cum obcaecati quo nihil iste quia aperiam.
        </Text>
        <Text>1</Text>
      </VStack>
      <Text>Hello</Text>
      <HStack>
        <Text>2</Text>
        <Spacer />
        <NavigationLink dismiss>Go Back</NavigationLink>
        <Button onClick={gotoHome}>Back to Home</Button>
        <Spacer />
        <Text>2</Text>
      </HStack>
    </ZStack>
  )
}