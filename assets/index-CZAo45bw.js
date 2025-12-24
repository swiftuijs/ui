import{r as d,j as e}from"../vite-inject-mocker-entry.js";import{s as u,p as t}from"./standardize-umhyi7Fb.js";const y=d.memo(function(i){const{icon:n,title:a,variant:s="automatic",style:l,...o}=i,{commonProps:r,restProps:c}=u({...o,style:l},{className:[t("label")]}),m=s!=="titleOnly"&&n,p=s!=="iconOnly"&&a;return e.jsxs("div",{...r,...c,children:[m&&e.jsx("span",{className:t("label-icon"),children:n}),p&&e.jsx("span",{className:t("label-title"),children:a})]})});y.__docgenInfo={description:`A view that displays an icon and a title.

Label combines an icon and text in a single view, similar to SwiftUI's Label.
It's commonly used in lists, menus, and other UI elements.

@example
\`\`\`tsx
<Label icon="🏠" title="Home" />
\`\`\`

@see https://developer.apple.com/documentation/swiftui/label`,methods:[],displayName:"Label",props:{icon:{required:!1,tsType:{name:"ReactNode"},description:"Label icon"},title:{required:!0,tsType:{name:"string"},description:"Label text"},variant:{required:!1,tsType:{name:"union",raw:"'automatic' | 'iconOnly' | 'titleOnly'",elements:[{name:"literal",value:"'automatic'"},{name:"literal",value:"'iconOnly'"},{name:"literal",value:"'titleOnly'"}]},description:`Label style variant
@default 'automatic'`},style:{required:!1,tsType:{name:"IBaseComponent['style']",raw:"IBaseComponent['style']"},description:"Custom CSS style (overrides variant)"}},composes:["Omit"]};export{y as L};
