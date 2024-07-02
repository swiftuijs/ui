import{j as e}from"./jsx-runtime-QvZ8i92b.js";import{S as c,H as h,T as a,V as f}from"./index-tIuxK0uK.js";import"./index-uubelm5h.js";const j={title:"SwiftUI/Spacer",component:c};function t(){return e.jsxs(h,{children:[e.jsx(a,{children:"Left"}),e.jsx(c,{}),e.jsx(a,{children:"Right"})]})}function r(){return e.jsxs(f,{children:[e.jsx(a,{children:"Left"}),e.jsx(c,{minLength:20}),e.jsx(a,{children:"Right"})]})}function n(){return e.jsxs(h,{children:[e.jsx(c,{}),e.jsx(a,{children:"Text"})]})}t.__docgenInfo={description:"",methods:[],displayName:"SpacerBetween"};r.__docgenInfo={description:"",methods:[],displayName:"SpacerWithVStackBetween"};n.__docgenInfo={description:"",methods:[],displayName:"SpacerLeading"};var s,o,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`function SpacerBetween() {
  return <HStack>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </HStack>;
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var p,d,S;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`function SpacerWithVStackBetween() {
  return <VStack>
      <Text>Left</Text>
      <Spacer minLength={20} />
      <Text>Right</Text>
    </VStack>;
}`,...(S=(d=r.parameters)==null?void 0:d.docs)==null?void 0:S.source}}};var m,x,u;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`function SpacerLeading() {
  return <HStack>
      <Spacer />
      <Text>Text</Text>
    </HStack>;
}`,...(u=(x=n.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};const k=["SpacerBetween","SpacerWithVStackBetween","SpacerLeading"];export{t as SpacerBetween,n as SpacerLeading,r as SpacerWithVStackBetween,k as __namedExportsOrder,j as default};
