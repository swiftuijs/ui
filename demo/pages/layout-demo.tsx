import {
  VStack, HStack, ZStack, Spacer, Text, Button
} from 'src/index'

export function LayoutDemo() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Layout Components</Text>
      
      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>VStack - Vertical Stack</Text>
        <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
          <Text>Item 3</Text>
        </VStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>HStack - Horizontal Stack</Text>
        <HStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Text>Left</Text>
          <Text>Center</Text>
          <Text>Right</Text>
        </HStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>ZStack - Overlay Stack</Text>
        <ZStack style={{ width: '100%', height: '200px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }} />
          <VStack alignment="center">
            <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Overlay Text</Text>
          </VStack>
        </ZStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Spacer - Flexible Space</Text>
        <HStack spacing={10} style={{ width: '100%', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Button>Left</Button>
          <Spacer />
          <Button>Right</Button>
        </HStack>
        <VStack spacing={10} style={{ height: '150px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Text>Top</Text>
          <Spacer />
          <Text>Bottom</Text>
        </VStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Alignment Examples</Text>
        <VStack spacing={10}>
          <HStack alignment="leading" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <Text>Leading</Text>
          </HStack>
          <HStack alignment="center" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <Text>Center</Text>
          </HStack>
          <HStack alignment="trailing" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <Text>Trailing</Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

