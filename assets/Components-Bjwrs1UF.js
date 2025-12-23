import{u as s,j as n,M as r}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function t(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Components",order:3}),`
`,n.jsx(e.h1,{id:"component-overview",children:"Component Overview"}),`
`,n.jsx(e.p,{children:"SwiftUI.js provides a rich collection of components to help you quickly build modern user interfaces."}),`
`,n.jsx(e.h2,{id:"layout-components",children:"Layout Components"}),`
`,n.jsx(e.h3,{id:"stack-components",children:"Stack Components"}),`
`,n.jsx(e.p,{children:"Used to create flexible layout structures."}),`
`,n.jsx(e.h4,{id:"hstack",children:"HStack"}),`
`,n.jsx(e.p,{children:"Horizontal stacking layout that arranges child components in a row."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { HStack, Text } from '@swiftuijs/ui'

<HStack spacing={10} alignment="center">
  <Text>Left</Text>
  <Text>Center</Text>
  <Text>Right</Text>
</HStack>
`})}),`
`,n.jsx(e.h4,{id:"vstack",children:"VStack"}),`
`,n.jsx(e.p,{children:"Vertical stacking layout that arranges child components in a column."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { VStack, Text } from '@swiftuijs/ui'

<VStack spacing={10} alignment="center">
  <Text>Top</Text>
  <Text>Middle</Text>
  <Text>Bottom</Text>
</VStack>
`})}),`
`,n.jsx(e.h4,{id:"zstack",children:"ZStack"}),`
`,n.jsx(e.p,{children:"Overlay layout that stacks child components on top of each other."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { ZStack, Text, Image } from '@swiftuijs/ui'

<ZStack>
  <Image src="/bg.jpg" alt="Background" />
  <Text style={{ color: 'white' }}>Overlay</Text>
</ZStack>
`})}),`
`,n.jsx(e.h3,{id:"lazy-stack-components",children:"Lazy Stack Components"}),`
`,n.jsx(e.p,{children:"Used for performance optimization, only rendering components in the visible area."}),`
`,n.jsx(e.h4,{id:"lazyvstack",children:"LazyVStack"}),`
`,n.jsx(e.p,{children:"Lazy-loaded vertical stacking layout."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { LazyVStack } from '@swiftuijs/ui'

<LazyVStack>
  {items.map(item => <Item key={item.id} {...item} />)}
</LazyVStack>
`})}),`
`,n.jsx(e.h4,{id:"lazyhstack",children:"LazyHStack"}),`
`,n.jsx(e.p,{children:"Lazy-loaded horizontal stacking layout."}),`
`,n.jsx(e.h3,{id:"grid-components",children:"Grid Components"}),`
`,n.jsx(e.h4,{id:"lazyvgrid",children:"LazyVGrid"}),`
`,n.jsx(e.p,{children:"Vertical grid layout with customizable columns and spacing."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { LazyVGrid } from '@swiftuijs/ui'

<LazyVGrid columns={3} spacing={10}>
  {items.map(item => <Item key={item.id} {...item} />)}
</LazyVGrid>
`})}),`
`,n.jsx(e.h4,{id:"lazyhgrid",children:"LazyHGrid"}),`
`,n.jsx(e.p,{children:"Horizontal grid layout."}),`
`,n.jsx(e.h3,{id:"spacer",children:"Spacer"}),`
`,n.jsx(e.p,{children:"Used to create flexible space in layouts."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { HStack, Spacer, Text } from '@swiftuijs/ui'

<HStack>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</HStack>
`})}),`
`,n.jsx(e.h2,{id:"text-and-images",children:"Text and Images"}),`
`,n.jsx(e.h3,{id:"text",children:"Text"}),`
`,n.jsx(e.p,{children:"Display text content."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Text } from '@swiftuijs/ui'

<Text>Hello World</Text>
<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Bold Text</Text>
`})}),`
`,n.jsx(e.h3,{id:"image",children:"Image"}),`
`,n.jsx(e.p,{children:"Display images."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Image } from '@swiftuijs/ui'

<Image src="/image.jpg" alt="Description" />
<Image src="/image.jpg" alt="Description" style={{ width: 200, height: 200 }} />
`})}),`
`,n.jsx(e.h3,{id:"link",children:"Link"}),`
`,n.jsx(e.p,{children:"Create links."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Link } from '@swiftuijs/ui'

<Link href="https://example.com">Visit Example</Link>
`})}),`
`,n.jsx(e.h2,{id:"input-controls",children:"Input Controls"}),`
`,n.jsx(e.h3,{id:"button",children:"Button"}),`
`,n.jsx(e.p,{children:"Button control."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button } from '@swiftuijs/ui'

<Button onClick={() => console.log('Clicked')}>
  Click Me
</Button>
`})}),`
`,n.jsx(e.h3,{id:"textfield",children:"TextField"}),`
`,n.jsx(e.p,{children:"Single-line text input field."}),`
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
`,n.jsx(e.h3,{id:"securefield",children:"SecureField"}),`
`,n.jsx(e.p,{children:"Secure text input field (for passwords and other sensitive information)."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { SecureField } from '@swiftuijs/ui'

<SecureField
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
/>
`})}),`
`,n.jsx(e.h3,{id:"toggle",children:"Toggle"}),`
`,n.jsx(e.p,{children:"Toggle control."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Toggle } from '@swiftuijs/ui'

<Toggle
  value={isOn}
  onChange={setIsOn}
/>
`})}),`
`,n.jsx(e.h3,{id:"picker",children:"Picker"}),`
`,n.jsx(e.p,{children:"Picker control."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Picker } from '@swiftuijs/ui'

<Picker
  selectedValue={selected}
  onValueChange={setSelected}
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]}
/>
`})}),`
`,n.jsx(e.h3,{id:"stepper",children:"Stepper"}),`
`,n.jsx(e.p,{children:"Stepper control."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Stepper } from '@swiftuijs/ui'

<Stepper
  value={count}
  onValueChange={setCount}
  min={0}
  max={10}
/>
`})}),`
`,n.jsx(e.h3,{id:"slider",children:"Slider"}),`
`,n.jsx(e.p,{children:"Slider control."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Slider } from '@swiftuijs/ui'

<Slider
  value={value}
  onValueChange={setValue}
  min={0}
  max={100}
/>
`})}),`
`,n.jsx(e.h3,{id:"datepicker",children:"DatePicker"}),`
`,n.jsx(e.p,{children:"Date picker."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { DatePicker } from '@swiftuijs/ui'

<DatePicker
  value={date}
  onChange={setDate}
/>
`})}),`
`,n.jsx(e.h2,{id:"lists-and-scrolling",children:"Lists and Scrolling"}),`
`,n.jsx(e.h3,{id:"list",children:"List"}),`
`,n.jsx(e.p,{children:"List view."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { List, Section, Text } from '@swiftuijs/ui'

<List>
  <Section header={<Text>Section 1</Text>}>
    <Text>Item 1</Text>
    <Text>Item 2</Text>
  </Section>
</List>
`})}),`
`,n.jsx(e.h3,{id:"scrollview",children:"ScrollView"}),`
`,n.jsx(e.p,{children:"Scrollable view."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { ScrollView, VStack, Text } from '@swiftuijs/ui'

<ScrollView>
  <VStack>
    {items.map(item => <Text key={item.id}>{item.text}</Text>)}
  </VStack>
</ScrollView>
`})}),`
`,n.jsx(e.h3,{id:"section",children:"Section"}),`
`,n.jsx(e.p,{children:"List grouping."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { List, Section, Text } from '@swiftuijs/ui'

<List>
  <Section header={<Text>Header</Text>} footer={<Text>Footer</Text>}>
    <Text>Item</Text>
  </Section>
</List>
`})}),`
`,n.jsx(e.h2,{id:"navigation",children:"Navigation"}),`
`,n.jsx(e.h3,{id:"navigationstack",children:"NavigationStack"}),`
`,n.jsx(e.p,{children:"Navigation stack container."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { NavigationStack, NavigationLink, Text } from '@swiftuijs/ui'

function HomePage() {
  return (
    <VStack>
      <Text>Home</Text>
      <NavigationLink destination={AboutPage}>
        <Text>About</Text>
      </NavigationLink>
    </VStack>
  )
}

function App() {
  return <NavigationStack root={HomePage} />
}
`})}),`
`,n.jsx(e.h3,{id:"navigationlink",children:"NavigationLink"}),`
`,n.jsx(e.p,{children:"Navigation link."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { NavigationLink } from '@swiftuijs/ui'

<NavigationLink destination={TargetPage}>
  <Text>Navigate</Text>
</NavigationLink>
`})}),`
`,n.jsx(e.h2,{id:"display-components",children:"Display Components"}),`
`,n.jsx(e.h3,{id:"card",children:"Card"}),`
`,n.jsx(e.p,{children:"Card component."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Card, VStack, Text } from '@swiftuijs/ui'

<Card>
  <VStack>
    <Text>Card Title</Text>
    <Text>Card Content</Text>
  </VStack>
</Card>
`})}),`
`,n.jsx(e.h3,{id:"alert",children:"Alert"}),`
`,n.jsx(e.p,{children:"Alert dialog."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Alert } from '@swiftuijs/ui'

<Alert
  isPresented={showAlert}
  title="Alert"
  message="This is an alert"
  buttons={[
    { label: 'OK', action: () => setShowAlert(false) }
  ]}
/>
`})}),`
`,n.jsx(e.h3,{id:"progressview",children:"ProgressView"}),`
`,n.jsx(e.p,{children:"Progress view."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { ProgressView } from '@swiftuijs/ui'

<ProgressView progress={0.5} />
`})}),`
`,n.jsx(e.h3,{id:"activityindicator",children:"ActivityIndicator"}),`
`,n.jsx(e.p,{children:"Activity indicator (loading animation)."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { ActivityIndicator } from '@swiftuijs/ui'

<ActivityIndicator />
`})}),`
`,n.jsx(e.h2,{id:"other-components",children:"Other Components"}),`
`,n.jsx(e.h3,{id:"divider",children:"Divider"}),`
`,n.jsx(e.p,{children:"Divider line."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Divider } from '@swiftuijs/ui'

<VStack>
  <Text>Item 1</Text>
  <Divider />
  <Text>Item 2</Text>
</VStack>
`})}),`
`,n.jsx(e.h3,{id:"group",children:"Group"}),`
`,n.jsx(e.p,{children:"Logical grouping container (does not affect layout)."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Group, VStack } from '@swiftuijs/ui'

<Group>
  <VStack>
    <Text>Grouped Content</Text>
  </VStack>
</Group>
`})}),`
`,n.jsx(e.h3,{id:"groupbox",children:"GroupBox"}),`
`,n.jsx(e.p,{children:"Grouping container with border."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { GroupBox, VStack, Text } from '@swiftuijs/ui'

<GroupBox label="Settings">
  <VStack>
    <Text>Setting 1</Text>
    <Text>Setting 2</Text>
  </VStack>
</GroupBox>
`})}),`
`,n.jsx(e.h3,{id:"disclosuregroup",children:"DisclosureGroup"}),`
`,n.jsx(e.p,{children:"Expandable/collapsible group."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { DisclosureGroup, Text } from '@swiftuijs/ui'

<DisclosureGroup label="More Info">
  <Text>Hidden content</Text>
</DisclosureGroup>
`})}),`
`,n.jsx(e.h3,{id:"foreach",children:"ForEach"}),`
`,n.jsx(e.p,{children:"Loop rendering component."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { ForEach, Text } from '@swiftuijs/ui'

<ForEach items={items} keyExtractor={(item) => item.id}>
  {(item) => <Text>{item.name}</Text>}
</ForEach>
`})}),`
`,n.jsx(e.h2,{id:"component-categories",children:"Component Categories"}),`
`,n.jsx(e.h3,{id:"layout-containers-12",children:"Layout Containers (12)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"HStack, VStack, ZStack"}),`
`,n.jsx(e.li,{children:"LazyVStack, LazyHStack"}),`
`,n.jsx(e.li,{children:"LazyVGrid, LazyHGrid"}),`
`,n.jsx(e.li,{children:"ScrollView, Spacer"}),`
`,n.jsx(e.li,{children:"Form, TabView, GeometryReader"}),`
`]}),`
`,n.jsx(e.h3,{id:"basic-views-5",children:"Basic Views (5)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Text, Image, Link"}),`
`,n.jsx(e.li,{children:"Label, Color"}),`
`]}),`
`,n.jsx(e.h3,{id:"input-controls-8",children:"Input Controls (8)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Button, TextField, SecureField"}),`
`,n.jsx(e.li,{children:"Toggle, Picker, Stepper"}),`
`,n.jsx(e.li,{children:"Slider, DatePicker"}),`
`]}),`
`,n.jsx(e.h3,{id:"navigation-3",children:"Navigation (3)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"NavigationStack, NavigationLink, Page"}),`
`]}),`
`,n.jsx(e.h3,{id:"lists-and-scrolling-6",children:"Lists and Scrolling (6)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"List, Section, ForEach"}),`
`,n.jsx(e.li,{children:"LazyVStack, LazyHStack, ScrollView"}),`
`]}),`
`,n.jsx(e.h3,{id:"display-components-6",children:"Display Components (6)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Card, Alert, ProgressView"}),`
`,n.jsx(e.li,{children:"ActivityIndicator, Badge, TextEditor"}),`
`]}),`
`,n.jsx(e.h3,{id:"other-5",children:"Other (5)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Divider, Group, GroupBox"}),`
`,n.jsx(e.li,{children:"DisclosureGroup, SafeArea"}),`
`]}),`
`,n.jsx(e.h2,{id:"view-detailed-documentation",children:"View Detailed Documentation"}),`
`,n.jsx(e.p,{children:"Each component has detailed documentation and examples. Please check the component documentation in the left navigation bar."}),`
`,n.jsx(e.h2,{id:"component-status",children:"Component Status"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"✅ Implemented"}),`
`,n.jsx(e.li,{children:"🚧 In Development"}),`
`,n.jsx(e.li,{children:"📋 Planned"}),`
`]}),`
`,n.jsxs(e.p,{children:["See ",n.jsx(e.a,{href:"/docs/ComponentIndex",children:"Component Index"})," for the complete component list and status."]})]})}function c(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(t,{...i})}):t(i)}export{c as default};
