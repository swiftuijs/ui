import{j as r}from"./jsx-runtime-QvZ8i92b.js";import{b as t,T as p,S as o}from"./index-CvQOHwnN.js";import"./index-uubelm5h.js";const w={title:"SwiftUI/ScrollView",component:t};function e(){return r.jsx(t,{children:Array(200).fill(0).map((x,i)=>r.jsxs(r.Fragment,{children:[r.jsxs(p,{children:["index ",i]}),r.jsx(o,{minLength:4})]}))})}function n(){return r.jsxs(t,{direction:"horizontal",children:[r.jsx(o,{}),Array(200).fill(0).map((x,i)=>r.jsxs(r.Fragment,{children:[r.jsxs(p,{children:["index ",i]}),r.jsx(o,{minLength:4})]}))]})}e.__docgenInfo={description:"",methods:[],displayName:"ScrollViewVertical"};n.__docgenInfo={description:"",methods:[],displayName:"ScrollViewHorizontal"};var l,c,a;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`function ScrollViewVertical() {
  return <ScrollView>
      {Array(200).fill(0).map((_, i) => {
      return <>
          <Text>index {i}</Text>
          <Spacer minLength={4} />
        </>;
    })}
    </ScrollView>;
}`,...(a=(c=e.parameters)==null?void 0:c.docs)==null?void 0:a.source}}};var s,m,d;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`function ScrollViewHorizontal() {
  return <ScrollView direction="horizontal">
      <Spacer />
      {Array(200).fill(0).map((_, i) => {
      return <>
          <Text>index {i}</Text>
          <Spacer minLength={4} />
        </>;
    })}
    </ScrollView>;
}`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const f=["ScrollViewVertical","ScrollViewHorizontal"];export{n as ScrollViewHorizontal,e as ScrollViewVertical,f as __namedExportsOrder,w as default};
