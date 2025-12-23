import { VStack, Text, List, Section, NavigationLink, HStack, Spacer, useSizeClass, GeometryReader } from 'src/index'
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
  const sizeClass = useSizeClass()
  const isWide = sizeClass?.horizontal === 'regular'

  return (
    <StandardPage id="home" navigationTitle="SwiftUI.js Shop">
      <GeometryReader>
        {(geometry) => {
          const containerWidth = geometry.width
          const isLargeScreen = containerWidth >= 1024
          const padding = isLargeScreen ? '40px' : isWide ? '32px' : '16px'
          const maxContentWidth = isLargeScreen ? '800px' : '100%'
          const margin = isLargeScreen ? '0 auto' : '0'

          return (
            <VStack spacing={isLargeScreen ? 32 : 20} style={{ padding, maxWidth: maxContentWidth, margin }}>
              <VStack spacing={8} style={{ paddingTop: isLargeScreen ? '20px' : '16px' }}>
                <Text style={{ 
                  fontSize: isLargeScreen ? '18px' : '16px', 
                  color: '#666', 
                  textAlign: 'center' 
                }}>
                  Discover amazing products
                </Text>
              </VStack>

              {isLargeScreen ? (
                // Desktop: Grid layout
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px',
                    width: '100%',
                  }}
                >
                  {categories.map((category) => (
                    <NavigationLink
                      key={category.id}
                      destination={() => <ProductListPage categoryId={category.id} categoryName={category.name} />}
                      pageOptions={{ type: 'page' }}
                    >
                      <div
                        style={{
                          padding: '24px',
                          borderRadius: '12px',
                          border: '1px solid #e5e5ea',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          backgroundColor: '#ffffff',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <HStack spacing={16}>
                          <Text style={{ fontSize: '40px' }}>{category.icon}</Text>
                          <VStack spacing={4} alignment="leading" style={{ flex: 1 }}>
                            <Text style={{ fontSize: '20px', fontWeight: '600' }}>
                              {category.name}
                            </Text>
                            <Text style={{ fontSize: '14px', color: '#666' }}>
                              {category.description}
                            </Text>
                          </VStack>
                          <Text style={{ fontSize: '24px', color: category.color }}>›</Text>
                        </HStack>
                      </div>
                    </NavigationLink>
                  ))}
                </div>
              ) : (
                // Mobile/Tablet: List layout
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
              )}

              <VStack spacing={8} style={{ 
                padding: isLargeScreen ? '24px' : '16px', 
                backgroundColor: '#f2f2f7', 
                borderRadius: '12px',
                marginTop: '20px'
              }}>
                <Text style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  💡 Component Showcase
                </Text>
                <Text style={{ fontSize: '12px', color: '#999' }} lineLimit={3}>
                  This demo showcases all SwiftUI.js components in a real-world shopping app. 
                  Notice how components support responsive layouts using SizeClass and GeometryReader, 
                  maintaining SwiftUI's design principles while offering React flexibility.
                </Text>
              </VStack>
            </VStack>
          )
        }}
      </GeometryReader>
    </StandardPage>
  )
}
