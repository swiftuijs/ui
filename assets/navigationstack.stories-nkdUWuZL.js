import{j as t}from"./jsx-runtime-QvZ8i92b.js";import{a as c,H as p,T as i,V as u}from"./index-CvQOHwnN.js";import"./index-uubelm5h.js";const v={title:"SwiftUI/Spacer",component:c};function e(){return t.jsxs(p,{children:[t.jsx(i,{children:"Left"}),t.jsx(c,{}),t.jsx(i,{children:"Right"})]})}function a(){return t.jsxs(u,{children:[t.jsx(i,{children:"Left"}),t.jsx(c,{}),t.jsx(i,{children:"Right"})]})}function n(){return t.jsxs(p,{children:[t.jsx(c,{}),t.jsx(i,{children:"Text"})]})}e.__docgenInfo={description:"",methods:[],displayName:"NavigationStackBetween"};a.__docgenInfo={description:"",methods:[],displayName:"NavigationStackWithVStackBetween"};n.__docgenInfo={description:"",methods:[],displayName:"NavigationStackLeading"};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`function NavigationStackBetween() {
  return <HStack>
      <Text>Left</Text>
      <NavigationStack />
      <Text>Right</Text>
    </HStack>;
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var d,S,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`function NavigationStackWithVStackBetween() {
  return <VStack>
      <Text>Left</Text>
      <NavigationStack />
      <Text>Right</Text>
    </VStack>;
}`,...(g=(S=a.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var k,x,m;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`function NavigationStackLeading() {
  return <HStack>
      <NavigationStack />
      <Text>Text</Text>
    </HStack>;
}`,...(m=(x=n.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};const l=["NavigationStackBetween","NavigationStackWithVStackBetween","NavigationStackLeading"];export{e as NavigationStackBetween,n as NavigationStackLeading,a as NavigationStackWithVStackBetween,l as __namedExportsOrder,v as default};
