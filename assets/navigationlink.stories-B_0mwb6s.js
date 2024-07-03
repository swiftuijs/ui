import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{N as r,H as L,T as n,V as h}from"./index-wX-KiPTb.js";import"./index-uubelm5h.js";const v={title:"SwiftUI/Spacer",component:r};function t(){return e.jsxs(L,{children:[e.jsx(n,{children:"Left"}),e.jsx(r,{}),e.jsx(n,{children:"Right"})]})}function i(){return e.jsxs(h,{children:[e.jsx(n,{children:"Left"}),e.jsx(r,{children:e.jsx(n,{children:"Right"})}),e.jsx(n,{children:"Right"})]})}function a(){return e.jsxs(L,{children:[e.jsx(r,{}),e.jsx(n,{children:"Text"})]})}t.__docgenInfo={description:"",methods:[],displayName:"NavigationLinkBetween"};i.__docgenInfo={description:"",methods:[],displayName:"NavigationLinkWithVStackBetween"};a.__docgenInfo={description:"",methods:[],displayName:"NavigationLinkLeading"};var o,s,c;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`function NavigationLinkBetween() {
  return <HStack>
      <Text>Left</Text>
      <NavigationLink />
      <Text>Right</Text>
    </HStack>;
}`,...(c=(s=t.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var d,g,x;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`function NavigationLinkWithVStackBetween() {
  return <VStack>
      <Text>Left</Text>
      <NavigationLink>
        <Text>Right</Text>
      </NavigationLink>
      <Text>Right</Text>
    </VStack>;
}`,...(x=(g=i.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var k,m,p;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`function NavigationLinkLeading() {
  return <HStack>
      <NavigationLink />
      <Text>Text</Text>
    </HStack>;
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const f=["NavigationLinkBetween","NavigationLinkWithVStackBetween","NavigationLinkLeading"];export{t as NavigationLinkBetween,a as NavigationLinkLeading,i as NavigationLinkWithVStackBetween,f as __namedExportsOrder,v as default};
