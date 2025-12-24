import{u as i,j as e,M as t,C as c}from"../vite-inject-mocker-entry.js";import{Default as o}from"./stories-Ds_Vn6VQ.js";import"./vendor-BWbLABlD.js";import"./index-BQEAoBJP.js";import"./standardize-umhyi7Fb.js";import"./index-BwVA9Lg1.js";import"./index-BNcsCq3F.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...i(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"SwiftUI/Stepper/Readme"}),`
`,e.jsx(n.h1,{id:"stepper",children:"Stepper"}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsx(n.p,{children:"Stepper is a control for incrementing or decrementing a value. Stepper provides increment and decrement buttons for adjusting numeric values."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",e.jsx(n.code,{children:"Stepper"}),"."]}),`
`,e.jsx(n.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(c,{of:o}),`
`,e.jsx(n.h2,{id:"notes",children:"Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Stepper requires ",e.jsx(n.code,{children:"value"}),", ",e.jsx(n.code,{children:"onIncrement"}),", and ",e.jsx(n.code,{children:"onDecrement"})," props"]}),`
`,e.jsxs(n.li,{children:["Stepper supports optional ",e.jsx(n.code,{children:"min"})," and ",e.jsx(n.code,{children:"max"})," constraints"]}),`
`,e.jsxs(n.li,{children:["Stepper can be disabled with the ",e.jsx(n.code,{children:"disabled"})," prop"]}),`
`,e.jsx(n.li,{children:"Stepper automatically disables buttons at min/max values"}),`
`,e.jsx(n.li,{children:"Use Stepper for precise numeric value adjustment"}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Constraints"}),": Set appropriate min and max values"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Increment/decrement"}),": Implement logic in onIncrement/onDecrement handlers"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Feedback"}),": Show current value to the user"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Accessibility"}),": Ensure Stepper is keyboard accessible"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mobile"}),": Test stepper interaction on touch devices"]}),`
`]})]})}function m(s={}){const{wrapper:n}={...i(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{m as default};
