import ReactDom from 'react-dom/client';
import { VStack, HStack, Text, Divider, NavigationStack } from 'src/index'

const App = () => {
  return (
    <NavigationStack ignoreSafeArea>
      <VStack>
        <Text>1</Text>
        <Divider />
        <Text>3</Text>
        <HStack>
          <Text>4</Text>
          <Divider />
          <Text>5</Text>
        </HStack>
      </VStack>
    </NavigationStack>
  );
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />);
