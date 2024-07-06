import {
  VStack, Button, HStack, ScrollView,
  Text, Divider, NavigationLink,
  Spacer, useNaviContext

} from 'src/index'

import { About } from './about'

export function Home() {
  const navi = useNaviContext()
  const onBack = () => navi.dismiss()
  return (
    <VStack spacing={10}>
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
          <div style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam harum optio doloribus similique, veniam perferendis ab repellendus ullam nihil eum culpa voluptates magni, consectetur expedita quis non numquam nemo.</div>
          <Text>7</Text>
        </HStack>
      </ScrollView>
      <Spacer />
      <NavigationLink destination={About} pageOptions={{ type: 'actionsheet' }}>About</NavigationLink>
      <Button onClick={onBack}>Back</Button>
    </VStack>
  )
}