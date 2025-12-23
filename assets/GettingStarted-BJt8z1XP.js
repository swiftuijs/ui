import{u as i,j as n,M as a}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function t(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"Getting Started",order:2}),`
`,n.jsx(e.h1,{id:"getting-started",children:"Getting Started"}),`
`,n.jsx(e.p,{children:"This guide will help you get started with SwiftUI.js quickly."}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.h3,{id:"using-npm",children:"Using npm"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @swiftuijs/ui
`})}),`
`,n.jsx(e.h3,{id:"using-yarn",children:"Using yarn"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`yarn add @swiftuijs/ui
`})}),`
`,n.jsx(e.h3,{id:"using-pnpm",children:"Using pnpm"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`pnpm add @swiftuijs/ui
`})}),`
`,n.jsx(e.h2,{id:"basic-setup",children:"Basic Setup"}),`
`,n.jsx(e.h3,{id:"1-import-styles",children:"1. Import Styles"}),`
`,n.jsx(e.p,{children:"Before using components, you need to import the component styles:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import '@swiftuijs/ui/dist/ui.css'
`})}),`
`,n.jsx(e.h3,{id:"2-import-components",children:"2. Import Components"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { VStack, HStack, Text, Button } from '@swiftuijs/ui'
`})}),`
`,n.jsx(e.h2,{id:"first-example",children:"First Example"}),`
`,n.jsx(e.p,{children:"Create a simple application:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { VStack, Text, Button } from '@swiftuijs/ui'
import '@swiftuijs/ui/dist/ui.css'

function App() {
  return (
    <VStack spacing={20}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Hello, SwiftUI.js!
      </Text>
      <Button onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </VStack>
  )
}

export default App
`})}),`
`,n.jsx(e.h2,{id:"project-integration",children:"Project Integration"}),`
`,n.jsx(e.h3,{id:"react-projects",children:"React Projects"}),`
`,n.jsx(e.p,{children:"SwiftUI.js is a React component library that can be used in any React project."}),`
`,n.jsx(e.h4,{id:"create-react-app",children:"Create React App"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npx create-react-app my-app
cd my-app
npm install @swiftuijs/ui
`})}),`
`,n.jsx(e.h4,{id:"vite",children:"Vite"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm create vite@latest my-app -- --template react
cd my-app
npm install @swiftuijs/ui
`})}),`
`,n.jsx(e.h4,{id:"nextjs",children:"Next.js"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npx create-next-app@latest my-app
cd my-app
npm install @swiftuijs/ui
`})}),`
`,n.jsx(e.h3,{id:"using-in-nextjs",children:"Using in Next.js"}),`
`,n.jsxs(e.p,{children:["Import styles in ",n.jsx(e.code,{children:"_app.tsx"})," or ",n.jsx(e.code,{children:"_app.js"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import '@swiftuijs/ui/dist/ui.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
`})}),`
`,n.jsx(e.h2,{id:"basic-layout",children:"Basic Layout"}),`
`,n.jsx(e.h3,{id:"using-stack-components",children:"Using Stack Components"}),`
`,n.jsx(e.p,{children:"SwiftUI.js provides three types of stack layouts:"}),`
`,n.jsx(e.h4,{id:"hstack---horizontal-layout",children:"HStack - Horizontal Layout"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { HStack, Text } from '@swiftuijs/ui'

<HStack spacing={10}>
  <Text>Left</Text>
  <Text>Center</Text>
  <Text>Right</Text>
</HStack>
`})}),`
`,n.jsx(e.h4,{id:"vstack---vertical-layout",children:"VStack - Vertical Layout"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { VStack, Text } from '@swiftuijs/ui'

<VStack spacing={10}>
  <Text>Top</Text>
  <Text>Middle</Text>
  <Text>Bottom</Text>
</VStack>
`})}),`
`,n.jsx(e.h4,{id:"zstack---overlay-layout",children:"ZStack - Overlay Layout"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { ZStack, Text, Image } from '@swiftuijs/ui'

<ZStack>
  <Image src="/background.jpg" alt="Background" />
  <Text style={{ color: 'white' }}>Overlay Text</Text>
</ZStack>
`})}),`
`,n.jsx(e.h2,{id:"common-components",children:"Common Components"}),`
`,n.jsx(e.h3,{id:"text",children:"Text"}),`
`,n.jsx(e.p,{children:"Display text content:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Text } from '@swiftuijs/ui'

<Text>Hello World</Text>
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Bold Text</Text>
`})}),`
`,n.jsx(e.h3,{id:"button",children:"Button"}),`
`,n.jsx(e.p,{children:"Create buttons:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button } from '@swiftuijs/ui'

<Button onClick={() => console.log('Clicked')}>
  Click Me
</Button>
`})}),`
`,n.jsx(e.h3,{id:"image",children:"Image"}),`
`,n.jsx(e.p,{children:"Display images:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Image } from '@swiftuijs/ui'

<Image src="/image.jpg" alt="Description" />
`})}),`
`,n.jsx(e.h3,{id:"textfield",children:"TextField"}),`
`,n.jsx(e.p,{children:"Text input field:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { TextField } from '@swiftuijs/ui'
import { useState } from 'react'

function MyForm() {
  const [value, setValue] = useState('')
  
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
    />
  )
}
`})}),`
`,n.jsx(e.h2,{id:"navigation",children:"Navigation"}),`
`,n.jsx(e.h3,{id:"navigationstack",children:"NavigationStack"}),`
`,n.jsx(e.p,{children:"Create navigation structure:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { NavigationStack, NavigationLink, Text } from '@swiftuijs/ui'

function HomePage() {
  return (
    <VStack>
      <Text>Home</Text>
      <NavigationLink destination={AboutPage}>
        <Text>Go to About</Text>
      </NavigationLink>
    </VStack>
  )
}

function AboutPage() {
  return <Text>About</Text>
}

function App() {
  return (
    <NavigationStack root={HomePage} />
  )
}
`})}),`
`,n.jsx(e.h2,{id:"style-customization",children:"Style Customization"}),`
`,n.jsx(e.h3,{id:"using-style-prop",children:"Using style Prop"}),`
`,n.jsxs(e.p,{children:["All components support the ",n.jsx(e.code,{children:"style"})," prop:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<Text style={{ color: '#007AFF', fontSize: 18 }}>
  Custom Styled Text
</Text>
`})}),`
`,n.jsx(e.h3,{id:"using-classname",children:"Using className"}),`
`,n.jsxs(e.p,{children:["Components also support the ",n.jsx(e.code,{children:"className"})," prop:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<Button className="my-custom-button">
  Custom Button
</Button>
`})}),`
`,n.jsx(e.h3,{id:"css-variables",children:"CSS Variables"}),`
`,n.jsx(e.p,{children:"SwiftUI.js uses CSS variables to manage themes. You can override these variables:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  --sw-color-blue: #007AFF;
  --sw-spacing-md: 12px;
}
`})}),`
`,n.jsxs(e.p,{children:["For more information about theme customization, see the ",n.jsx(e.a,{href:"/docs/Theming",children:"Theming Guide"}),"."]}),`
`,n.jsx(e.h2,{id:"typescript-support",children:"TypeScript Support"}),`
`,n.jsx(e.p,{children:"SwiftUI.js is fully written in TypeScript, providing complete type definitions:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { VStack, type IVStackProps } from '@swiftuijs/ui'

const props: IVStackProps = {
  spacing: 10,
  alignment: 'center',
  children: <Text>Hello</Text>
}
`})}),`
`,n.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsx(e.h3,{id:"1-component-composition",children:"1. Component Composition"}),`
`,n.jsx(e.p,{children:"Build complex UIs using composition:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<VStack spacing={20}>
  <Header />
  <Content />
  <Footer />
</VStack>
`})}),`
`,n.jsx(e.h3,{id:"2-responsive-design",children:"2. Responsive Design"}),`
`,n.jsx(e.p,{children:"Use responsive layouts to adapt to different screen sizes:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useSizeClass } from '@swiftuijs/ui'

function ResponsiveLayout() {
  const sizeClass = useSizeClass()
  
  return sizeClass.horizontal === 'compact' 
    ? <VStack>...</VStack>
    : <HStack>...</HStack>
}
`})}),`
`,n.jsx(e.h3,{id:"3-performance-optimization",children:"3. Performance Optimization"}),`
`,n.jsx(e.p,{children:"For long lists, use Lazy components:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { LazyVStack } from '@swiftuijs/ui'

<LazyVStack>
  {items.map(item => <Item key={item.id} {...item} />)}
</LazyVStack>
`})}),`
`,n.jsx(e.h2,{id:"next-steps",children:"Next Steps"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["📖 Check out the ",n.jsx(e.a,{href:"/docs/Components",children:"Component Overview"})," to see all available components"]}),`
`,n.jsxs(e.li,{children:["📐 Learn about the ",n.jsx(e.a,{href:"/docs/Layout",children:"Layout System"})," to build complex layouts"]}),`
`,n.jsxs(e.li,{children:["📱 Read about ",n.jsx(e.a,{href:"/docs/Responsive",children:"Responsive Design"})," to create adaptive UIs"]}),`
`,n.jsxs(e.li,{children:["🎨 Learn about ",n.jsx(e.a,{href:"/docs/Theming",children:"Theming"})," to customize styles"]}),`
`]}),`
`,n.jsx(e.h2,{id:"get-help",children:"Get Help"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"📚 View component documentation and examples"}),`
`,n.jsxs(e.li,{children:["🐛 Report issues: ",n.jsx(e.a,{href:"https://github.com/swiftuijs/ui/issues",rel:"nofollow",children:"GitHub Issues"})]}),`
`,n.jsxs(e.li,{children:["💬 Join discussions: ",n.jsx(e.a,{href:"https://github.com/swiftuijs/ui/discussions",rel:"nofollow",children:"GitHub Discussions"})]}),`
`]})]})}function r(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(t,{...s})}):t(s)}export{r as default};
