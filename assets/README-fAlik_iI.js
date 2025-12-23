import{u as i,j as n}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function a(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(t.h1,{id:"navigationbar",children:"NavigationBar"}),`
`,n.jsx(t.h2,{id:"overview",children:"Overview"}),`
`,n.jsxs(t.p,{children:["NavigationBar is a component that displays a title, optional back button, and toolbar items. It's automatically used by StandardPage when a ",n.jsx(t.code,{children:"navigationTitle"})," is provided, following iOS Human Interface Guidelines and SwiftUI's navigation bar design patterns."]}),`
`,n.jsxs(t.p,{children:[n.jsx(t.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",n.jsx(t.code,{children:".navigationTitle()"})," and ",n.jsx(t.code,{children:".toolbar()"})," modifiers."]}),`
`,n.jsx(t.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsxs(t.p,{children:["NavigationBar is typically used automatically through StandardPage's ",n.jsx(t.code,{children:"navigationTitle"})," prop:"]}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`import { StandardPage } from '@swiftuijs/ui'

function HomePage() {
  return (
    <StandardPage id="home" navigationTitle="Home">
      <VStack>
        <Text>Welcome to Home</Text>
      </VStack>
    </StandardPage>
  )
}
`})}),`
`,n.jsx(t.h2,{id:"automatic-back-button",children:"Automatic Back Button"}),`
`,n.jsx(t.p,{children:"The back button automatically appears when the page is not the root page:"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`// Root page - no back button
<StandardPage id="home" navigationTitle="Home">
  ...
</StandardPage>

// Detail page - back button appears automatically
<StandardPage id="detail" navigationTitle="Details">
  ...
</StandardPage>
`})}),`
`,n.jsx(t.h2,{id:"with-toolbar-items",children:"With Toolbar Items"}),`
`,n.jsx(t.p,{children:"Add toolbar items on the right side of the navigation bar:"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`<StandardPage 
  id="detail" 
  navigationTitle="Product Details"
  toolbarItems={
    <HStack spacing={8}>
      <Button onClick={handleShare}>Share</Button>
      <Button onClick={handleEdit}>Edit</Button>
    </HStack>
  }
>
  <VStack>
    <Text>Product information...</Text>
  </VStack>
</StandardPage>
`})}),`
`,n.jsx(t.h2,{id:"single-toolbar-button",children:"Single Toolbar Button"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`<StandardPage 
  id="edit" 
  navigationTitle="Edit Profile"
  toolbarItems={<Button onClick={handleSave}>Save</Button>}
>
  <Form>...</Form>
</StandardPage>
`})}),`
`,n.jsx(t.h2,{id:"custom-back-button-behavior",children:"Custom Back Button Behavior"}),`
`,n.jsxs(t.p,{children:["The back button automatically calls ",n.jsx(t.code,{children:"dismiss()"})," from the navigation context. If you need custom behavior, you can access the navigation context:"]}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`import { useNaviContext } from '@swiftuijs/ui'

function CustomPage() {
  const navi = useNaviContext()
  
  const handleCustomBack = () => {
    // Custom logic before going back
    if (hasUnsavedChanges) {
      showConfirmDialog(() => navi.dismiss())
    } else {
      navi.dismiss()
    }
  }
  
  return (
    <StandardPage 
      id="custom" 
      navigationTitle="Custom Page"
      // Note: Back button behavior is handled automatically
      // For custom behavior, you might need to hide the default
      // and add a custom button in toolbarItems
    >
      ...
    </StandardPage>
  )
}
`})}),`
`,n.jsx(t.h2,{id:"integration-with-navigationstack",children:"Integration with NavigationStack"}),`
`,n.jsx(t.p,{children:"NavigationBar works seamlessly with NavigationStack:"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`import { NavigationStack, StandardPage, NavigationLink } from '@swiftuijs/ui'

function App() {
  return (
    <NavigationStack>
      <StandardPage id="home" navigationTitle="Home">
        <List>
          <NavigationLink 
            destination={DetailPage}
            pageOptions={{ type: 'page' }}
          >
            <Text>Go to Detail</Text>
          </NavigationLink>
        </List>
      </StandardPage>
    </NavigationStack>
  )
}

function DetailPage() {
  return (
    <StandardPage id="detail" navigationTitle="Details">
      {/* Back button appears automatically */}
      <Text>Detail content</Text>
    </StandardPage>
  )
}
`})}),`
`,n.jsx(t.h2,{id:"props-reference",children:"Props Reference"}),`
`,n.jsx(t.h3,{id:"standardpage-props-for-navigationbar",children:"StandardPage Props (for NavigationBar)"}),`
`,n.jsxs(t.table,{children:[n.jsx(t.thead,{children:n.jsxs(t.tr,{children:[n.jsx(t.th,{children:"Prop"}),n.jsx(t.th,{children:"Type"}),n.jsx(t.th,{children:"Default"}),n.jsx(t.th,{children:"Description"})]})}),n.jsxs(t.tbody,{children:[n.jsxs(t.tr,{children:[n.jsx(t.td,{children:n.jsx(t.code,{children:"navigationTitle"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"string"})}),n.jsx(t.td,{children:"-"}),n.jsx(t.td,{children:"Title to display in navigation bar. When provided, navigation bar is shown."})]}),n.jsxs(t.tr,{children:[n.jsx(t.td,{children:n.jsx(t.code,{children:"toolbarItems"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"ReactNode"})}),n.jsx(t.td,{children:"-"}),n.jsx(t.td,{children:"Items to display on the right side of navigation bar."})]})]})]}),`
`,n.jsx(t.h3,{id:"navigationbar-props-internal",children:"NavigationBar Props (Internal)"}),`
`,n.jsx(t.p,{children:"NavigationBar is used internally, but you can access it directly if needed:"}),`
`,n.jsxs(t.table,{children:[n.jsx(t.thead,{children:n.jsxs(t.tr,{children:[n.jsx(t.th,{children:"Prop"}),n.jsx(t.th,{children:"Type"}),n.jsx(t.th,{children:"Default"}),n.jsx(t.th,{children:"Description"})]})}),n.jsxs(t.tbody,{children:[n.jsxs(t.tr,{children:[n.jsx(t.td,{children:n.jsx(t.code,{children:"title"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"string"})}),n.jsx(t.td,{children:"-"}),n.jsx(t.td,{children:"Navigation bar title"})]}),n.jsxs(t.tr,{children:[n.jsx(t.td,{children:n.jsx(t.code,{children:"showBackButton"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"boolean"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"false"})}),n.jsx(t.td,{children:"Whether to show back button"})]}),n.jsxs(t.tr,{children:[n.jsx(t.td,{children:n.jsx(t.code,{children:"onBack"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"() => void"})}),n.jsx(t.td,{children:"-"}),n.jsx(t.td,{children:"Callback when back button is clicked"})]}),n.jsxs(t.tr,{children:[n.jsx(t.td,{children:n.jsx(t.code,{children:"toolbarItems"})}),n.jsx(t.td,{children:n.jsx(t.code,{children:"ReactNode"})}),n.jsx(t.td,{children:"-"}),n.jsx(t.td,{children:"Toolbar items to display"})]})]})]}),`
`,n.jsx(t.h2,{id:"common-patterns",children:"Common Patterns"}),`
`,n.jsx(t.h3,{id:"master-detail-pattern",children:"Master-Detail Pattern"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`// Master (List)
<StandardPage id="products" navigationTitle="Products">
  <List>
    {products.map(product => (
      <NavigationLink 
        key={product.id}
        destination={() => <ProductDetail product={product} />}
        pageOptions={{ type: 'page' }}
      >
        <ProductRow product={product} />
      </NavigationLink>
    ))}
  </List>
</StandardPage>

// Detail
function ProductDetail({ product }) {
  return (
    <StandardPage 
      id={\`product-\${product.id}\`}
      navigationTitle={product.name}
      toolbarItems={<Button>Share</Button>}
    >
      <VStack>
        <Image src={product.image} />
        <Text>{product.description}</Text>
      </VStack>
    </StandardPage>
  )
}
`})}),`
`,n.jsx(t.h3,{id:"form-with-save-button",children:"Form with Save Button"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`<StandardPage 
  id="edit" 
  navigationTitle="Edit Profile"
  toolbarItems={
    <Button 
      onClick={handleSave}
      disabled={!isValid}
    >
      Save
    </Button>
  }
>
  <Form onSubmit={handleSubmit}>
    <TextField label="Name" value={name} onChange={setName} />
    <TextField label="Email" value={email} onChange={setEmail} />
  </Form>
</StandardPage>
`})}),`
`,n.jsx(t.h3,{id:"multiple-toolbar-actions",children:"Multiple Toolbar Actions"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`<StandardPage 
  id="article" 
  navigationTitle="Article"
  toolbarItems={
    <HStack spacing={12}>
      <Button onClick={handleBookmark}>
        <Text>🔖</Text>
      </Button>
      <Button onClick={handleShare}>
        <Text>Share</Text>
      </Button>
    </HStack>
  }
>
  <ScrollView>
    <Text>{articleContent}</Text>
  </ScrollView>
</StandardPage>
`})}),`
`,n.jsx(t.h2,{id:"styling",children:"Styling"}),`
`,n.jsx(t.p,{children:"NavigationBar uses CSS variables for theming. You can customize colors:"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-css",children:`:root {
  --sw-color-blue: #007AFF; /* Back button color */
  --sw-color-background-primary: #FFFFFF; /* Navigation bar background */
  --sw-color-separator: #C6C6C8; /* Bottom border */
}
`})}),`
`,n.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsxs(t.ol,{children:[`
`,n.jsxs(t.li,{children:[n.jsx(t.strong,{children:"Keep titles concise"}),": Navigation bar titles should be short and descriptive"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.strong,{children:"Use toolbar for actions"}),": Place action buttons in ",n.jsx(t.code,{children:"toolbarItems"}),", not in page content"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.strong,{children:"Limit toolbar items"}),": Too many toolbar items can clutter the navigation bar"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.strong,{children:"Consistent navigation"}),": Use navigationTitle consistently across related pages"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.strong,{children:"Accessibility"}),": Ensure toolbar buttons have proper labels for screen readers"]}),`
`]}),`
`,n.jsx(t.h2,{id:"related-components",children:"Related Components"}),`
`,n.jsxs(t.ul,{children:[`
`,n.jsxs(t.li,{children:[n.jsx(t.a,{href:"/docs/components-standard-page",children:"StandardPage"})," - Container that uses NavigationBar"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.a,{href:"/docs/components-navigation-stack",children:"NavigationStack"})," - Manages navigation hierarchy"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.a,{href:"/docs/components-navigation-link",children:"NavigationLink"})," - Triggers navigation"]}),`
`,n.jsxs(t.li,{children:[n.jsx(t.a,{href:"/docs/components-button",children:"Button"})," - Used in toolbar items"]}),`
`]})]})}function s(e={}){const{wrapper:t}={...i(),...e.components};return t?n.jsx(t,{...e,children:n.jsx(a,{...e})}):a(e)}export{s as default};
