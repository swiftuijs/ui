import ReactDom from 'react-dom/client';
import { HStack, Text, Divider, Container } from 'src/index'

const App = () => {
  return (
    <Container>
      <HStack>
        <Text>1</Text>
        <Divider />
        <Text>3</Text>
      </HStack>
    </Container>
  );
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />);
