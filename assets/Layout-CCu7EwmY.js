import{u as i,j as e,M as c}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function s(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Layout",order:4}),`
`,e.jsx(n.h1,{id:"layout-system",children:"Layout System"}),`
`,e.jsx(n.p,{children:"SwiftUI.js provides a powerful layout system to help you create flexible, responsive user interfaces."}),`
`,e.jsx(n.h2,{id:"layout-basics",children:"Layout Basics"}),`
`,e.jsx(n.h3,{id:"stack-layouts",children:"Stack Layouts"}),`
`,e.jsx(n.p,{children:"Stack is the most basic layout component in SwiftUI.js, used to arrange child components."}),`
`,e.jsx(n.h4,{id:"hstack---horizontal-layout",children:"HStack - Horizontal Layout"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"HStack"})," arranges child components horizontally in a row."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { HStack, Text } from '@swiftuijs/ui'

<HStack spacing={10} alignment="center">
  <Text>Left</Text>
  <Text>Center</Text>
  <Text>Right</Text>
</HStack>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Properties"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spacing"}),": Spacing between child components (in pixels)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"alignment"}),": Alignment method ('start' | 'center' | 'end' | 'stretch')"]}),`
`]}),`
`,e.jsx(n.h4,{id:"vstack---vertical-layout",children:"VStack - Vertical Layout"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"VStack"})," arranges child components vertically in a column."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { VStack, Text } from '@swiftuijs/ui'

<VStack spacing={10} alignment="center">
  <Text>Top</Text>
  <Text>Middle</Text>
  <Text>Bottom</Text>
</VStack>
`})}),`
`,e.jsx(n.h4,{id:"zstack---overlay-layout",children:"ZStack - Overlay Layout"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"ZStack"})," stacks child components on top of each other, with later-rendered components on top."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ZStack, Image, Text } from '@swiftuijs/ui'

<ZStack alignment="center">
  <Image src="/bg.jpg" alt="Background" />
  <Text style={{ color: 'white' }}>Overlay Text</Text>
</ZStack>
`})}),`
`,e.jsx(n.h2,{id:"alignment",children:"Alignment"}),`
`,e.jsx(n.h3,{id:"hstack-alignment",children:"HStack Alignment"}),`
`,e.jsxs(n.p,{children:["For ",e.jsx(n.code,{children:"HStack"}),", ",e.jsx(n.code,{children:"alignment"})," controls vertical alignment:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"start"}),": Top alignment"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"center"}),": Center alignment (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"end"}),": Bottom alignment"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"stretch"}),": Stretch to fill"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<HStack alignment="start">
  <Text>Top Aligned</Text>
</HStack>
`})}),`
`,e.jsx(n.h3,{id:"vstack-alignment",children:"VStack Alignment"}),`
`,e.jsxs(n.p,{children:["For ",e.jsx(n.code,{children:"VStack"}),", ",e.jsx(n.code,{children:"alignment"})," controls horizontal alignment:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"start"}),": Left alignment"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"center"}),": Center alignment (default)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"end"}),": Right alignment"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"stretch"}),": Stretch to fill"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<VStack alignment="start">
  <Text>Left Aligned</Text>
