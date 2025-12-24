import{u as s,j as n,M as o,C as i}from"../vite-inject-mocker-entry.js";import{Default as l,WithAlignment as a,TopLeading as c,BottomTrailing as d,ImageOverlay as h,ButtonOverlay as m,MultipleLayers as x}from"./stories-95pR9gH2.js";import"./vendor-BWbLABlD.js";import"./index-QCktaF1M.js";import"./index-Bqonpr_V.js";import"./standardize-umhyi7Fb.js";import"./index-DmxC7mxv.js";import"./index-5crOUHbG.js";import"./index-D-1PhA13.js";import"./index-Cyk_ttaI.js";import"./index-BZ7zHWp_.js";import"./index-DNH0MN80.js";import"./index-YKBvCYzF.js";import"./index-CQ718JuG.js";import"./index-DkHtmGrX.js";import"./index-BHmATDsu.js";import"./index-CZAo45bw.js";import"./index-Xs_apyap.js";function r(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...s(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"SwiftUI/ZStack/Readme"}),`
`,n.jsx(e.h1,{id:"zstack",children:"ZStack"}),`
`,n.jsx(e.h2,{id:"overview",children:"Overview"}),`
`,n.jsx(e.p,{children:"ZStack is a view that overlays its children, aligning them in both axes. A ZStack overlays child views on top of each other. You can control the alignment of the children within the ZStack."}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"SwiftUI Correspondence"}),": Similar to SwiftUI's ",n.jsx(e.code,{children:"ZStack"}),"."]}),`
`,n.jsx(e.h2,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(i,{of:l}),`
`,n.jsx(e.h2,{id:"alignment",children:"Alignment"}),`
`,n.jsx(e.p,{children:"Control how children are aligned within the ZStack:"}),`
`,n.jsx(i,{of:a}),`
`,n.jsx(e.h3,{id:"top-leading",children:"Top Leading"}),`
`,n.jsx(i,{of:c}),`
`,n.jsx(e.h3,{id:"bottom-trailing",children:"Bottom Trailing"}),`
`,n.jsx(i,{of:d}),`
`,n.jsx(e.h2,{id:"image-overlay",children:"Image Overlay"}),`
`,n.jsx(e.p,{children:"Common use case: overlay text on images:"}),`
`,n.jsx(i,{of:h}),`
`,n.jsx(e.h2,{id:"button-overlay",children:"Button Overlay"}),`
`,n.jsx(i,{of:m}),`
`,n.jsx(e.h2,{id:"multiple-layers",children:"Multiple Layers"}),`
`,n.jsx(e.p,{children:"ZStack can contain multiple layers:"}),`
`,n.jsx(i,{of:x}),`
`,n.jsx(e.h2,{id:"notes",children:"Notes"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Children are stacked in the order they appear (first child is bottom layer)"}),`
`,n.jsx(e.li,{children:"ZStack requires explicit dimensions or will size to fit children"}),`
`,n.jsx(e.li,{children:"Alignment controls positioning of all children as a group"}),`
`,n.jsx(e.li,{children:"Useful for overlays, badges, and layered UI elements"}),`
`]}),`
`,n.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Layer order"}),": Place background elements first, foreground elements last"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Dimensions"}),": Always provide explicit dimensions for ZStack containers"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Alignment"}),": Use appropriate alignment for your design needs"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Performance"}),": Avoid excessive nesting of ZStack components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Accessibility"}),": Ensure overlays don't obscure important content"]}),`
`]})]})}function L(t={}){const{wrapper:e}={...s(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(r,{...t})}):r(t)}export{L as default};
