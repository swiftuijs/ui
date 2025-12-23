import {
  VStack, HStack, Text, Image, Button, Link
} from 'src/index'

export function ContentDemo() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Content Components</Text>
      
      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Text</Text>
        <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Text>Regular text</Text>
          <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Bold large text</Text>
          <Text style={{ color: '#007AFF' }}>Colored text</Text>
          <Text lineLimit={2}>
            This is a long text that will be truncated after 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </VStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Button</Text>
        <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Button>Default Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button style={{ backgroundColor: '#007AFF', color: 'white', border: 'none' }}>
            Primary Button
          </Button>
          <HStack spacing={10}>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </HStack>
        </VStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Image</Text>
        <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Image 
            src="https://via.placeholder.com/300x200" 
            alt="Placeholder"
            style={{ borderRadius: '8px', maxWidth: '100%' }}
          />
          <HStack spacing={10}>
            <Image 
              src="https://via.placeholder.com/100x100" 
              alt="Small"
              style={{ borderRadius: '4px' }}
            />
            <Image 
              src="https://via.placeholder.com/100x100" 
              alt="Small"
              style={{ borderRadius: '4px' }}
            />
          </HStack>
        </VStack>
      </VStack>

      <VStack spacing={15}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Link</Text>
        <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <Link destination="https://example.com">External Link</Link>
          <Link destination="https://apple.com" target="_blank">Open in New Tab</Link>
          <HStack spacing={10}>
            <Text>Visit</Text>
            <Link destination="https://github.com">GitHub</Link>
            <Text>for more</Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

