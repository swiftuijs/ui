import{u as r,j as i,M as o,C as n}from"../vite-inject-mocker-entry.js";import{Default as l,InScrollView as a,WithEstimatedWidth as c,WithAlignment as h}from"./stories-BDXrC8eW.js";import"./vendor-BWbLABlD.js";import"./index-QCktaF1M.js";import"./index-Bqonpr_V.js";import"./standardize-umhyi7Fb.js";import"./index-DmxC7mxv.js";import"./index-5crOUHbG.js";import"./index-D-1PhA13.js";import"./index-Cyk_ttaI.js";import"./index-BZ7zHWp_.js";import"./index-DNH0MN80.js";import"./index-YKBvCYzF.js";import"./index-CQ718JuG.js";import"./index-DkHtmGrX.js";import"./index-BHmATDsu.js";import"./index-CZAo45bw.js";import"./index-Xs_apyap.js";function s(e){const t={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...e.components};return i.jsxs(i.Fragment,{children:[i.jsx(o,{title:"SwiftUI/LazyHStack/Readme"}),`
`,i.jsx(t.h1,{id:"lazyhstack",children:"LazyHStack"}),`
`,i.jsx(t.h2,{id:"overview",children:"Overview"}),`
`,i.jsx(t.p,{children:"LazyHStack is a container that arranges its children horizontally, loading them lazily. LazyHStack is similar to HStack but only renders children that are visible in the viewport, improving performance for long horizontal lists."}),`
`,i.jsxs(t.p,{children:[i.jsx(t.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",i.jsx(t.code,{children:"LazyHStack"}),"."]}),`
`,i.jsx(t.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,i.jsx(n,{of:l}),`
`,i.jsx(t.h2,{id:"in-scrollview",children:"In ScrollView"}),`
`,i.jsx(n,{of:a}),`
`,i.jsx(t.h2,{id:"with-estimated-item-width",children:"With Estimated Item Width"}),`
`,i.jsx(n,{of:c}),`
`,i.jsx(t.h2,{id:"with-alignment",children:"With Alignment"}),`
`,i.jsx(n,{of:h}),`
`,i.jsx(t.h2,{id:"notes",children:"Notes"}),`
`,i.jsxs(t.ul,{children:[`
`,i.jsx(t.li,{children:"LazyHStack supports all HStack props (spacing, alignment, etc.)"}),`
`,i.jsx(t.li,{children:"LazyHStack only renders visible items for better performance"}),`
`,i.jsxs(t.li,{children:["Use ",i.jsx(t.code,{children:"estimatedItemWidth"})," to optimize virtualization"]}),`
`,i.jsx(t.li,{children:"LazyHStack is ideal for long horizontal lists"}),`
`,i.jsx(t.li,{children:"LazyHStack automatically handles viewport detection"}),`
`]}),`
`,i.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,i.jsxs(t.ol,{children:[`
`,i.jsxs(t.li,{children:[i.jsx(t.strong,{children:"Long lists"}),": Use LazyHStack for horizontal lists with many items"]}),`
`,i.jsxs(t.li,{children:[i.jsx(t.strong,{children:"Performance"}),": LazyHStack improves performance for large datasets"]}),`
`,i.jsxs(t.li,{children:[i.jsx(t.strong,{children:"Estimated width"}),": Provide estimatedItemWidth when possible"]}),`
`,i.jsxs(t.li,{children:[i.jsx(t.strong,{children:"Keys"}),": Always provide unique keys for list items"]}),`
`,i.jsxs(t.li,{children:[i.jsx(t.strong,{children:"ScrollView"}),": Use LazyHStack within ScrollView for scrollable horizontal lists"]}),`
`]})]})}function W(e={}){const{wrapper:t}={...r(),...e.components};return t?i.jsx(t,{...e,children:i.jsx(s,{...e})}):s(e)}export{W as default};
