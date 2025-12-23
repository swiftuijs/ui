import { VStack, HStack, Text, Image, Button, ScrollView, ZStack, Divider, Link } from 'src/index'
import { StandardPage } from 'src/components/Page/standard-page'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  rating: number
  inStock: boolean
}

interface ProductDetailPageProps {
  product: Product
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <StandardPage id={`product-${product.id}`} navigationTitle={product.name}>
      <ScrollView direction="vertical" showsIndicators={true}>
        <VStack spacing={20} style={{ padding: '16px' }}>
          <VStack spacing={4}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {product.name}
            </Text>
          </VStack>
          {/* Product Image with Overlay */}
          <ZStack alignment="center" style={{ 
            width: '100%', 
            height: '300px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#f2f2f7'
          }}>
            <Image
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {!product.inStock && (
              <VStack spacing={8} style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '12px 24px',
                borderRadius: '8px'
              }}>
                <Text style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>
                  Out of Stock
                </Text>
              </VStack>
            )}
          </ZStack>

          {/* Product Info */}
          <VStack spacing={12}>
            <HStack spacing={12} alignment="center">
              <VStack spacing={4} alignment="leading" style={{ flex: 1 }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  {product.name}
                </Text>
                <HStack spacing={8} alignment="center">
                  <Text style={{ fontSize: '16px', color: '#666' }}>
                    ⭐ {product.rating}
                  </Text>
                  <Text style={{ fontSize: '16px', color: '#999' }}>•</Text>
                  <Text style={{ fontSize: '16px', color: product.inStock ? '#34c759' : '#ff3b30' }}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Text>
                </HStack>
              </VStack>
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#007aff' }}>
                ${product.price}
              </Text>
            </HStack>

            <Divider />

            <VStack spacing={8}>
              <Text style={{ fontSize: '18px', fontWeight: '600' }}>
                Description
              </Text>
              <Text style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
                {product.description}
              </Text>
            </VStack>

            <VStack spacing={8}>
              <Text style={{ fontSize: '18px', fontWeight: '600' }}>
                Features
              </Text>
              <VStack spacing={8}>
                {['Premium Quality', 'Fast Shipping', '30-Day Return', 'Warranty Included'].map((feature, index) => (
                  <HStack key={index} spacing={12} alignment="center">
                    <Text style={{ fontSize: '20px' }}>✓</Text>
                    <Text style={{ fontSize: '16px', color: '#666' }}>{feature}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            <Divider />

            {/* Action Buttons */}
            <VStack spacing={12}>
              <Button
                disabled={!product.inStock}
                style={{
                  width: '100%',
                  backgroundColor: product.inStock ? '#007aff' : '#ccc',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: '1px solid #007aff',
                  color: '#007aff',
                  padding: '16px',
                  fontSize: '18px'
                }}
              >
                Add to Wishlist
              </Button>
            </VStack>

            {/* Custom Style Showcase */}
            <VStack spacing={12} style={{
              padding: '16px',
              backgroundColor: '#f2f2f7',
              borderRadius: '12px',
              marginTop: '20px'
            }}>
              <Text style={{ fontSize: '16px', fontWeight: '600', color: '#666' }}>
                🎨 Style Customization Demo
              </Text>
              <Text style={{ fontSize: '14px', color: '#999' }} lineLimit={3}>
                This page demonstrates component style flexibility. All components support 
                custom styling via the `style` prop, allowing you to create unique designs 
                while maintaining SwiftUI's component structure.
              </Text>
              <HStack spacing={8}>
                <Button
                  style={{
                    backgroundColor: '#ff3b30',
                    color: 'white',
                    border: 'none',
                    flex: 1
                  }}
                >
                  Custom Red
                </Button>
                <Button
                  style={{
                    backgroundColor: '#34c759',
                    color: 'white',
                    border: 'none',
                    flex: 1
                  }}
                >
                  Custom Green
                </Button>
              </HStack>
            </VStack>

            {/* Related Links */}
            <VStack spacing={8}>
              <Text style={{ fontSize: '16px', fontWeight: '600' }}>
                Related Links
              </Text>
              <Link destination="https://developer.apple.com/documentation/swiftui" target="_blank">
                <Text style={{ fontSize: '16px', color: '#007aff' }}>
                  SwiftUI Documentation →
                </Text>
              </Link>
              <Link destination="https://react.dev" target="_blank">
                <Text style={{ fontSize: '16px', color: '#007aff' }}>
                  React Documentation →
                </Text>
              </Link>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </StandardPage>
  )
}

