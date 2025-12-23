import{u as s,j as e,M as r}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Introduction",order:1}),`
`,e.jsx(n.h1,{id:"swiftuijs---swiftui-in-javascript",children:"SwiftUI.js - SwiftUI in JavaScript"}),`
`,e.jsxs(n.p,{children:["Welcome to ",e.jsx(n.strong,{children:"SwiftUI.js"}),", a component library that brings SwiftUI's design philosophy and API to the JavaScript/React ecosystem."]}),`
`,e.jsx(n.h2,{id:"what-is-swiftuijs",children:"What is SwiftUI.js?"}),`
`,e.jsx(n.p,{children:"SwiftUI.js is a React component library that aims to bring SwiftUI's declarative UI programming experience to web development. It provides APIs and components similar to SwiftUI, allowing developers familiar with SwiftUI to get started quickly, while also providing web developers with an elegant and modern UI component set."}),`
`,e.jsx(n.h2,{id:"core-features",children:"Core Features"}),`
`,e.jsx(n.h3,{id:"-declarative-ui",children:"🎨 Declarative UI"}),`
`,e.jsx(n.p,{children:"Build user interfaces using declarative syntax for cleaner, more maintainable code:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { VStack, Text, Button } from '@swiftuijs/ui'

function App() {
  return (
    <VStack spacing={16}>
      <Text>Hello, SwiftUI.js!</Text>
      <Button onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </VStack>
  )
}
`})}),`
`,e.jsx(n.h3,{id:"-ios-style-design",children:"📱 iOS-Style Design"}),`
`,e.jsx(n.p,{children:"Components follow iOS Human Interface Guidelines, providing a native iOS visual experience."}),`
`,e.jsx(n.h3,{id:"-responsive-layout",children:"🔄 Responsive Layout"}),`
`,e.jsx(n.p,{children:"Supports adaptive layouts with components that automatically adjust based on screen size, similar to SwiftUI's SizeClass system."}),`
`,e.jsx(n.h3,{id:"-rich-components",children:"🧩 Rich Components"}),`
`,e.jsx(n.p,{children:"Provides 50+ components covering layout, input, navigation, display, and more."}),`
`,e.jsx(n.h3,{id:"-complete-documentation",children:"📚 Complete Documentation"}),`
`,e.jsx(n.p,{children:"Each component has detailed documentation and examples to help you get started quickly."}),`
`,e.jsx(n.h2,{id:"swiftui-correspondence",children:"SwiftUI Correspondence"}),`
`,e.jsx(n.p,{children:"SwiftUI.js component design stays as consistent as possible with SwiftUI:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"SwiftUI"}),e.jsx(n.th,{children:"SwiftUI.js"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"HStack"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"HStack"})}),e.jsx(n.td,{children:"Horizontal stacking layout"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"VStack"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"VStack"})}),e.jsx(n.td,{children:"Vertical stacking layout"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ZStack"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"ZStack"})}),e.jsx(n.td,{children:"Overlay layout"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Text"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Text"})}),e.jsx(n.td,{children:"Text display"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Button"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Button"})}),e.jsx(n.td,{children:"Button control"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"List"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"List"})}),e.jsx(n.td,{children:"List view"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"NavigationStack"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"NavigationStack"})}),e.jsx(n.td,{children:"Navigation stack"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"TextField"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"TextField"})}),e.jsx(n.td,{children:"Text input field"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"..."}),e.jsx(n.td,{children:"..."}),e.jsx(n.td,{children:"..."})]})]})]}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"/docs/ComponentIndex",children:"Component Index"})," for more component correspondences."]}),`
`,e.jsx(n.h2,{id:"quick-start",children:"Quick Start"}),`
`,e.jsx(n.h3,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"Install using npm, yarn, or pnpm:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# npm
npm install @swiftuijs/ui

# yarn
yarn add @swiftuijs/ui

# pnpm
pnpm add @swiftuijs/ui
`})}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { VStack, HStack, Text, Button } from '@swiftuijs/ui'
import '@swiftuijs/ui/dist/ui.css'

function MyApp() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Welcome to SwiftUI.js
      </Text>
      <HStack spacing={10}>
        <Button onClick={() => console.log('Primary')}>
          Primary
        </Button>
        <Button onClick={() => console.log('Secondary')}>
          Secondary
        </Button>
      </HStack>
    </VStack>
  )
}
`})}),`
`,e.jsx(n.h2,{id:"design-philosophy",children:"Design Philosophy"}),`
`,e.jsx(n.h3,{id:"1-declarative-programming",children:"1. Declarative Programming"}),`
`,e.jsx(n.p,{children:"Use declarative syntax to describe UI instead of imperatively manipulating the DOM."}),`
`,e.jsx(n.h3,{id:"2-componentization",children:"2. Componentization"}),`
`,e.jsx(n.p,{children:"Each component is independent and reusable, following the Single Responsibility Principle."}),`
`,e.jsx(n.h3,{id:"3-type-safety",children:"3. Type Safety"}),`
`,e.jsx(n.p,{children:"Full TypeScript support provides complete type definitions, reducing runtime errors."}),`
`,e.jsx(n.h3,{id:"4-performance-optimization",children:"4. Performance Optimization"}),`
`,e.jsx(n.p,{children:"Uses React best practices, including memo, lazy loading, and other optimization techniques."}),`
`,e.jsx(n.h2,{id:"browser-support",children:"Browser Support"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Chrome (latest)"}),`
`,e.jsx(n.li,{children:"Firefox (latest)"}),`
`,e.jsx(n.li,{children:"Safari (latest)"}),`
`,e.jsx(n.li,{children:"Edge (latest)"}),`
`]}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next Steps"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["📖 Check out the ",e.jsx(n.a,{href:"/docs/GettingStarted",children:"Getting Started Guide"})," to learn how to install and configure"]}),`
`,e.jsxs(n.li,{children:["🧩 Browse the ",e.jsx(n.a,{href:"/docs/Components",children:"Component Overview"})," to see all available components"]}),`
`,e.jsxs(n.li,{children:["📐 Learn about the ",e.jsx(n.a,{href:"/docs/Layout",children:"Layout System"})," to understand how to build responsive layouts"]}),`
`,e.jsxs(n.li,{children:["🎨 Read about ",e.jsx(n.a,{href:"/docs/Theming",children:"Theming"})," to learn how to customize styles"]}),`
`]}),`
`,e.jsx(n.h2,{id:"contributing",children:"Contributing"}),`
`,e.jsx(n.p,{children:"SwiftUI.js is an open-source project. Contributions, bug reports, and suggestions are welcome."}),`
`,e.jsxs(n.p,{children:["GitHub: ",e.jsx(n.a,{href:"https://github.com/swiftuijs/ui",rel:"nofollow",children:"https://github.com/swiftuijs/ui"})]}),`
`,e.jsx(n.h2,{id:"license",children:"License"}),`
`,e.jsx(n.p,{children:"MIT License"})]})}function o(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{o as default};
