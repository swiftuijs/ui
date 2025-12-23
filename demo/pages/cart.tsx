import { VStack, HStack, Text, List, Section, Image, Button, Divider, Spacer, ScrollView } from 'src/index'
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

interface CartPageProps {
  cartItems: string[]
  products: Product[]
}

export function CartPage({ cartItems, products }: CartPageProps) {
  const cartProducts = products.filter(p => cartItems.includes(p.id))
  const total = cartProducts.reduce((sum, p) => sum + p.price, 0)

  const removeFromCart = (productId: string) => {
    // This would typically update state, but for demo purposes we'll just show the UI
    console.log('Remove from cart:', productId)
  }

  return (
    <StandardPage id="cart">
      <ScrollView direction="vertical" showsIndicators={true}>
        <VStack spacing={20} style={{ padding: '16px' }}>
          <VStack spacing={4}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
              Shopping Cart
            </Text>
          </VStack>
          {cartProducts.length > 0 ? (
            <>
              <List>
                {cartProducts.map((product, index) => (
                  <Section key={product.id}>
                    <HStack spacing={16} style={{ padding: '12px' }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                      <VStack spacing={4} alignment="leading" style={{ flex: 1 }}>
                        <Text style={{ fontSize: '16px', fontWeight: '600' }}>
                          {product.name}
                        </Text>
                        <Text style={{ fontSize: '14px', color: '#666' }}>
                          ${product.price}
                        </Text>
                      </VStack>
                      <Button
                        onClick={() => removeFromCart(product.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #ff3b30',
                          color: '#ff3b30',
                          padding: '8px 12px',
                          fontSize: '14px'
                        }}
                      >
                        Remove
                      </Button>
                    </HStack>
                    {index < cartProducts.length - 1 && <Divider />}
                  </Section>
                ))}
              </List>

              {/* Order Summary */}
              <VStack spacing={16} style={{
                padding: '20px',
                backgroundColor: '#f2f2f7',
                borderRadius: '12px'
              }}>
                <VStack spacing={12}>
                  <HStack spacing={8}>
                    <Text style={{ fontSize: '16px', color: '#666' }}>Subtotal</Text>
                    <Spacer />
                    <Text style={{ fontSize: '16px', fontWeight: '600' }}>${total.toFixed(2)}</Text>
                  </HStack>
                  <HStack spacing={8}>
                    <Text style={{ fontSize: '16px', color: '#666' }}>Shipping</Text>
                    <Spacer />
                    <Text style={{ fontSize: '16px', fontWeight: '600' }}>Free</Text>
                  </HStack>
                  <Divider />
                  <HStack spacing={8}>
                    <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Total</Text>
                    <Spacer />
                    <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#007aff' }}>
                      ${total.toFixed(2)}
                    </Text>
                  </HStack>
                </VStack>

                <Button
                  style={{
                    width: '100%',
                    backgroundColor: '#007aff',
                    color: 'white',
                    border: 'none',
                    padding: '16px',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}
                >
                  Proceed to Checkout
                </Button>
              </VStack>
            </>
          ) : (
            <VStack spacing={16} style={{ padding: '40px', alignItems: 'center' }}>
              <Text style={{ fontSize: '64px' }}>🛒</Text>
              <Text style={{ fontSize: '20px', fontWeight: '600' }}>
                Your cart is empty
              </Text>
              <Text style={{ fontSize: '16px', color: '#666', textAlign: 'center' }}>
                Add some products to get started!
              </Text>
            </VStack>
          )}

          {/* Component Showcase */}
          <VStack spacing={12} style={{
            padding: '16px',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
            border: '1px solid #ffc107'
          }}>
            <Text style={{ fontSize: '16px', fontWeight: '600', color: '#856404' }}>
              🎯 Component Usage in This Page
            </Text>
            <VStack spacing={6}>
              <Text style={{ fontSize: '14px', color: '#856404' }}>
                • ScrollView: Vertical scrolling for cart items
              </Text>
              <Text style={{ fontSize: '14px', color: '#856404' }}>
                • List & Section: Organized cart item display
              </Text>
              <Text style={{ fontSize: '14px', color: '#856404' }}>
                • HStack & VStack: Flexible layouts
              </Text>
              <Text style={{ fontSize: '14px', color: '#856404' }}>
                • Spacer: Dynamic spacing
              </Text>
              <Text style={{ fontSize: '14px', color: '#856404' }}>
                • Button: Interactive actions
              </Text>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </StandardPage>
  )
}