</VStack>
`})}),`
`,e.jsx(n.h2,{id:"spacer---flexible-space",children:"Spacer - Flexible Space"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Spacer"})," is used to create flexible space in layouts, automatically filling available space."]}),`
`,e.jsx(n.h3,{id:"using-in-hstack",children:"Using in HStack"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { HStack, Spacer, Text } from '@swiftuijs/ui'

<HStack>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</HStack>
`})}),`
`,e.jsx(n.h3,{id:"using-in-vstack",children:"Using in VStack"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { VStack, Spacer, Text } from '@swiftuijs/ui'

<VStack>
  <Text>Top</Text>
  <Spacer />
  <Text>Bottom</Text>
</VStack>
`})}),`
`,e.jsx(n.h3,{id:"minimum-size",children:"Minimum Size"}),`
`,e.jsxs(n.p,{children:["You can set the minimum size for ",e.jsx(n.code,{children:"Spacer"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<Spacer minLength={20} />
`})}),`
`,e.jsx(n.h2,{id:"nested-layouts",children:"Nested Layouts"}),`
`,e.jsx(n.p,{children:"You can nest different Stack components to create complex layouts:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<VStack spacing={20}>
  <HStack spacing={10}>
    <Text>Item 1</Text>
    <Text>Item 2</Text>
  </HStack>
  <HStack spacing={10}>
    <Text>Item 3</Text>
    <Text>Item 4</Text>
  </HStack>
</VStack>
`})}),`
`,e.jsx(n.h2,{id:"grid-layouts",children:"Grid Layouts"}),`
`,e.jsx(n.h3,{id:"lazyvgrid---vertical-grid",children:"LazyVGrid - Vertical Grid"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"LazyVGrid"})," creates a vertical grid layout with customizable columns and spacing."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { LazyVGrid } from '@swiftuijs/ui'

<LazyVGrid columns={3} spacing={10}>
  {items.map(item => (
    <Item key={item.id} {...item} />
  ))}
</LazyVGrid>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Properties"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"columns"}),": Number of columns"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"spacing"}),": Grid spacing (in pixels)"]}),`
`]}),`
`,e.jsx(n.h3,{id:"lazyhgrid---horizontal-grid",children:"LazyHGrid - Horizontal Grid"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"LazyHGrid"})," creates a horizontal grid layout."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { LazyHGrid } from '@swiftuijs/ui'

<LazyHGrid rows={2} spacing={10}>
  {items.map(item => (
    <Item key={item.id} {...item} />
  ))}
</LazyHGrid>
`})}),`
`,e.jsx(n.h2,{id:"responsive-layouts",children:"Responsive Layouts"}),`
`,e.jsx(n.h3,{id:"using-sizeclass",children:"Using SizeClass"}),`
`,e.jsx(n.p,{children:"Adjust layout based on screen size:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useSizeClass } from '@swiftuijs/ui'

function ResponsiveLayout() {
  const sizeClass = useSizeClass()
  
  if (sizeClass?.horizontal === 'compact') {
    return <VStack>...</VStack>
  }
  
  return <HStack>...</HStack>
}
`})}),`
`,e.jsx(n.h3,{id:"using-geometryreader",children:"Using GeometryReader"}),`
`,e.jsx(n.p,{children:"Get container dimensions and adjust layout based on size:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { GeometryReader } from '@swiftuijs/ui'

<GeometryReader>
  {(geometry) => (
    <VStack>
      <Text>Width: {geometry.width}</Text>
      <Text>Height: {geometry.height}</Text>
    </VStack>
  )}
</GeometryReader>
`})}),`
`,e.jsx(n.h2,{id:"layout-best-practices",children:"Layout Best Practices"}),`
`,e.jsx(n.h3,{id:"1-use-semantic-layouts",children:"1. Use Semantic Layouts"}),`
`,e.jsx(n.p,{children:"Choose the layout component that best expresses your intent:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// ✅ Good: Use VStack for vertical list
<VStack>
  <Item />
  <Item />
</VStack>

// ❌ Bad: Use HStack then rotate
<HStack style={{ transform: 'rotate(90deg)' }}>
  <Item />
</HStack>
`})}),`
`,e.jsx(n.h3,{id:"2-use-spacer-appropriately",children:"2. Use Spacer Appropriately"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"Spacer"})," should be used to create flexible space, not fixed spacing:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// ✅ Good: Use Spacer for flexible layout
<HStack>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</HStack>

// ✅ Good: Use spacing for fixed spacing
<HStack spacing={10}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</HStack>
`})}),`
`,e.jsx(n.h3,{id:"3-avoid-over-nesting",children:"3. Avoid Over-Nesting"}),`
`,e.jsx(n.p,{children:"Over-nesting affects performance and readability:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// ✅ Good: Clean nesting
<VStack>
  <HStack>...</HStack>
  <HStack>...</HStack>
</VStack>

// ❌ Bad: Over-nesting
<VStack>
  <VStack>
    <VStack>
      <HStack>...</HStack>
    </VStack>
  </VStack>
</VStack>
`})}),`
`,e.jsx(n.h3,{id:"4-use-lazy-components-for-performance",children:"4. Use Lazy Components for Performance"}),`
`,e.jsx(n.p,{children:"For long lists, use Lazy components:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// ✅ Good: Use LazyVStack
<LazyVStack>
  {items.map(item => <Item key={item.id} {...item} />)}
</LazyVStack>

// ❌ Bad: Use VStack directly (renders all items)
<VStack>
  {items.map(item => <Item key={item.id} {...item} />)}
</VStack>
`})}),`
`,e.jsx(n.h2,{id:"common-layout-patterns",children:"Common Layout Patterns"}),`
`,e.jsx(n.h3,{id:"centered-layout",children:"Centered Layout"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<HStack>
  <Spacer />
  <VStack>
    <Text>Centered Content</Text>
  </VStack>
  <Spacer />
</HStack>
`})}),`
`,e.jsx(n.h3,{id:"three-column-layout",children:"Three-Column Layout"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<HStack>
  <Sidebar />
  <Spacer />
  <MainContent />
  <Spacer />
  <Sidebar />
</HStack>
`})}),`
`,e.jsx(n.h3,{id:"card-layout",children:"Card Layout"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<LazyVGrid columns={3} spacing={16}>
  {cards.map(card => (
    <Card key={card.id} {...card} />
  ))}
</LazyVGrid>
`})}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next Steps"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["📱 Learn about ",e.jsx(n.a,{href:"/docs/Responsive",children:"Responsive Design"})," to create adaptive layouts"]}),`
`,e.jsxs(n.li,{children:["🎨 Check out ",e.jsx(n.a,{href:"/docs/Theming",children:"Theming"})," to customize styles"]}),`
`,e.jsxs(n.li,{children:["🧩 Browse ",e.jsx(n.a,{href:"/docs/Components",children:"Component Documentation"})," to learn more about components"]}),`
`]})]})}function l(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{l as default};
