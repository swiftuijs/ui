import{j as t}from"./jsx-runtime-QvZ8i92b.js";import{B as s,H as h,T as e,V as l}from"./index-i0bYkYf-.js";import"./index-uubelm5h.js";const T={title:"SwiftUI/Spacer",component:s};function n(){return t.jsxs(h,{children:[t.jsx(e,{children:"Left"}),t.jsx(s,{}),t.jsx(e,{children:"Right"})]})}function r(){return t.jsxs(l,{children:[t.jsx(e,{children:"Left"}),t.jsx(s,{children:t.jsx(e,{children:"Right"})}),t.jsx(e,{children:"Right"})]})}function o(){return t.jsxs(h,{children:[t.jsx(s,{}),t.jsx(e,{children:"Text"})]})}n.__docgenInfo={description:"",methods:[],displayName:"ButtonBetween"};r.__docgenInfo={description:"",methods:[],displayName:"ButtonWithVStackBetween"};o.__docgenInfo={description:"",methods:[],displayName:"ButtonLeading"};var a,c,i;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`function ButtonBetween() {
  return <HStack>
      <Text>Left</Text>
      <Button />
      <Text>Right</Text>
    </HStack>;
}`,...(i=(c=n.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,d,x;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`function ButtonWithVStackBetween() {
  return <VStack>
      <Text>Left</Text>
      <Button>
        <Text>Right</Text>
      </Button>
      <Text>Right</Text>
    </VStack>;
}`,...(x=(d=r.parameters)==null?void 0:d.docs)==null?void 0:x.source}}};var m,p,B;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`function ButtonLeading() {
  return <HStack>
      <Button />
      <Text>Text</Text>
    </HStack>;
}`,...(B=(p=o.parameters)==null?void 0:p.docs)==null?void 0:B.source}}};const j=["ButtonBetween","ButtonWithVStackBetween","ButtonLeading"];export{n as ButtonBetween,o as ButtonLeading,r as ButtonWithVStackBetween,j as __namedExportsOrder,T as default};
