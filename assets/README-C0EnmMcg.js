import{u as r,j as i,M as l,C as n}from"../vite-inject-mocker-entry.js";import{Default as o,InScrollView as a,WithEstimatedHeight as c,WithAlignment as h}from"./stories-Cdopp6ms.js";import"./vendor-BWbLABlD.js";import"./index-QCktaF1M.js";import"./index-Bqonpr_V.js";import"./standardize-umhyi7Fb.js";import"./index-DmxC7mxv.js";import"./index-5crOUHbG.js";import"./index-D-1PhA13.js";import"./index-Cyk_ttaI.js";import"./index-BZ7zHWp_.js";import"./index-DNH0MN80.js";import"./index-YKBvCYzF.js";import"./index-CQ718JuG.js";import"./index-DkHtmGrX.js";import"./index-BHmATDsu.js";import"./index-CZAo45bw.js";import"./index-Xs_apyap.js";function s(t){const e={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...t.components};return i.jsxs(i.Fragment,{children:[i.jsx(l,{title:"SwiftUI/LazyVStack/Readme"}),`
`,i.jsx(e.h1,{id:"lazyvstack",children:"LazyVStack"}),`
`,i.jsx(e.h2,{id:"overview",children:"Overview"}),`
`,i.jsx(e.p,{children:"LazyVStack is a container that arranges its children vertically, loading them lazily. LazyVStack is similar to VStack but only renders children that are visible in the viewport, improving performance for long lists."}),`
`,i.jsxs(e.p,{children:[i.jsx(e.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",i.jsx(e.code,{children:"LazyVStack"}),"."]}),`
`,i.jsx(e.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,i.jsx(n,{of:o}),`
`,i.jsx(e.h2,{id:"in-scrollview",children:"In ScrollView"}),`
`,i.jsx(n,{of:a}),`
`,i.jsx(e.h2,{id:"with-estimated-item-height",children:"With Estimated Item Height"}),`
`,i.jsx(n,{of:c}),`
`,i.jsx(e.h2,{id:"with-alignment",children:"With Alignment"}),`
`,i.jsx(n,{of:h}),`
`,i.jsx(e.h2,{id:"notes",children:"Notes"}),`
`,i.jsxs(e.ul,{children:[`
`,i.jsx(e.li,{children:"LazyVStack supports all VStack props (spacing, alignment, etc.)"}),`
`,i.jsx(e.li,{children:"LazyVStack only renders visible items for better performance"}),`
`,i.jsxs(e.li,{children:["Use ",i.jsx(e.code,{children:"estimatedItemHeight"})," to optimize virtualization"]}),`
`,i.jsx(e.li,{children:"LazyVStack is ideal for long lists and scrollable content"}),`
`,i.jsx(e.li,{children:"LazyVStack automatically handles viewport detection"}),`
`]}),`
`,i.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,i.jsxs(e.ol,{children:[`
`,i.jsxs(e.li,{children:[i.jsx(e.strong,{children:"Long lists"}),": Use LazyVStack for lists with many items"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.strong,{children:"Performance"}),": LazyVStack improves performance for large datasets"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.strong,{children:"Estimated height"}),": Provide estimatedItemHeight when possible"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.strong,{children:"Keys"}),": Always provide unique keys for list items"]}),`
`,i.jsxs(e.li,{children:[i.jsx(e.strong,{children:"ScrollView"}),": Use LazyVStack within ScrollView for scrollable lists"]}),`
`]})]})}function U(t={}){const{wrapper:e}={...r(),...t.components};return e?i.jsx(e,{...t,children:i.jsx(s,{...t})}):s(t)}export{U as default};
