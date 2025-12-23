import {
  VStack, ScrollView, Text, HStack, Spacer
} from 'src/index'

export function ScrollDemo() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>ScrollView Components</Text>
      
      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Vertical ScrollView</Text>
        <ScrollView direction="vertical" style={{ height: '200px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <VStack spacing={10}>
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i}>Scrollable item {i + 1}</Text>
            ))}
          </VStack>
        </ScrollView>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Horizontal ScrollView</Text>
        <ScrollView direction="horizontal" style={{ width: '100%', height: '100px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <HStack spacing={10}>
            {Array.from({ length: 15 }, (_, i) => (
              <Text key={i} style={{ whiteSpace: 'nowrap' }}>Item {i + 1}</Text>
            ))}
          </HStack>
        </ScrollView>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>ScrollView without Indicators</Text>
        <ScrollView showsIndicators={false} style={{ height: '200px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <VStack spacing={10}>
            {Array.from({ length: 15 }, (_, i) => (
              <Text key={i}>Item {i + 1} (no scrollbar)</Text>
            ))}
          </VStack>
        </ScrollView>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>ScrollView with Spacer</Text>
        <ScrollView style={{ height: '200px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <VStack spacing={10}>
            <Text>Top content</Text>
            <Spacer />
            {Array.from({ length: 10 }, (_, i) => (
              <Text key={i}>Middle item {i + 1}</Text>
            ))}
            <Spacer />
            <Text>Bottom content</Text>
          </VStack>
        </ScrollView>
      </VStack>
    </VStack>
  )
}

