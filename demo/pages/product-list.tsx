import { useState } from 'react'
import { VStack, HStack, Text, List, Section, Image, Button, Divider, Spacer, ScrollView, NavigationLink, GeometryReader, LazyVGrid } from 'src/index'
import { StandardPage } from 'src/components/Page/standard-page'
import { ProductDetailPage } from './product-detail'
import { CartPage } from './cart'

// Product data
const products: Record<string, Array<{
  id: string
  name: string
  price: number
  image: string
  description: string
  rating: number
  inStock: boolean
}>> = {
  electronics: [
    {
      id: 'iphone-15',
      name: 'iPhone 15 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      description: 'Latest iPhone with A17 Pro chip',
      rating: 4.8,
      inStock: true
    },
    {
      id: 'macbook-air',
      name: 'MacBook Air M3',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      description: 'Supercharged by M3 chip',
      rating: 4.9,
      inStock: true
    },
    {
      id: 'airpods-pro',
      name: 'AirPods Pro',
      price: 249,
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
      description: 'Active Noise Cancellation',
      rating: 4.7,
      inStock: true
    }
  ],
  clothing: [
    {
      id: 'tshirt-1',
      name: 'Classic White T-Shirt',
      price: 29,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      description: '100% Organic Cotton',
      rating: 4.5,
      inStock: true
    },
    {
      id: 'jeans-1',
      name: 'Slim Fit Jeans',
      price: 79,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      description: 'Premium Denim',
      rating: 4.6,
      inStock: false
    },
    {
      id: 'jacket-1',
      name: 'Winter Jacket',
      price: 149,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      description: 'Waterproof & Warm',
      rating: 4.8,
      inStock: true
    }
  ],
  home: [
    {
      id: 'lamp-1',
      name: 'Modern Table Lamp',
      price: 89,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
      description: 'LED Smart Lamp',
      rating: 4.4,
      inStock: true
    },
    {
      id: 'chair-1',
      name: 'Ergonomic Office Chair',
      price: 299,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
      description: 'Comfortable & Adjustable',
      rating: 4.7,
      inStock: true
    }
  ],
  books: [
    {
      id: 'book-1',
      name: 'The Swift Programming Language',
      price: 39,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Official guide to Swift',
      rating: 4.9,
      inStock: true
    },
    {
      id: 'book-2',
      name: 'React Design Patterns',
      price: 45,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      description: 'Best practices for React',
      rating: 4.6,
      inStock: true
    }
  ]
}

interface ProductListPageProps {
  categoryId: string
  categoryName: string
}

function ProductCard({ product, onAddToCart, isInCart }: {
  product: typeof products[string][0]
  onAddToCart: (id: string) => void
  isInCart: boolean
}) {
  return (
    <VStack spacing={12} style={{ 
      padding: '16px', 
      border: '1px solid #e5e5ea',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      height: '100%'
    }}>
      <Image
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
      <VStack spacing={6} alignment="leading">
        <Text style={{ fontSize: '18px', fontWeight: '600' }}>
          {product.name}
        </Text>
        <Text style={{ fontSize: '14px', color: '#666' }} lineLimit={2}>
          {product.description}
        </Text>
        <HStack spacing={8} alignment="center">
          <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#007aff' }}>
            ${product.price}
          </Text>
          <Spacer />
          <Text style={{ fontSize: '14px', color: '#666' }}>
            ⭐ {product.rating}
          </Text>
        </HStack>
        {!product.inStock && (
          <Text style={{ fontSize: '12px', color: '#ff3b30' }}>
            Out of Stock
          </Text>
        )}
      </VStack>
      <HStack spacing={12}>
        <NavigationLink
          destination={() => <ProductDetailPage product={product} />}
          pageOptions={{ type: 'page' }}
        >
          <Button
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: '1px solid #007aff',
              color: '#007aff'
            }}
          >
            View
          </Button>
        </NavigationLink>
        <Button
          onClick={() => onAddToCart(product.id)}
          disabled={!product.inStock || isInCart}
          style={{
            flex: 1,
            backgroundColor: isInCart ? '#34c759' : '#007aff',
            color: 'white',
            border: 'none'
          }}
        >
          {isInCart ? '✓' : 'Add'}
        </Button>
      </HStack>
    </VStack>
  )
}

