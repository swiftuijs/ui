import {
  VStack, List, Section, Divider, Text, Button, HStack, Spacer
} from 'src/index'

export function ListDemo() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>List Components</Text>
      
      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>List with Sections</Text>
        <List style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
          <Section header={<Text style={{ fontWeight: 'bold', padding: '10px' }}>Section 1</Text>}>
            <VStack spacing={0}>
              <div style={{ padding: '15px' }}>
                <Text>Item 1</Text>
              </div>
              <Divider />
              <div style={{ padding: '15px' }}>
                <Text>Item 2</Text>
              </div>
            </VStack>
          </Section>
          <Section header={<Text style={{ fontWeight: 'bold', padding: '10px' }}>Section 2</Text>}>
            <VStack spacing={0}>
              <div style={{ padding: '15px' }}>
                <Text>Item 3</Text>
              </div>
              <Divider />
              <div style={{ padding: '15px' }}>
                <Text>Item 4</Text>
              </div>
            </VStack>
          </Section>
        </List>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Section with Header</Text>
        <Section header={<Text style={{ fontWeight: 'bold' }}>Section Header</Text>}>
          <VStack spacing={10}>
            <Text>Section content line 1</Text>
            <Text>Section content line 2</Text>
            <Button>Action Button</Button>
          </VStack>
        </Section>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Divider Examples</Text>
        <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Text>Above divider</Text>
          <Divider />
          <Text>Below divider</Text>
          <Divider />
          <Text>Another item</Text>
        </VStack>
        <HStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Text>Left</Text>
          <Divider />
          <Text>Right</Text>
        </HStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>List with Actions</Text>
        <List style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
          <VStack spacing={0}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i}>
                <div style={{ padding: '15px' }}>
                  <HStack spacing={10}>
                    <Text>Item {i + 1}</Text>
                    <Spacer />
                    <Button>Action</Button>
                  </HStack>
                </div>
                {i < 2 && <Divider />}
              </div>
            ))}
          </VStack>
        </List>
      </VStack>
    </VStack>
  )
}

