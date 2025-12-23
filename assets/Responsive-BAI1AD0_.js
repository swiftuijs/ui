import{u as t,j as n,M as r}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function i(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Responsive",order:5}),`
`,n.jsx(e.h1,{id:"responsive-design",children:"Responsive Design"}),`
`,n.jsx(e.p,{children:"SwiftUI.js provides powerful responsive design capabilities to help you create user interfaces that adapt to different screen sizes."}),`
`,n.jsx(e.h2,{id:"sizeclass-system",children:"SizeClass System"}),`
`,n.jsx(e.p,{children:"SwiftUI.js implements a SizeClass system similar to SwiftUI's, used to adjust layouts based on screen size."}),`
`,n.jsx(e.h3,{id:"what-is-sizeclass",children:"What is SizeClass?"}),`
`,n.jsx(e.p,{children:"SizeClass categorizes screen sizes into two types:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Compact"}),": Compact size (typically small screens)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Regular"}),": Regular size (typically large screens)"]}),`
`]}),`
`,n.jsx(e.p,{children:"SizeClass has two dimensions:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Horizontal"}),": Horizontal SizeClass"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Vertical"}),": Vertical SizeClass"]}),`
`]}),`
`,n.jsx(e.h3,{id:"using-sizeclass",children:"Using SizeClass"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useSizeClass } from '@swiftuijs/ui'

function ResponsiveLayout() {
  const sizeClass = useSizeClass()
  
  if (!sizeClass) {
    return <div>Loading...</div>
  }
  
  // Adjust layout based on SizeClass
  if (sizeClass.horizontal === 'compact') {
    return <VStack>...</VStack>
  }
  
  return <HStack>...</HStack>
}
`})}),`
`,n.jsx(e.h3,{id:"sizeclass-rules",children:"SizeClass Rules"}),`
`,n.jsx(e.p,{children:"By default:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Horizontal Compact"}),": width < 375px"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Horizontal Regular"}),": width >= 375px"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Vertical Compact"}),": height < 667px"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Vertical Regular"}),": height >= 667px"]}),`
`]}),`
`,n.jsx(e.h2,{id:"responsive-layout-patterns",children:"Responsive Layout Patterns"}),`
`,n.jsx(e.h3,{id:"orientation-switching",children:"Orientation Switching"}),`
`,n.jsx(e.p,{children:"Switch layout direction based on screen size:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useSizeClass } from '@swiftuijs/ui'

function AdaptiveStack() {
  const sizeClass = useSizeClass()
  
  const Stack = sizeClass?.horizontal === 'compact' ? VStack : HStack
  
  return (
    <Stack spacing={16}>
      <Text>Item 1</Text>
      <Text>Item 2</Text>
    </Stack>
  )
}
`})}),`
`,n.jsx(e.h3,{id:"conditional-rendering",children:"Conditional Rendering"}),`
`,n.jsx(e.p,{children:"Display different content based on screen size:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useSizeClass } from '@swiftuijs/ui'

function ResponsiveContent() {
  const sizeClass = useSizeClass()
  
  return (
    <VStack>
      {sizeClass?.horizontal === 'regular' && (
        <Sidebar />
      )}
      <MainContent />
    </VStack>
  )
}
`})}),`
`,n.jsx(e.h2,{id:"geometryreader",children:"GeometryReader"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"GeometryReader"})," allows you to get container dimension information for creating more precise responsive layouts."]}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { GeometryReader } from '@swiftuijs/ui'

<GeometryReader>
  {(geometry) => (
    <VStack>
      <Text>Width: {geometry.width}px</Text>
      <Text>Height: {geometry.height}px</Text>
    </VStack>
  )}
</GeometryReader>
`})}),`
`,n.jsx(e.h3,{id:"size-based-layout",children:"Size-Based Layout"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { GeometryReader } from '@swiftuijs/ui'

<GeometryReader>
  {(geometry) => {
    const isWide = geometry.width > 600
    
    return isWide ? (
      <HStack>
        <Sidebar />
        <MainContent />
      </HStack>
    ) : (
      <VStack>
        <MainContent />
        <Sidebar />
      </VStack>
    )
  }}
</GeometryReader>
`})}),`
`,n.jsx(e.h2,{id:"responsive-components",children:"Responsive Components"}),`
`,n.jsx(e.h3,{id:"responsive-grid",children:"Responsive Grid"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"LazyVGrid"})," and ",n.jsx(e.code,{children:"LazyHGrid"})," support responsive column counts:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { LazyVGrid, useSizeClass } from '@swiftuijs/ui'

function ResponsiveGrid() {
  const sizeClass = useSizeClass()
  const columns = sizeClass?.horizontal === 'compact' ? 2 : 4
  
  return (
    <LazyVGrid columns={columns} spacing={16}>
      {items.map(item => <Item key={item.id} {...item} />)}
    </LazyVGrid>
  )
}
`})}),`
`,n.jsx(e.h3,{id:"responsive-navigation",children:"Responsive Navigation"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.code,{children:"NavigationStack"})," can adjust navigation style based on screen size:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { NavigationStack, useSizeClass } from '@swiftuijs/ui'

function App() {
  const sizeClass = useSizeClass()
  const navigationStyle = sizeClass?.horizontal === 'compact' 
    ? 'stack' 
    : 'split'
  
  return (
    <NavigationStack 
      root={HomePage} 
      style={navigationStyle}
    />
  )
}
`})}),`
`,n.jsx(e.h2,{id:"media-queries",children:"Media Queries"}),`
`,n.jsx(e.p,{children:"In addition to SizeClass, you can also use CSS media queries:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.responsive-component {
  padding: 12px;
}

@media (min-width: 768px) {
  .responsive-component {
    padding: 24px;
  }
}

@media (min-width: 1024px) {
  .responsive-component {
    padding: 32px;
  }
}
`})}),`
`,n.jsx(e.h2,{id:"responsive-best-practices",children:"Responsive Best Practices"}),`
`,n.jsx(e.h3,{id:"1-mobile-first",children:"1. Mobile First"}),`
`,n.jsx(e.p,{children:"Start designing from mobile, then progressively enhance:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`function ResponsiveComponent() {
  const sizeClass = useSizeClass()
  
  // Mobile base layout
  let layout = <VStack>...</VStack>
  
  // Tablet and desktop enhancements
  if (sizeClass?.horizontal === 'regular') {
    layout = <HStack>...</HStack>
  }
  
  return layout
}
`})}),`
`,n.jsx(e.h3,{id:"2-use-breakpoints",children:"2. Use Breakpoints"}),`
`,n.jsx(e.p,{children:"Define clear breakpoints:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024
}

function useBreakpoint() {
  const sizeClass = useSizeClass()
  const width = sizeClass?.width || 0
  
  return {
    isMobile: width < breakpoints.tablet,
    isTablet: width >= breakpoints.tablet && width < breakpoints.desktop,
    isDesktop: width >= breakpoints.desktop
  }
}
`})}),`
`,n.jsx(e.h3,{id:"3-test-different-sizes",children:"3. Test Different Sizes"}),`
`,n.jsx(e.p,{children:"Make sure to test your application at different screen sizes:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Mobile: 375px × 667px"}),`
`,n.jsx(e.li,{children:"Tablet: 768px × 1024px"}),`
`,n.jsx(e.li,{children:"Desktop: 1024px × 768px"}),`
`,n.jsx(e.li,{children:"Large Screen: 1920px × 1080px"}),`
`]}),`
`,n.jsx(e.h2,{id:"next-steps",children:"Next Steps"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["📐 Check out the ",n.jsx(e.a,{href:"/docs/Layout",children:"Layout System"})," to learn more layout options"]}),`
`,n.jsxs(e.li,{children:["🎨 Learn about ",n.jsx(e.a,{href:"/docs/Theming",children:"Theming"})," to customize styles"]}),`
`,n.jsxs(e.li,{children:["🧩 Browse ",n.jsx(e.a,{href:"/docs/Components",children:"Component Documentation"})," to learn more about components"]}),`
`]})]})}function l(s={}){const{wrapper:e}={...t(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{l as default};
