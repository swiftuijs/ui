import{u as r,j as e,M as o,C as n}from"../vite-inject-mocker-entry.js";import{Default as l,LongText as c,WithLineLimit as d,SingleLineLimit as x,CustomStyle as a,MultipleTexts as h,TextInHStack as p}from"./stories-BtL5-jvb.js";import"./vendor-BWbLABlD.js";import"./index-C61XJ-V4.js";import"./index-BwVA9Lg1.js";import"./standardize-umhyi7Fb.js";import"./index-B2-CykP2.js";import"./index-BNcsCq3F.js";import"./index-GXmEOI2s.js";import"./index-Dkw53l-w.js";import"./index-PzCN6IGT.js";import"./index-DRis_PEZ.js";import"./index-BQEAoBJP.js";import"./index-r315-9Uf.js";import"./index-CBtPlaS4.js";import"./index-DOFVCCFv.js";import"./index-D3P69exw.js";import"./index-DxhNWcw4.js";function s(t){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"SwiftUI/Text/Readme"}),`
`,e.jsx(i.h1,{id:"text",children:"Text"}),`
`,e.jsx(i.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(i.p,{children:"Text is a view that displays one or more lines of read-only text. Use Text to display a string in your app's user interface. The Text view draws a string in a given font, with support for multiple lines, text truncation, and wrapping."}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",e.jsx(i.code,{children:"Text"}),"."]}),`
`,e.jsx(i.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n,{of:l}),`
`,e.jsx(i.h2,{id:"long-text",children:"Long Text"}),`
`,e.jsx(i.p,{children:"Text automatically wraps to multiple lines when needed:"}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(i.h2,{id:"line-limit",children:"Line Limit"}),`
`,e.jsxs(i.p,{children:["Control the maximum number of lines displayed using the ",e.jsx(i.code,{children:"lineLimit"})," prop:"]}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(i.h3,{id:"single-line-limit",children:"Single Line Limit"}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(i.h2,{id:"custom-styling",children:"Custom Styling"}),`
`,e.jsx(i.p,{children:"Apply custom styles to text:"}),`
`,e.jsx(n,{of:a}),`
`,e.jsx(i.h2,{id:"in-layouts",children:"In Layouts"}),`
`,e.jsx(i.h3,{id:"multiple-texts-in-vstack",children:"Multiple Texts in VStack"}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(i.h3,{id:"text-in-hstack",children:"Text in HStack"}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(i.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Text automatically wraps when it exceeds the container width"}),`
`,e.jsxs(i.li,{children:["Use ",e.jsx(i.code,{children:"lineLimit"})," to control text truncation"]}),`
`,e.jsx(i.li,{children:"Text supports all standard CSS text styling properties"}),`
`,e.jsx(i.li,{children:"Text can contain other React components as children"}),`
`]}),`
`,e.jsx(i.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ol,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Readability"}),": Ensure sufficient contrast between text and background colors"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Line limits"}),": Use ",e.jsx(i.code,{children:"lineLimit"})," appropriately to prevent layout issues with long text"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Responsive"}),": Text automatically adapts to container width"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Accessibility"}),": Use semantic HTML and proper heading hierarchy"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Performance"}),": Avoid excessive nested text components for better performance"]}),`
`]})]})}function D(t={}){const{wrapper:i}={...r(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(s,{...t})}):s(t)}export{D as default};
