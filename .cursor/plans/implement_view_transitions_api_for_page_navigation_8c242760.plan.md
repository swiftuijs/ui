---
name: Implement Flexible Transition System with Customizable API
overview: Implement a flexible, user-customizable transition system that supports View Transitions API (requiring coordination between source and target elements) and traditional CSS animations, with a SwiftUI-like declarative API.
todos: []
---

# Implement Flexible Transition System with Customizable API

## Overview

Create a flexible transition system that allows users to customize transition behavior through a declarative API. The system supports View Transitions API (requiring coordination between source and target elements with matching `view-transition-name`) and traditional CSS animations, similar to SwiftUI's `.transition()` modifier.

## Key Requirements

1. **User-Customizable API**: Allow users to specify transition behavior declaratively
2. **View Transitions Coordination**: Support setting `view-transition-name` on both source and target elements
3. **Multiple Transition Types**: Support slide, fade, view-transition, and custom animations
4. **SwiftUI-like API**: Declarative, component-based configuration

## Transition API Design

### 1. Transition Configuration Types

**File**: `src/types/transition.d.ts` (new)

```typescript
/**
 * Transition animation types
 */
export type TransitionType = 
  | 'slide'           // Slide in/out (default for NavigationStack)
  | 'fade'            // Fade in/out
  | 'scale'           // Scale animation
  | 'view-transition' // View Transitions API
  | 'none'            // No animation

/**
 * Transition direction for slide animations
 */
export type TransitionDirection = 
  | 'forwards'  // Push new page (slide from right)
  | 'backwards' // Pop page (slide to right)
  | 'auto'      // Auto-detect based on navigation

/**
 * Transition configuration
 */
export interface ITransitionConfig {
  /**
   * Transition type
   * @default 'slide' for pages, 'fade' for modals
   */
  type?: TransitionType
  
  /**
   * Transition direction (for slide type)
   * @default 'auto'
   */
  direction?: TransitionDirection
  
  /**
   * View transition name for shared element animations
   * Must match between source and target elements
   */
  viewTransitionName?: string
  
  /**
   * Custom animation duration (ms)
   * @default 300
   */
  duration?: number
  
  /**
   * Custom easing function
   * @default 'cubic-bezier(0.075, 0.82, 0.165, 1)'
   */
  easing?: string
}
```

### 2. Transition Modifier Component

**File**: `src/components/Transition/index.tsx` (new)

Create a wrapper component that applies transition configuration:

```typescript
interface ITransitionProps {
  config?: ITransitionConfig
  children: ReactNode
}

export const Transition = ({ config, children }) => {
  // Apply view-transition-name if specified
  // Apply transition styles
  // Coordinate with parent navigation context
}
```

### 3. Update NavigationLink to Support Transition Config

**File**: `src/components/NavigationLink/index.tsx`

Add transition configuration to `pageOptions`:

```typescript
interface IPageOptions {
  type?: IPageType
  transition?: ITransitionConfig  // NEW
}
```

**Usage Example**:
```tsx
<NavigationLink 
  destination={DetailPage}
  pageOptions={{
    transition: {
      type: 'view-transition',
      viewTransitionName: 'product-card'
    }
  }}
>
  <div view-transition-name="product-card">
    <ProductCard />
  </div>
</NavigationLink>
```

### 4. Update StandardPage to Accept Transition Config

**File**: `src/components/Page/standard-page/index.tsx`

Add transition prop and apply configuration:

```typescript
interface IStandardProps extends IPageBaseComponent {
  // ... existing props
  transition?: ITransitionConfig  // NEW
}
```

### 5. View Transitions Coordination System

**File**: `src/common/view-transition.ts`

Enhance to support named transitions and coordination:

```typescript
export interface IViewTransitionOptions {
  update: () => void
  type: 'forwards' | 'backwards'
  transitionName?: string  // For shared element animations
}

export async function startViewTransition(
  options: IViewTransitionOptions
) {
  if (!document.startViewTransition) {
    options.update()
    return
  }
  
  // Set view-transition-name on elements before transition
  if (options.transitionName) {
    // Coordinate with source element
    setViewTransitionNameForElements(options.transitionName)
  }
  
  const transition = document.startViewTransition(() => {
    options.update()
  })
  
  if (transition.types && options.type) {
    transition.types.add(options.type)
  }
  
  await transition.updateCallbackDone
}
```

### 6. Transition Manager

**File**: `src/common/transition-manager.ts` (new)

Centralized transition logic:

```typescript
export class TransitionManager {
  /**
   * Apply transition configuration to element
   */
  static applyTransition(
    element: HTMLElement,
    config: ITransitionConfig,
    direction: 'forwards' | 'backwards'
  ) {
    // Set view-transition-name if specified
    if (config.viewTransitionName) {
      element.style.viewTransitionName = config.viewTransitionName
    }
    
    // Apply transition class based on type
    // Handle CSS animations vs View Transitions
  }
  
  /**
   * Get transition mode based on config and browser support
   */
  static getTransitionMode(config: ITransitionConfig): 'css' | 'view-transition' {
    if (config.type === 'view-transition' && document.startViewTransition) {
      return 'view-transition'
    }
    return 'css'
  }
}
```

### 7. Update Page Component

**File**: `src/components/Page/index.tsx`

- Accept transition config from props
- Apply transition based on config
- Coordinate with NavigationStack for direction
- Set view-transition-name when needed

### 8. Update NavigationStack

**File**: `src/components/NavigationStack/view-model.tsx`

- Pass transition config from pageOptions to Page component
- Determine transition direction (forwards/backwards)
- Coordinate View Transitions when needed

### 9. CSS Updates for Multiple Transition Types

**File**: `src/components/Page/standard-page/style.scss`

