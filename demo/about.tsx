import {
  VStack, Button, ScrollView,
  Text, NavigationLink,
  Spacer
} from 'src/index'


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