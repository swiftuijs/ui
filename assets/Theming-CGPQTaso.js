import{u as r,j as n,M as o}from"../vite-inject-mocker-entry.js";import"./vendor-BWbLABlD.js";function a(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Theming",order:6}),`
`,n.jsx(s.h1,{id:"theming-and-style-customization",children:"Theming and Style Customization"}),`
`,n.jsx(s.p,{children:"SwiftUI.js provides a flexible theming system that allows you to easily customize component appearance."}),`
`,n.jsx(s.h2,{id:"css-variables",children:"CSS Variables"}),`
`,n.jsx(s.p,{children:"SwiftUI.js uses CSS variables to manage themes. All design tokens are defined through CSS variables."}),`
`,n.jsx(s.h3,{id:"color-variables",children:"Color Variables"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  /* Primary colors */
  --sw-color-blue: #007AFF;
  --sw-color-blue-dark: #0051D5;
  --sw-color-blue-light: #5AC8FA;
  
  /* Grayscale */
  --sw-color-gray: #8E8E93;
  --sw-color-gray-light: #C7C7CC;
  --sw-color-gray-lighter: #E5E5EA;
  --sw-color-gray-dark: #636366;
  
  /* Text colors */
  --sw-color-label-primary: #000000;
  --sw-color-label-secondary: #8E8E93;
  --sw-color-label-tertiary: #C7C7CC;
  
  /* Background colors */
  --sw-color-background-primary: #FFFFFF;
  --sw-color-background-secondary: #F2F2F7;
  --sw-color-background-tertiary: #FFFFFF;
  
  /* Separators */
  --sw-color-separator: #C6C6C8;
  --sw-color-separator-opaque: #38383A;
  
  /* Accent color */
  --sw-accent-color: var(--sw-color-blue);
}
`})}),`
`,n.jsx(s.h3,{id:"spacing-variables",children:"Spacing Variables"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  --sw-spacing-xs: 4px;
  --sw-spacing-sm: 8px;
  --sw-spacing-md: 12px;
  --sw-spacing-lg: 16px;
  --sw-spacing-xl: 20px;
  --sw-spacing-2xl: 24px;
  --sw-spacing-3xl: 32px;
}
`})}),`
`,n.jsx(s.h3,{id:"typography-variables",children:"Typography Variables"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  /* Font sizes */
  --sw-font-size-large-title: 34px;
  --sw-font-size-title-1: 28px;
  --sw-font-size-title-2: 22px;
  --sw-font-size-title-3: 20px;
  --sw-font-size-headline: 17px;
  --sw-font-size-body: 17px;
  --sw-font-size-callout: 16px;
  --sw-font-size-subheadline: 15px;
  --sw-font-size-footnote: 13px;
  --sw-font-size-caption-1: 12px;
  --sw-font-size-caption-2: 11px;
  
  /* Font weights */
  --sw-font-weight-regular: 400;
  --sw-font-weight-medium: 500;
  --sw-font-weight-semibold: 600;
  --sw-font-weight-bold: 700;
  
  /* Line heights */
  --sw-line-height-tight: 1.2;
  --sw-line-height-normal: 1.4;
  --sw-line-height-relaxed: 1.6;
}
`})}),`
`,n.jsx(s.h3,{id:"border-radius-variables",children:"Border Radius Variables"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  --sw-radius-xs: 4px;
  --sw-radius-sm: 6px;
  --sw-radius-md: 8px;
  --sw-radius-lg: 12px;
  --sw-radius-xl: 16px;
  --sw-radius-full: 9999px;
}
`})}),`
`,n.jsx(s.h3,{id:"shadow-variables",children:"Shadow Variables"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  --sw-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --sw-shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
  --sw-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);
}
`})}),`
`,n.jsx(s.h3,{id:"transition-variables",children:"Transition Variables"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  --sw-transition-fast: 0.15s ease-out;
  --sw-transition-normal: 0.25s ease-out;
  --sw-transition-slow: 0.35s ease-out;
}
`})}),`
`,n.jsx(s.h2,{id:"custom-themes",children:"Custom Themes"}),`
`,n.jsx(s.h3,{id:"override-css-variables",children:"Override CSS Variables"}),`
`,n.jsx(s.p,{children:"Override variables in your CSS file:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  /* Custom primary color */
  --sw-color-blue: #FF6B6B;
  --sw-accent-color: #FF6B6B;
  
  /* Custom spacing */
  --sw-spacing-md: 16px;
  --sw-spacing-lg: 24px;
}
`})}),`
`,n.jsx(s.h3,{id:"create-dark-theme",children:"Create Dark Theme"}),`
`,n.jsx(s.p,{children:"Use media queries to create a dark theme:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`@media (prefers-color-scheme: dark) {
  :root {
    --sw-color-label-primary: #FFFFFF;
    --sw-color-label-secondary: #8E8E93;
    --sw-color-background-primary: #000000;
    --sw-color-background-secondary: #1C1C1E;
    --sw-color-separator: #38383A;
  }
}
`})}),`
`,n.jsx(s.h3,{id:"switch-themes-with-class-names",children:"Switch Themes with Class Names"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`.theme-dark {
  --sw-color-label-primary: #FFFFFF;
  --sw-color-background-primary: #000000;
  --sw-color-background-secondary: #1C1C1E;
}

.theme-light {
  --sw-color-label-primary: #000000;
  --sw-color-background-primary: #FFFFFF;
  --sw-color-background-secondary: #F2F2F7;
}
`})}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-tsx",children:`function App() {
  const [theme, setTheme] = useState('light')
  
  return (
    <div className={\`theme-\${theme}\`}>
      <YourApp />
    </div>
  )
}
`})}),`
`,n.jsx(s.h2,{id:"component-style-customization",children:"Component Style Customization"}),`
`,n.jsx(s.h3,{id:"using-style-prop",children:"Using style Prop"}),`
`,n.jsxs(s.p,{children:["All components support the ",n.jsx(s.code,{children:"style"})," prop:"]}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-tsx",children:`<Text style={{ 
  color: '#FF6B6B', 
  fontSize: 24, 
  fontWeight: 'bold' 
}}>
  Custom Text