- Keep existing slide animations
- Add fade, scale animations
- Support view-transition-name styling

**File**: `src/style/view-transition.scss`

- Update View Transitions styles
- Support named transitions
- Add shared element animation styles

### 10. Transition Hook for Advanced Usage

**File**: `src/hooks/useTransition.ts` (new)

Provide a hook for programmatic transition control:

```typescript
export function useTransition(config?: ITransitionConfig) {
  const applyTransition = useCallback((updateFn: () => void) => {
    // Apply transition based on config
  }, [config])
  
  return { applyTransition }
}
```

## Usage Examples

### Example 1: Default Slide Animation (Current Behavior)
```tsx
// No config needed - uses default slide animation
<NavigationLink destination={ListPage}>
  <Button>Go to List</Button>
</NavigationLink>
```

### Example 2: View Transitions with Shared Element
```tsx
// Source element (in list)
<NavigationLink 
  destination={ProductDetail}
  pageOptions={{
    transition: {
      type: 'view-transition',
      viewTransitionName: 'product-image'
    }
  }}
>
  <div style={{ viewTransitionName: 'product-image' }}>
    <Image src={product.thumbnail} />
  </div>
</NavigationLink>

// Target element (in detail page)
<StandardPage 
  id="detail"
  transition={{
    type: 'view-transition',
    viewTransitionName: 'product-image'
  }}
>
  <Image 
    src={product.fullImage}
    style={{ viewTransitionName: 'product-image' }}
  />
</StandardPage>
```

### Example 3: Custom Fade Transition
```tsx
<NavigationLink 
  destination={ModalPage}
  pageOptions={{
    type: 'actionsheet',
    transition: {
      type: 'fade',
      duration: 200
    }
  }}
>
  <Button>Open Modal</Button>
</NavigationLink>
```

### Example 4: TabView with View Transitions
```tsx
<TabView 
  items={tabs}
  transition={{
    type: 'view-transition',
    direction: 'auto'
  }}
/>
```

### Example 5: Programmatic Transition
```tsx
function CustomComponent() {
  const { applyTransition } = useTransition({
    type: 'view-transition',
    viewTransitionName: 'custom-element'
  })
  
  const handleUpdate = () => {
    applyTransition(() => {
      // Update state/DOM
    })
  }
  
  return <div view-transition-name="custom-element">...</div>
}
```

## View Transitions Coordination

### How It Works

1. **Source Element**: Set `view-transition-name` on the element that triggers navigation
2. **Target Element**: Set the same `view-transition-name` on the corresponding element in the new page
3. **Transition**: View Transitions API automatically morphs between them

### Implementation Details

```typescript
// When NavigationLink is clicked with viewTransitionName
function handleNavigation(transitionName?: string) {
  if (transitionName) {
    // Find source element with view-transition-name
    const sourceElement = document.querySelector(
      `[view-transition-name="${transitionName}"]`
    )
    
    // Store transition name in navigation context
    naviContext.setTransitionName(transitionName)
  }
  
  // Navigate
  naviContext.append(page)
}

// In target page
function StandardPage({ transition }) {
  useEffect(() => {
    if (transition?.viewTransitionName) {
      // Apply view-transition-name to target element
      // This should be done by the user in their component
    }
  }, [])
}
```

## Benefits

1. **Flexible**: Users can choose the right transition for each scenario
2. **Declarative**: SwiftUI-like API, easy to use
3. **Powerful**: Supports shared element animations via View Transitions
4. **Backward Compatible**: Default behavior unchanged
5. **Performant**: Uses View Transitions where beneficial, CSS animations as fallback

## Migration Strategy

1. Add transition config types and utilities
2. Update NavigationLink and Page to accept transition config
3. Implement View Transitions support
4. Keep existing CSS animations as default
5. Users can opt-in to View Transitions per navigation

## Component Documentation (README.mdx)

### 11. Create Component README Files

**Goal**: Add comprehensive README.mdx files for each component to provide detailed usage examples beyond what Storybook stories can show.

**Files to Create**: `src/components/{ComponentName}/README.mdx`

**Structure for each README.mdx**:
- Component overview and SwiftUI correspondence
- Basic usage examples
- Advanced usage patterns
- Props reference with detailed explanations
- Common use cases and patterns
- Integration examples with other components
- Best practices and tips

**Priority Components** (start with these):
1. NavigationBar - Document transition usage, toolbar items, back button behavior
2. StandardPage - Document navigationTitle, toolbarItems, transition config
3. NavigationLink - Document transition configuration, pageOptions
4. GeometryReader - Document responsive layout patterns
5. TabView - Document tab switching and transition options
6. Form - Document form handling patterns
7. List/Section - Document list patterns and navigation

**Template Structure**:
```mdx
import { Meta } from '@storybook/blocks'
import { Canvas, Story } from '@storybook/blocks'

<Meta title="Components/NavigationBar" />

# NavigationBar

## Overview

NavigationBar is a component that displays a title, optional back button, and toolbar items. It's automatically used by StandardPage when a `navigationTitle` is provided.

## Basic Usage

### Simple Navigation Bar

\`\`\`tsx
<StandardPage id="home" navigationTitle="Home">
  <VStack>...</VStack>
</StandardPage>
\`\`\`

## Advanced Usage

### With Toolbar Items

\`\`\`tsx
<StandardPage 
  id="detail" 
  navigationTitle="Product Details"
  toolbarItems={
    <HStack spacing={8}>
      <Button>Share</Button>
      <Button>Edit</Button>
    </HStack>
  }
>
  ...
</StandardPage>
\`\`\`

## Props Reference

...
```

**Implementation**:
- Create README.mdx for NavigationBar first (as example)
- Then create for other priority components
- Use consistent structure and format
- Include real-world examples
- Link to related components
