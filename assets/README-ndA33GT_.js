import{j as n,u as l,M as p,C as d}from"../vite-inject-mocker-entry.js";import{p as i,n as r,o as m,h as u}from"./index-QCktaF1M.js";import"./index-DmxC7mxv.js";import{V as s}from"./index-Bqonpr_V.js";import{T as a}from"./index-5crOUHbG.js";import"./index-D-1PhA13.js";import"./index-Cyk_ttaI.js";import"./index-BZ7zHWp_.js";import"./index-DNH0MN80.js";import"./index-YKBvCYzF.js";import"./index-CQ718JuG.js";import"./index-DkHtmGrX.js";import"./index-BHmATDsu.js";import"./index-CZAo45bw.js";import"./index-Xs_apyap.js";const S={title:"SwiftUI/StandardPage",component:i,tags:["autodocs"],parameters:{docs:{page:j,description:{component:"A standard page container used in NavigationStack with optional navigation bar."}}}},c={render:()=>n.jsx(r,{children:n.jsx(i,{id:"page-1",children:n.jsx(s,{spacing:20,children:n.jsx(a,{children:"Page Content"})})})})},h={render:()=>n.jsx(r,{children:n.jsx(i,{id:"page-1",navigationTitle:"Home",children:n.jsx(s,{spacing:20,children:n.jsx(a,{children:"Page with Navigation Title"})})})})},g={render:()=>n.jsx(r,{children:n.jsx(i,{id:"page-1",navigationTitle:"Edit Profile",toolbarItems:n.jsx(a,{children:"Save"}),children:n.jsx(s,{spacing:20,children:n.jsx(a,{children:"Page with Toolbar Items"})})})})},v={render:()=>{function t(){return n.jsx(i,{id:"detail",navigationTitle:"Details",children:n.jsx(s,{spacing:20,children:n.jsx(a,{children:"Detail Page with Back Button"})})})}return n.jsx(r,{children:n.jsx(i,{id:"home",navigationTitle:"Home",children:n.jsx(s,{spacing:20,children:n.jsx(m,{destination:t,children:n.jsx(a,{children:"Go to Detail"})})})})})}},x={render:()=>n.jsx(r,{children:n.jsx(i,{id:"page-1",navigationTitle:"Scrollable Page",children:n.jsx(u,{children:n.jsx(s,{spacing:20,children:Array.from({length:20},(t,e)=>n.jsxs(a,{children:["Item ",e+1]},e))})})})})},R=Object.freeze(Object.defineProperty({__proto__:null,Default:c,ScrollableContent:x,WithBackButton:v,WithNavigationTitle:h,WithToolbarItems:g,default:S},Symbol.toStringTag,{value:"Module"}));function o(t){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(p,{title:"SwiftUI/StandardPage/Readme"}),`
`,n.jsx(e.h1,{id:"standardpage",children:"StandardPage"}),`
`,n.jsx(e.h2,{id:"overview",children:"Overview"}),`
`,n.jsx(e.p,{children:"StandardPage is the default page container used in NavigationStack. It provides a standard page layout and can optionally display a navigation bar with title and toolbar items."}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's view containers in NavigationStack."]}),`
`,n.jsx(e.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.h3,{id:"simple-page",children:"Simple Page"}),`
`,n.jsx(d,{of:c}),`
`,n.jsx(e.h3,{id:"page-with-navigation-title",children:"Page with Navigation Title"}),`
`,n.jsx(d,{of:h}),`
`,n.jsx(e.h2,{id:"navigation-bar",children:"Navigation Bar"}),`
`,n.jsx(e.h3,{id:"automatic-back-button",children:"Automatic Back Button"}),`
`,n.jsx(e.p,{children:"When a page is not the root page, the back button appears automatically:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// In NavigationStack
<NavigationStack>
  {/* Root page - no back button */}
  <StandardPage id="home" navigationTitle="Home">
    <NavigationLink destination={DetailPage}>
      <Button>Go to Detail</Button>
    </NavigationLink>
  </StandardPage>
</NavigationStack>

// Detail page - back button appears automatically
function DetailPage() {
  return (
    <StandardPage id="detail" navigationTitle="Details">
      <Text>Detail content</Text>
    </StandardPage>
  )
}
`})}),`
`,n.jsx(e.h3,{id:"with-toolbar-items",children:"With Toolbar Items"}),`
`,n.jsx(e.p,{children:"Add action buttons to the navigation bar:"}),`
`,n.jsx(d,{of:g}),`
`,n.jsx(e.h3,{id:"multiple-toolbar-items",children:"Multiple Toolbar Items"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<StandardPage 
  id="article" 
  navigationTitle="Article"
  toolbarItems={
    <HStack spacing={8}>
      <Button onClick={handleBookmark}>🔖</Button>
      <Button onClick={handleShare}>Share</Button>
    </HStack>
  }
>
  <ScrollView>...</ScrollView>
</StandardPage>
`})}),`
`,n.jsx(e.h2,{id:"page-content-layout",children:"Page Content Layout"}),`
`,n.jsx(e.p,{children:"StandardPage uses flexbox layout. Content automatically fills available space:"}),`
`,n.jsx(d,{of:x}),`
`,n.jsx(e.h2,{id:"props-reference",children:"Props Reference"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"Prop"}),n.jsx(e.th,{children:"Type"}),n.jsx(e.th,{children:"Required"}),n.jsx(e.th,{children:"Default"}),n.jsx(e.th,{children:"Description"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"id"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string"})}),n.jsx(e.td,{children:"✅"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Unique identifier for the page"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"navigationTitle"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Title to display in navigation bar. When provided, navigation bar is shown."})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"toolbarItems"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"ReactNode"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Items to display on the right side of navigation bar"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"style"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"CSSProperties"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Custom CSS styles"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"className"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Custom CSS class name"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"children"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"ReactNode"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Page content"})]})]})]}),`
`,n.jsx(e.h2,{id:"common-patterns",children:"Common Patterns"}),`
`,n.jsx(e.h3,{id:"list-page",children:"List Page"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<StandardPage id="products" navigationTitle="Products">
  <List>
    {products.map(product => (
      <Section key={product.id}>
        <ProductRow product={product} />
      </Section>
    ))}
  </List>
</StandardPage>
`})}),`
`,n.jsx(e.h3,{id:"form-page",children:"Form Page"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<StandardPage 
  id="edit" 
  navigationTitle="Edit"
  toolbarItems={<Button onClick={handleSave}>Save</Button>}
>
  <Form onSubmit={handleSubmit}>
    <TextField label="Name" value={name} onChange={setName} />
    <TextField label="Email" value={email} onChange={setEmail} />
  </Form>
</StandardPage>
`})}),`
`,n.jsx(e.h3,{id:"detail-page",children:"Detail Page"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<StandardPage id="detail" navigationTitle="Product Details">
  <ScrollView>
    <VStack spacing={20}>
      <Image src={product.image} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        {product.name}
      </Text>
      <Text>{product.description}</Text>
    </VStack>
  </ScrollView>
</StandardPage>
`})}),`
`,n.jsx(e.h3,{id:"settings-page",children:"Settings Page"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<StandardPage id="settings" navigationTitle="Settings">
  <List>
    <Section header={<Text>Account</Text>}>
      <NavigationLink destination={ProfilePage}>
        <HStack>
          <Text>Profile</Text>
          <Spacer />
          <Text>›</Text>
        </HStack>
      </NavigationLink>
    </Section>
    <Section header={<Text>Preferences</Text>}>
      <Toggle label="Notifications" value={notifications} onChange={setNotifications} />
    </Section>
  </List>
</StandardPage>
`})}),`
`,n.jsx(e.h2,{id:"integration-with-navigationstack",children:"Integration with NavigationStack"}),`
`,n.jsx(e.p,{children:"StandardPage is designed to work within NavigationStack:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationStack>
  <StandardPage id="home" navigationTitle="Home">
    <VStack>
      <NavigationLink 
        destination={DetailPage}
        pageOptions={{ type: 'page' }}
      >
        <Button>Go to Detail</Button>
      </NavigationLink>
    </VStack>
  </StandardPage>
</NavigationStack>
`})}),`
`,n.jsx(e.h2,{id:"styling",children:"Styling"}),`
`,n.jsx(e.h3,{id:"custom-page-styles",children:"Custom Page Styles"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<StandardPage 
  id="custom" 
  navigationTitle="Custom"
  style={{ backgroundColor: '#f5f5f5' }}
>
  <VStack>...</VStack>
</StandardPage>
`})}),`
`,n.jsx(e.h3,{id:"custom-navigation-bar-styles",children:"Custom Navigation Bar Styles"}),`
`,n.jsx(e.p,{children:"Navigation bar styles can be customized via CSS variables:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  --sw-color-background-primary: #FFFFFF;
  --sw-color-separator: #C6C6C8;
}
`})}),`
`,n.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Always provide an id"}),": Each page needs a unique identifier"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use navigationTitle consistently"}),": Keep titles short and descriptive"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Place actions in toolbar"}),": Use ",n.jsx(e.code,{children:"toolbarItems"})," for page-level actions"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use ScrollView for long content"}),": Ensure content is scrollable when needed"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Keep pages focused"}),": Each page should have a single, clear purpose"]}),`
`]}),`
`,n.jsx(e.h2,{id:"related-components",children:"Related Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-navigation-stack",children:"NavigationStack"})," - Container for pages"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-navigation-link",children:"NavigationLink"})," - Navigate between pages"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-navigation-bar",children:"NavigationBar"})," - The navigation bar component"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-scroll-view",children:"ScrollView"})," - For scrollable content"]}),`
`]})]})}function j(t={}){const{wrapper:e}={...l(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(o,{...t})}):o(t)}const _=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"}));export{_ as R,R as s};
