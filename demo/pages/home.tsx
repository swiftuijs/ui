import { VStack, Text, List, Section, NavigationLink, HStack, Spacer } from 'src/index'
import { StandardPage } from 'src/components/Page/standard-page'
import { ProductListPage } from './product-list'

// Product categories data
const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    description: 'Latest gadgets and devices',
    color: '#007aff'
  },
  {
    id: 'clothing',
    name: 'Fashion & Clothing',
    icon: '👕',
    description: 'Trendy apparel and accessories',
    color: '#ff3b30'
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: '🏠',
    description: 'Furniture and decor',
    color: '#34c759'
  },
  {
    id: 'books',
    name: 'Books & Media',
    icon: '📚',
    description: 'Books, movies, and music',
    color: '#ff9500'
  }
]

export function HomePage() {
  return (
    <StandardPage id="home">
      <VStack spacing={20} style={{ padding: '16px' }}>
        <VStack spacing={8}>
          <Text style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>
            SwiftUI Shop
          </Text>
          <Text style={{ fontSize: '16px', color: '#666', textAlign: 'center' }}>
            Discover amazing products
          </Text>
        </VStack>

        <List>
          {categories.map((category) => (
            <Section key={category.id}>
              <NavigationLink
                destination={() => <ProductListPage categoryId={category.id} categoryName={category.name} />}
                pageOptions={{ type: 'page' }}
              >
                <HStack spacing={16} style={{ padding: '12px', cursor: 'pointer' }}>
                  <Text style={{ fontSize: '32px' }}>{category.icon}</Text>
                  <VStack spacing={4} alignment="leading" style={{ flex: 1 }}>
                    <Text style={{ fontSize: '18px', fontWeight: '600' }}>
                      {category.name}
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#666' }}>
                      {category.description}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text style={{ fontSize: '20px', color: category.color }}>›</Text>
                </HStack>
              </NavigationLink>
            </Section>
          ))}
        </List>

        <VStack spacing={8} style={{ 
          padding: '16px', 
          backgroundColor: '#f2f2f7', 
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <Text style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
            💡 Component Showcase
          </Text>
          <Text style={{ fontSize: '12px', color: '#999' }} lineLimit={3}>
            This demo showcases all SwiftUI components in a real-world shopping app. 
            Notice how components support custom styling via className and style props, 
            maintaining SwiftUI's design principles while offering React flexibility.
          </Text>
        </VStack>
      </VStack>
    </StandardPage>
  )
}

