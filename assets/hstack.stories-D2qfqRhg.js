import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{H as a,T as s,S as H}from"./index-CvQOHwnN.js";import"./index-uubelm5h.js";const f={title:"SwiftUI/HStack",component:a};function t(m){return e.jsxs(a,{...m,children:[e.jsx(s,{children:"HHH"}),e.jsx(H,{minLength:"10"}),e.jsx(s,{children:"HHH"})]})}function n(){return e.jsxs(a,{children:[e.jsx(H,{}),e.jsx(s,{children:"HHH"}),e.jsx(s,{children:"HHH"})]})}t.__docgenInfo={description:"",methods:[],displayName:"HStackSpaceInMiddle",props:{alignment:{required:!1,tsType:{name:"EAlignment"},description:`The guide for aligning the subviews in this stack.
 This guide has the same vertical screen coordinate for every child view.`},spacing:{required:!1,tsType:{name:"number"},description:`The distance between adjacent subviews,
 or nil if you want the stack to choose a default distance for each pair of subviews.`}},composes:["IBaseComponent"]};n.__docgenInfo={description:"",methods:[],displayName:"HStackInLeft"};var r,c,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`function HStackSpaceInMiddle(props: IHStackProps) {
  return <HStack {...props}>
      <Text>HHH</Text>
      <Spacer minLength="10" />
      <Text>HHH</Text>
    </HStack>;
}`,...(i=(c=t.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var o,d,p;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`function HStackInLeft() {
  return <HStack>
      <Spacer />
      <Text>HHH</Text>
      <Text>HHH</Text>
    </HStack>;
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const h=["HStackSpaceInMiddle","HStackInLeft"];export{n as HStackInLeft,t as HStackSpaceInMiddle,h as __namedExportsOrder,f as default};