</Text>
`})}),`
`,n.jsx(s.h3,{id:"using-classname",children:"Using className"}),`
`,n.jsxs(s.p,{children:["Components also support the ",n.jsx(s.code,{children:"className"})," prop:"]}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-tsx",children:`<Button className="my-custom-button">
  Custom Button
</Button>
`})}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`.my-custom-button {
  background-color: #FF6B6B;
  border-radius: 20px;
  padding: 12px 24px;
}
`})}),`
`,n.jsx(s.h3,{id:"combining-both",children:"Combining Both"}),`
`,n.jsxs(s.p,{children:["You can use both ",n.jsx(s.code,{children:"style"})," and ",n.jsx(s.code,{children:"className"})," together:"]}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-tsx",children:`<Button 
  className="my-button"
  style={{ fontSize: 18 }}
>
  Button
</Button>
`})}),`
`,n.jsx(s.h2,{id:"responsive-themes",children:"Responsive Themes"}),`
`,n.jsx(s.h3,{id:"based-on-screen-size",children:"Based on Screen Size"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`:root {
  --sw-spacing-md: 12px;
}

@media (min-width: 768px) {
  :root {
    --sw-spacing-md: 16px;
  }
}

@media (min-width: 1024px) {
  :root {
    --sw-spacing-md: 20px;
  }
}
`})}),`
`,n.jsx(s.h2,{id:"theming-best-practices",children:"Theming Best Practices"}),`
`,n.jsx(s.h3,{id:"1-use-css-variables",children:"1. Use CSS Variables"}),`
`,n.jsx(s.p,{children:"Prefer CSS variables over hardcoded values:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`/* ✅ Good */
.custom-component {
  color: var(--sw-color-blue);
  padding: var(--sw-spacing-md);
}

/* ❌ Bad */
.custom-component {
  color: #007AFF;
  padding: 12px;
}
`})}),`
`,n.jsx(s.h3,{id:"2-maintain-consistency",children:"2. Maintain Consistency"}),`
`,n.jsx(s.p,{children:"Use the same design tokens throughout your application:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-tsx",children:`// ✅ Good: Use consistent spacing
<VStack spacing={16}>
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VStack>

// ❌ Bad: Mix different spacing values
<VStack spacing={16}>
  <Text style={{ marginBottom: 10 }}>Item 1</Text>
  <Text style={{ marginTop: 20 }}>Item 2</Text>
</VStack>
`})}),`
`,n.jsx(s.h3,{id:"3-semantic-naming",children:"3. Semantic Naming"}),`
`,n.jsx(s.p,{children:"Use semantic variable names:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`/* ✅ Good */
--sw-color-primary: #007AFF;
--sw-color-success: #34C759;
--sw-color-error: #FF3B30;

/* ❌ Bad */
--sw-color-blue: #007AFF;
--sw-color-green: #34C759;
--sw-color-red: #FF3B30;
`})}),`
`,n.jsx(s.h2,{id:"create-custom-theme-file",children:"Create Custom Theme File"}),`
`,n.jsx(s.p,{children:"Create a theme configuration file:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`/* theme.css */
:root {
  /* Custom colors */
  --sw-color-primary: #007AFF;
  --sw-color-secondary: #5856D6;
  --sw-color-success: #34C759;
  --sw-color-warning: #FF9500;
  --sw-color-error: #FF3B30;
  
  /* Custom spacing */
  --sw-spacing-base: 8px;
  --sw-spacing-sm: calc(var(--sw-spacing-base) * 1);
  --sw-spacing-md: calc(var(--sw-spacing-base) * 2);
  --sw-spacing-lg: calc(var(--sw-spacing-base) * 3);
  --sw-spacing-xl: calc(var(--sw-spacing-base) * 4);
}
`})}),`
`,n.jsx(s.p,{children:"Import in your application:"}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-tsx",children:`import '@swiftuijs/ui/dist/ui.css'
import './theme.css'
`})}),`
`,n.jsx(s.h2,{id:"next-steps",children:"Next Steps"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["📱 Learn about ",n.jsx(s.a,{href:"/docs/Responsive",children:"Responsive Design"})," to create adaptive UIs"]}),`
`,n.jsxs(s.li,{children:["📐 Check out the ",n.jsx(s.a,{href:"/docs/Layout",children:"Layout System"})," to build complex layouts"]}),`
`,n.jsxs(s.li,{children:["🧩 Browse ",n.jsx(s.a,{href:"/docs/Components",children:"Component Documentation"})," to learn more about components"]}),`
`]})]})}function l(e={}){const{wrapper:s}={...r(),...e.components};return s?n.jsx(s,{...e,children:n.jsx(a,{...e})}):a(e)}export{l as default};
