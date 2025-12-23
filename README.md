# SwiftUI.js

A component library that brings SwiftUI's design philosophy and API to the JavaScript/React ecosystem.

> From a toy project to a production-ready component library

Check out the [online documentation](https://swiftuijs.github.io/ui) for a quick overview

## Features

- 🎨 **Declarative UI** - Build user interfaces using declarative syntax
- 📱 **iOS-Style Design** - Follows iOS Human Interface Guidelines
- 🔄 **Responsive Layout** - Supports adaptive layouts and SizeClass system
- 🧩 **Rich Components** - Provides 50+ components
- 📚 **Complete Documentation** - Detailed documentation and examples
- 🔧 **TypeScript Support** - Complete type definitions

## Quick Start

### Installation

```bash
# npm
npm install @swiftuijs/ui

# yarn
yarn add @swiftuijs/ui

# pnpm
pnpm add @swiftuijs/ui
```

### Usage

```tsx
import { VStack, HStack, Text, Button } from '@swiftuijs/ui'
import '@swiftuijs/ui/dist/ui.css'

function App() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Hello, SwiftUI.js!
      </Text>
      <HStack spacing={10}>
        <Button onClick={() => alert('Primary')}>Primary</Button>
        <Button onClick={() => alert('Secondary')}>Secondary</Button>
      </HStack>
    </VStack>
  )
}
```

## Implemented Components

### Layout Components
HStack, VStack, ZStack, ScrollView, Spacer, Form, TabView, GeometryReader, LazyVStack, LazyHStack, LazyVGrid, LazyHGrid

### Basic Views
Text, Image, Link, Label, Color

### Input Controls
Button, TextField, SecureField, TextEditor, Toggle, Picker, Stepper, Slider, DatePicker

### Navigation
NavigationStack, NavigationLink, Page

### Lists and Scrolling
List, Section, ForEach, ScrollView

### Display Components
Card, Alert, ProgressView, ActivityIndicator, Badge

### Interactive Components
Menu, Toolbar, Sheet

### Layout and Decoration
Divider, Group, GroupBox, DisclosureGroup, SafeArea

### Shape Components
Rectangle, Circle, RoundedRectangle

See the [complete component list](https://swiftuijs.github.io/ui/?path=/docs/component-index--docs) for all components.

## Documentation

- [Getting Started](https://swiftuijs.github.io/ui/?path=/docs/getting-started--docs)
- [Component Overview](https://swiftuijs.github.io/ui/?path=/docs/components--docs)
- [Layout System](https://swiftuijs.github.io/ui/?path=/docs/layout--docs)
- [Responsive Design](https://swiftuijs.github.io/ui/?path=/docs/responsive-design--docs)
- [Theming](https://swiftuijs.github.io/ui/?path=/docs/theming--docs)

## Development

```bash
# Install dependencies
pnpm install

# Add new component
pnpm gen

# Start dev server
pnpm dev

# Preview Storybook
pnpm sb

# Build library
pnpm build

# Build documentation
pnpm build-sb

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## SwiftUI Correspondence

SwiftUI.js component design stays as consistent as possible with SwiftUI. See the [Component Index](https://swiftuijs.github.io/ui/?path=/docs/component-index--docs) for complete correspondence.

## Responsive Support

SwiftUI.js implements a SizeClass system similar to SwiftUI, supporting adaptive layouts:

```tsx
import { useSizeClass } from '@swiftuijs/ui'

function ResponsiveLayout() {
  const sizeClass = useSizeClass()
  
  if (sizeClass?.horizontal === 'compact') {
    return <VStack>...</VStack>
  }
  
  return <HStack>...</HStack>
}
```

## License

MIT License

## Contributing

Contributions, bug reports, and suggestions are welcome!

GitHub: [https://github.com/swiftuijs/ui](https://github.com/swiftuijs/ui)