export function ProductListPage({ categoryId, categoryName }: ProductListPageProps) {
  const [cart, setCart] = useState<string[]>([])
  const categoryProducts = products[categoryId] || []

  const addToCart = (productId: string) => {
    setCart([...cart, productId])
  }

  const isInCart = (productId: string) => cart.includes(productId)

  return (
    <StandardPage id={`products-${categoryId}`} navigationTitle={categoryName}>
      <GeometryReader>
        {(geometry) => {
          const containerWidth = geometry.width
          const isLargeScreen = containerWidth >= 1024
          const isMediumScreen = containerWidth >= 768
          const padding = isLargeScreen ? '40px' : isMediumScreen ? '24px' : '16px'
          const columns = isLargeScreen ? 3 : isMediumScreen ? 2 : 1

          return (
            <ScrollView direction="vertical" showsIndicators={true}>
              <VStack spacing={0}>
                <VStack spacing={8} style={{ padding, paddingBottom: '16px' }}>
                  <Text style={{ fontSize: isLargeScreen ? '32px' : '24px', fontWeight: 'bold' }}>
                    {categoryName}
                  </Text>
                </VStack>

                {isLargeScreen || isMediumScreen ? (
                  // Desktop/Tablet: Grid layout
                  <div style={{ padding, paddingTop: 0 }}>
                    <LazyVGrid columns={columns} spacing={24}>
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={addToCart}
                          isInCart={isInCart(product.id)}
                        />
                      ))}
                    </LazyVGrid>
                  </div>
                ) : (
                  // Mobile: List layout
                  <List>
                    {categoryProducts.map((product, index) => (
                      <Section key={product.id}>
                        <VStack spacing={12} style={{ padding: '16px' }}>
                          <HStack spacing={16}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                              }}
                            />
                            <VStack spacing={6} alignment="leading" style={{ flex: 1 }}>
                              <Text style={{ fontSize: '18px', fontWeight: '600' }}>
                                {product.name}
                              </Text>
                              <Text style={{ fontSize: '14px', color: '#666' }} lineLimit={2}>
                                {product.description}
                              </Text>
                              <HStack spacing={8} alignment="center">
                                <Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#007aff' }}>
                                  ${product.price}
                                </Text>
                                <Spacer />
                                <Text style={{ fontSize: '14px', color: '#666' }}>
                                  ⭐ {product.rating}
                                </Text>
                              </HStack>
                              {!product.inStock && (
                                <Text style={{ fontSize: '12px', color: '#ff3b30' }}>
                                  Out of Stock
                                </Text>
                              )}
                            </VStack>
                          </HStack>

                          <HStack spacing={12}>
                            <NavigationLink
                              destination={() => <ProductDetailPage product={product} />}
                              pageOptions={{ type: 'page' }}
                            >
                              <Button
                                style={{
                                  flex: 1,
                                  backgroundColor: 'transparent',
                                  border: '1px solid #007aff',
                                  color: '#007aff'
                                }}
                              >
                                View Details
                              </Button>
                            </NavigationLink>
                            <Button
                              onClick={() => addToCart(product.id)}
                              disabled={!product.inStock || isInCart(product.id)}
                              style={{
                                flex: 1,
                                backgroundColor: isInCart(product.id) ? '#34c759' : '#007aff',
                                color: 'white',
                                border: 'none'
                              }}
                            >
                              {isInCart(product.id) ? '✓ In Cart' : 'Add to Cart'}
                            </Button>
                          </HStack>
                        </VStack>
                        {index < categoryProducts.length - 1 && <Divider />}
                      </Section>
                    ))}
                  </List>
                )}

                {categoryProducts.length === 0 && (
                  <VStack spacing={16} style={{ padding: '40px', alignItems: 'center' }}>
                    <Text style={{ fontSize: '48px' }}>📦</Text>
                    <Text style={{ fontSize: '18px', color: '#666' }}>
                      No products in this category
                    </Text>
                  </VStack>
                )}

                {cart.length > 0 && (
                  <VStack spacing={12} style={{ 
                    padding, 
                    backgroundColor: '#f2f2f7',
                    marginTop: '20px'
                  }}>
                    <HStack spacing={8} alignment="center">
                      <Text style={{ fontSize: '16px', fontWeight: '600' }}>
                        🛒 Cart ({cart.length} items)
                      </Text>
                      <Spacer />
                      <NavigationLink
                        destination={() => <CartPage cartItems={cart} products={categoryProducts} />}
                        pageOptions={{ type: 'page' }}
                      >
                        <Button style={{
                          backgroundColor: '#007aff',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px'
                        }}>
                          View Cart
                        </Button>
                      </NavigationLink>
                    </HStack>
                  </VStack>
                )}
              </VStack>
            </ScrollView>
          )
        }}
      </GeometryReader>
    </StandardPage>
  )
}
