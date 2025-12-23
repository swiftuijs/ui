import ReactDom from 'react-dom/client'
import { VStack, NavigationLink, NavigationStack, Text, Section } from 'src/index'

import { LayoutDemo } from './pages/layout-demo'
import { ContentDemo } from './pages/content-demo'
import { ListDemo } from './pages/list-demo'
import { ScrollDemo } from './pages/scroll-demo'
import { NavigationDemo } from './pages/navigation-demo'

export const App = () => {
  return (
    <NavigationStack>
      <VStack spacing={20} style={{ padding: '20px' }}>
        <Text style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
          SwiftUI Components Demo
        </Text>
        <Text style={{ color: '#666', marginBottom: '20px' }}>
          Explore all SwiftUI components implemented in React
        </Text>
        
        <Section header={<Text style={{ fontWeight: 'bold', fontSize: '18px' }}>Component Demos</Text>}>
          <VStack spacing={15}>
            <NavigationLink destination={LayoutDemo}>
              <Text style={{ fontSize: '16px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                📐 Layout Components (HStack, VStack, ZStack, Spacer)
              </Text>
            </NavigationLink>
            
            <NavigationLink destination={ContentDemo}>
              <Text style={{ fontSize: '16px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                📝 Content Components (Text, Image, Button, Link)
              </Text>
            </NavigationLink>
            
            <NavigationLink destination={ListDemo}>
              <Text style={{ fontSize: '16px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                📋 List Components (List, Section, Divider)
              </Text>
            </NavigationLink>
            
            <NavigationLink destination={ScrollDemo}>
              <Text style={{ fontSize: '16px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                📜 ScrollView Components
              </Text>
            </NavigationLink>
            
            <NavigationLink destination={NavigationDemo}>
              <Text style={{ fontSize: '16px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                🧭 Navigation Components (NavigationStack, NavigationLink, Page)
              </Text>
            </NavigationLink>
          </VStack>
        </Section>
      </VStack>
    </NavigationStack>
  )
}

ReactDom.createRoot(document.getElementById('root')!).render(<App />)
