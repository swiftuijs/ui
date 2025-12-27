import React, { useMemo, useState, useEffect } from 'react'
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

// Extract content component to use React hooks
function HomeContent({ geometry, isWide }: { geometry: { width: number; height: number; x: number; y: number }, isWide: boolean }) {
  const containerWidth = geometry.width
  
  // Use state to track isLargeScreen with hysteresis to prevent flickering at threshold
  const [isLargeScreen, setIsLargeScreen] = useState(containerWidth >= 1024)
  
  useEffect(() => {
    // Add hysteresis: use different thresholds when growing vs shrinking
    // This prevents oscillation at the boundary
    if (containerWidth >= 1040 && !isLargeScreen) {
      // Growing: only switch to large when we're clearly above threshold
      setIsLargeScreen(true)
    } else if (containerWidth < 1008 && isLargeScreen) {
      // Shrinking: only switch to small when we're clearly below threshold
      setIsLargeScreen(false)
    }
  }, [containerWidth, isLargeScreen])
  
  // Memoize calculated values to prevent unnecessary re-renders
  // Use larger padding for large screens instead of maxWidth to avoid affecting GeometryReader measurements
  const layoutConfig = useMemo(() => {
    let padding: string
    if (isLargeScreen) {
      // For large screens, calculate padding to center content with max 800px width
      // Total width is containerWidth, content should be max 800px
      const maxContentWidth = 800
      if (containerWidth > maxContentWidth + 80) {
        const sidePadding = Math.floor((containerWidth - maxContentWidth) / 2)
        padding = `40px ${sidePadding}px`
      } else {
        padding = '40px'
      }
    } else {
      padding = isWide ? '32px' : '16px'
    }
    
    return {
      isLargeScreen,
      padding,
      spacing: isLargeScreen ? 32 : 20
    }
  }, [isLargeScreen, isWide, containerWidth])
  
  // Memoize all style objects to prevent reference changes
  const containerStyle = useMemo(() => ({
    padding: layoutConfig.padding,
    width: '100%'
  }), [layoutConfig.padding])

  const headerStyle = useMemo(() => ({
    paddingTop: layoutConfig.isLargeScreen ? '20px' : '16px'
  }), [layoutConfig.isLargeScreen])

  const titleStyle = useMemo(() => ({
    fontSize: layoutConfig.isLargeScreen ? '18px' : '16px',
    color: '#666',
    textAlign: 'center' as const
  }), [layoutConfig.isLargeScreen])

  const gridStyle = useMemo(() => ({
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    width: '100%'
  }), [])

  const showcaseStyle = useMemo(() => ({
    padding: layoutConfig.isLargeScreen ? '24px' : '16px',
    backgroundColor: '#f2f2f7',
    borderRadius: '12px',
    marginTop: '20px'
  }), [layoutConfig.isLargeScreen])

  // Memoize static styles
  const cardBaseStyle = useMemo(() => ({
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #e5e5ea',
    cursor: 'pointer' as const,
    transition: 'all 0.2s',
    backgroundColor: '#ffffff'
  }), [])

  const listItemStyle = useMemo(() => ({
    padding: '12px',
    cursor: 'pointer' as const
  }), [])

  return (
    <VStack spacing={layoutConfig.spacing} style={containerStyle}>
        <VStack spacing={8} style={headerStyle}>
          <Text style={titleStyle}>
            Discover amazing products
          </Text>
        </VStack>

        {layoutConfig.isLargeScreen ? (
                // Desktop: Grid layout
                <div style={gridStyle}>
                  {categories.map((category) => (
                    <NavigationLink
                      key={category.id}
                      destination={() => <ProductListPage categoryId={category.id} categoryName={category.name} />}
                      pageOptions={{ type: 'page' }}
                    >
                      <div
                        style={cardBaseStyle}
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
                        <HStack spacing={16} style={listItemStyle}>
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

        <VStack spacing={8} style={showcaseStyle}>
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
}

export function HomePage() {
  const sizeClass = useSizeClass()
  const isWide = sizeClass?.horizontal === 'regular'

  return (
    <StandardPage id="home" navigationTitle="SwiftUI.js Shop">
      <GeometryReader>
        {(geometry) => <HomeContent geometry={geometry} isWide={isWide} />}
      </GeometryReader>
    </StandardPage>
  )
}
