import {
  VStack, NavigationStack, NavigationLink, Text, Button, ScrollView, Section
} from 'src/index'

function DetailPage() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Detail Page</Text>
      <Text>This is a detail page navigated from NavigationLink</Text>
      <NavigationLink dismiss>
        <Button>Go Back</Button>
      </NavigationLink>
    </VStack>
  )
}

function ActionSheetPage() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Action Sheet</Text>
      <Text>This is an action sheet presentation</Text>
      <NavigationLink dismiss>
        <Button>Dismiss</Button>
      </NavigationLink>
    </VStack>
  )
}

function NestedPage() {
  return (
    <ScrollView>
      <VStack spacing={20}>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Nested Page</Text>
        <Section header={<Text style={{ fontWeight: 'bold' }}>Content</Text>}>
          <Text>This page demonstrates nested navigation</Text>
        </Section>
        <NavigationLink destination={DetailPage}>
          <Button>Go to Detail</Button>
        </NavigationLink>
        <NavigationLink dismiss>
          <Button>Go Back</Button>
        </NavigationLink>
      </VStack>
    </ScrollView>
  )
}

export function NavigationDemo() {
  return (
    <NavigationStack>
      <VStack spacing={20}>
        <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Navigation Components</Text>
        
        <VStack spacing={15}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>NavigationLink Examples</Text>
          <VStack spacing={10}>
            <NavigationLink destination={DetailPage}>
              <Button>Go to Detail Page</Button>
            </NavigationLink>
            <NavigationLink destination={ActionSheetPage} pageOptions={{ type: 'actionsheet' }}>
              <Button>Show Action Sheet</Button>
            </NavigationLink>
            <NavigationLink destination={NestedPage}>
              <Button>Go to Nested Page</Button>
            </NavigationLink>
          </VStack>
        </VStack>

        <VStack spacing={15}>
          <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Navigation Features</Text>
          <VStack spacing={10} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <Text>• Push new pages</Text>
            <Text>• Dismiss pages</Text>
            <Text>• Action sheet presentation</Text>
            <Text>• Nested navigation</Text>
          </VStack>
        </VStack>
      </VStack>
    </NavigationStack>
  )
}

