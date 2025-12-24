import{j as n,u as l,M as g,C as d}from"../vite-inject-mocker-entry.js";import{o as t,n as r}from"./index-C61XJ-V4.js";import"./index-B2-CykP2.js";import{V as a}from"./index-BwVA9Lg1.js";import{T as i}from"./index-BNcsCq3F.js";import"./index-GXmEOI2s.js";import"./index-Dkw53l-w.js";import"./index-PzCN6IGT.js";import"./index-DRis_PEZ.js";import"./index-BQEAoBJP.js";import"./index-r315-9Uf.js";import"./index-CBtPlaS4.js";import"./index-DOFVCCFv.js";import"./index-D3P69exw.js";import"./index-DxhNWcw4.js";const u={title:"SwiftUI/NavigationLink",component:t,tags:["autodocs"],parameters:{docs:{page:p,description:{component:"A view that controls a navigation presentation."}}}};function o(){return n.jsxs(a,{spacing:20,children:[n.jsx(i,{style:{fontSize:"24px",fontWeight:"bold"},children:"Detail Page"}),n.jsx(i,{children:"This is a detail page navigated from NavigationLink"}),n.jsx(t,{dismiss:!0,children:"Go Back"})]})}const h={render:()=>n.jsx(r,{children:n.jsx(a,{spacing:20,children:n.jsx(t,{destination:o,children:n.jsx(i,{children:"Go to Detail"})})})})},m={render:()=>n.jsx(r,{children:n.jsx(a,{spacing:20,children:n.jsx(t,{destination:o,children:n.jsx(i,{children:"Navigate to Detail Page"})})})})},v={render:()=>n.jsx(r,{children:n.jsx(a,{spacing:20,children:n.jsx(t,{destination:o,children:n.jsx(i,{children:"Go to Detail"})})})})},x={render:()=>{function s(){return n.jsxs(a,{spacing:20,children:[n.jsx(i,{style:{fontSize:"20px",fontWeight:"bold"},children:"Action Sheet"}),n.jsx(i,{children:"This is an action sheet"}),n.jsx(t,{dismiss:!0,children:"Dismiss"})]})}return n.jsx(r,{children:n.jsx(a,{spacing:20,children:n.jsx(t,{destination:s,pageOptions:{type:"actionsheet"},children:n.jsx(i,{children:"Show Action Sheet"})})})})}},f={render:()=>{function s(){return n.jsxs(a,{spacing:20,children:[n.jsx(i,{children:"Page 1"}),n.jsx(t,{dismiss:!0,children:"Back"})]})}function e(){return n.jsxs(a,{spacing:20,children:[n.jsx(i,{children:"Page 2"}),n.jsx(t,{dismiss:!0,children:"Back"})]})}return n.jsx(r,{children:n.jsxs(a,{spacing:15,children:[n.jsx(t,{destination:s,children:n.jsx(i,{children:"Go to Page 1"})}),n.jsx(t,{destination:e,children:n.jsx(i,{children:"Go to Page 2"})})]})})}},j={args:{destination:"https://example.com",children:"External Link"}},A=Object.freeze(Object.defineProperty({__proto__:null,ActionSheet:x,Default:h,Dismiss:v,ExternalURL:j,MultipleLinks:f,WithText:m,default:u},Symbol.toStringTag,{value:"Module"}));function c(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(g,{title:"SwiftUI/NavigationLink/Readme"}),`
`,n.jsx(e.h1,{id:"navigationlink",children:"NavigationLink"}),`
`,n.jsx(e.h2,{id:"overview",children:"Overview"}),`
`,n.jsx(e.p,{children:"NavigationLink is a component that triggers navigation to a destination within a NavigationStack. It can navigate to another component or an external URL, and supports customizable transition animations."}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",n.jsx(e.code,{children:"NavigationLink"}),"."]}),`
`,n.jsx(e.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.h3,{id:"navigate-to-a-component",children:"Navigate to a Component"}),`
`,n.jsx(d,{of:h}),`
`,n.jsx(e.h3,{id:"navigate-to-external-url",children:"Navigate to External URL"}),`
`,n.jsx(d,{of:j}),`
`,n.jsx(e.h2,{id:"page-types",children:"Page Types"}),`
`,n.jsx(e.h3,{id:"standard-page",children:"Standard Page"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink 
  destination={DetailPage}
  pageOptions={{ type: 'page' }}
>
  <Text>Go to Detail</Text>
</NavigationLink>
`})}),`
`,n.jsx(e.h3,{id:"action-sheet",children:"Action Sheet"}),`
`,n.jsx(d,{of:x}),`
`,n.jsx(e.h2,{id:"transition-animations",children:"Transition Animations"}),`
`,n.jsxs(e.p,{children:["NavigationLink supports customizable transition animations through the ",n.jsx(e.code,{children:"transition"})," option in ",n.jsx(e.code,{children:"pageOptions"}),"."]}),`
`,n.jsx(e.h3,{id:"default-slide-animation",children:"Default Slide Animation"}),`
`,n.jsx(e.p,{children:"By default, pages use a slide animation:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink destination={DetailPage} pageOptions={{ type: 'page' }}>
  <Button>Go to Detail</Button>
</NavigationLink>
`})}),`
`,n.jsx(e.h3,{id:"view-transitions-with-shared-elements",children:"View Transitions with Shared Elements"}),`
`,n.jsxs(e.p,{children:["Use View Transitions API for smooth shared element animations. This requires setting the same ",n.jsx(e.code,{children:"viewTransitionName"})," on both source and target elements:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Source element (in list)
<NavigationLink 
  destination={ProductDetail}
  pageOptions={{
    type: 'page',
    transition: {
      type: 'view-transition',
      viewTransitionName: 'product-image'
    }
  }}
>
  <div style={{ viewTransitionName: 'product-image' }}>
    <Image src={product.thumbnail} />
    <Text>{product.name}</Text>
  </div>
</NavigationLink>

// Target element (in ProductDetail page)
function ProductDetail({ product }) {
  return (
    <StandardPage 
      id="product-detail"
      navigationTitle={product.name}
      transition={{
        type: 'view-transition',
        viewTransitionName: 'product-image'
      }}
    >
      <Image 
        src={product.fullImage}
        style={{ viewTransitionName: 'product-image' }}
      />
      <Text>{product.description}</Text>
    </StandardPage>
  )
}
`})}),`
`,n.jsx(e.h3,{id:"fade-transition",children:"Fade Transition"}),`
`,n.jsx(e.p,{children:"Use fade animation for modal-like presentations:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink 
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
`})}),`
`,n.jsx(e.h3,{id:"scale-transition",children:"Scale Transition"}),`
`,n.jsx(e.p,{children:"Use scale animation for popover-like presentations:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink 
  destination={PopoverPage}
  pageOptions={{
    type: 'actionsheet',
    transition: {
      type: 'scale',
      duration: 250
    }
  }}
>
  <Button>Show Popover</Button>
</NavigationLink>
`})}),`
`,n.jsx(e.h3,{id:"custom-duration-and-easing",children:"Custom Duration and Easing"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink 
  destination={DetailPage}
  pageOptions={{
    type: 'page',
    transition: {
      type: 'slide',
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }}
>
  <Button>Go to Detail</Button>
</NavigationLink>
`})}),`
`,n.jsx(e.h3,{id:"no-animation",children:"No Animation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink 
  destination={DetailPage}
  pageOptions={{
    type: 'page',
    transition: {
      type: 'none'
    }
  }}
>
  <Button>Instant Navigation</Button>
</NavigationLink>
`})}),`
`,n.jsx(e.h2,{id:"dismissing-pages",children:"Dismissing Pages"}),`
`,n.jsxs(e.p,{children:["Use the ",n.jsx(e.code,{children:"dismiss"})," prop to navigate back:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<NavigationLink dismiss>
  <Button>Go Back</Button>
</NavigationLink>
`})}),`
`,n.jsx(e.p,{children:"Or use it programmatically:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useNaviContext } from '@swiftuijs/ui'

function MyPage() {
  const navi = useNaviContext()
  
  return (
    <StandardPage id="my-page">
      <Button onClick={() => navi.dismiss()}>Go Back</Button>
    </StandardPage>
  )
}
`})}),`
`,n.jsx(e.h2,{id:"props-reference",children:"Props Reference"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"Prop"}),n.jsx(e.th,{children:"Type"}),n.jsx(e.th,{children:"Required"}),n.jsx(e.th,{children:"Default"}),n.jsx(e.th,{children:"Description"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"destination"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string | ComponentType"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Destination component or URL to navigate to"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"pageOptions"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"object"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Options for page presentation"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"pageOptions.type"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'page' | 'actionsheet'"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'page'"})}),n.jsx(e.td,{children:"Type of page presentation"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"pageOptions.transition"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"ITransitionConfig"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:n.jsx(e.code,{children:"{ type: 'slide' }"})}),n.jsx(e.td,{children:"Transition configuration"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"dismiss"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"boolean"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:n.jsx(e.code,{children:"false"})}),n.jsx(e.td,{children:"If true, navigates back instead of forward"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"style"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"CSSProperties"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Custom CSS styles"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"className"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Custom CSS class name"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"children"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"ReactNode"})}),n.jsx(e.td,{children:"❌"}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"Content to display (usually a Button or Text)"})]})]})]}),`
`,n.jsx(e.h3,{id:"transitionconfig",children:"TransitionConfig"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"Property"}),n.jsx(e.th,{children:"Type"}),n.jsx(e.th,{children:"Default"}),n.jsx(e.th,{children:"Description"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"type"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'slide' | 'fade' | 'scale' | 'view-transition' | 'none'"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'slide'"})}),n.jsx(e.td,{children:"Transition animation type"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"direction"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'forwards' | 'backwards' | 'auto'"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'auto'"})}),n.jsx(e.td,{children:"Transition direction (for slide type)"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"viewTransitionName"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string"})}),n.jsx(e.td,{children:"-"}),n.jsx(e.td,{children:"View transition name for shared element animations"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"duration"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"number"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"300"})}),n.jsx(e.td,{children:"Animation duration in milliseconds"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:"easing"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"string"})}),n.jsx(e.td,{children:n.jsx(e.code,{children:"'cubic-bezier(0.075, 0.82, 0.165, 1)'"})}),n.jsx(e.td,{children:"CSS easing function"})]})]})]}),`
`,n.jsx(e.h2,{id:"common-patterns",children:"Common Patterns"}),`
`,n.jsx(e.h3,{id:"master-detail-navigation",children:"Master-Detail Navigation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Master (List)
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
`})}),`
`,n.jsx(e.h3,{id:"shared-element-animation",children:"Shared Element Animation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// List item with shared element
<NavigationLink 
  destination={ProductDetail}
  pageOptions={{
    type: 'page',
    transition: {
      type: 'view-transition',
      viewTransitionName: \`product-\${product.id}\`
    }
  }}
>
  <Card style={{ viewTransitionName: \`product-\${product.id}\` }}>
    <Image src={product.thumbnail} />
    <Text>{product.name}</Text>
  </Card>
</NavigationLink>

// Detail page with matching shared element
<StandardPage 
  id="product-detail"
  transition={{
    type: 'view-transition',
    viewTransitionName: \`product-\${product.id}\`
  }}
>
  <Card style={{ viewTransitionName: \`product-\${product.id}\` }}>
    <Image src={product.fullImage} />
    <Text>{product.description}</Text>
  </Card>
</StandardPage>
`})}),`
`,n.jsx(e.h3,{id:"conditional-navigation",children:"Conditional Navigation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`function ProductList({ products }) {
  const handleProductClick = (product) => {
    if (product.available) {
      // Navigate to detail
    } else {
      // Show unavailable message
    }
  }
  
  return (
    <List>
      {products.map(product => (
        <NavigationLink
          key={product.id}
          destination={() => <ProductDetail product={product} />}
          pageOptions={{ type: 'page' }}
        >
          <ProductRow 
            product={product}
            onClick={handleProductClick}
          />
        </NavigationLink>
      ))}
    </List>
  )
}
`})}),`
`,n.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use appropriate page types"}),": Use ",n.jsx(e.code,{children:"'page'"})," for standard navigation, ",n.jsx(e.code,{children:"'actionsheet'"})," for modal-like presentations"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Choose the right transition"}),": Use ",n.jsx(e.code,{children:"'view-transition'"})," for shared elements, ",n.jsx(e.code,{children:"'fade'"})," for modals, ",n.jsx(e.code,{children:"'slide'"})," for standard navigation"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Set viewTransitionName consistently"}),": When using View Transitions, ensure source and target elements use the same name"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Keep transitions smooth"}),": Use appropriate durations (200-400ms) and easing functions"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Provide clear destinations"}),": Always specify a valid ",n.jsx(e.code,{children:"destination"})," prop"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Use dismiss for back navigation"}),": Use ",n.jsx(e.code,{children:"dismiss"})," prop or ",n.jsx(e.code,{children:"navi.dismiss()"})," for going back"]}),`
`]}),`
`,n.jsx(e.h2,{id:"view-transitions-api-notes",children:"View Transitions API Notes"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"View Transitions API requires browser support (Chrome 111+, Edge 111+)"}),`
`,n.jsx(e.li,{children:"Falls back to CSS animations if not supported"}),`
`,n.jsxs(e.li,{children:["Shared element animations require matching ",n.jsx(e.code,{children:"viewTransitionName"})," on both source and target"]}),`
`,n.jsx(e.li,{children:"Works best with images, cards, and other visual elements"}),`
`,n.jsx(e.li,{children:"Can be combined with other transition types for different elements"}),`
`]}),`
`,n.jsx(e.h2,{id:"related-components",children:"Related Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-navigation-stack",children:"NavigationStack"})," - Container for navigation"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-standard-page",children:"StandardPage"})," - Default page container"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"/docs/components-button",children:"Button"})," - Often used as NavigationLink children"]}),`
`]})]})}function p(s={}){const{wrapper:e}={...l(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(c,{...s})}):c(s)}const M=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));export{M as R,A as s};
