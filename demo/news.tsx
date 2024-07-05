import {
  ZStack,
  VStack, HStack, 
  Text, NavigationLink,
  Spacer
} from 'src/index'


export function News() {
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
        <NavigationLink dismiss>Back</NavigationLink>
        <Spacer />
        <Text>2</Text>
      </HStack>
    </ZStack>
  )
}