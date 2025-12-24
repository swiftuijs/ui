import{r as d,j as s,R as O}from"../vite-inject-mocker-entry.js";import{B as V,L as H,u as q,E as R,a as _,b as E,i as G,e as w,v as U,N as A,V as W}from"./index-BwVA9Lg1.js";import{s as g,p as a,a as Z,g as C}from"./standardize-umhyi7Fb.js";import{H as S}from"./index-B2-CykP2.js";import{T as P}from"./index-BNcsCq3F.js";function Y(){return typeof document<"u"&&"startViewTransition"in document}class K{static getTransitionMode(e){return!e||!e.type?"css":e.type==="view-transition"&&Y()?"view-transition":"css"}static applyTransitionConfig(e,t){if(t&&(t.viewTransitionName?e.style.viewTransitionName=t.viewTransitionName:e.style.viewTransitionName="",t.duration||t.easing)){const n=t.duration?`${t.duration}ms`:void 0,o=t.easing;(n||o)&&(e.style.transition=[n?`all ${n}`:void 0,o||void 0].filter(Boolean).join(" "))}}static getDefaultTransition(e){return e==="actionsheet"?{type:"fade",duration:200}:{type:"slide",duration:300,easing:"cubic-bezier(0.075, 0.82, 0.165, 1)"}}static mergeTransitionConfig(e,t){return!e&&!t?{type:"slide"}:e?t?{...t,...e,direction:e.direction??t.direction}:e:t}}const X=d.memo(function(e){const{alignment:t,...n}=e;return s.jsx(V,{alignment:t,stackClassName:"zstack",...n})});X.__docgenInfo={description:"",methods:[],displayName:"ZStack",props:{alignment:{required:!1,tsType:{name:"EAlignment"},description:`The alignment of the children within the ZStack.

@default undefined (uses container default)`}},composes:["IBaseComponent"]};const k=d.memo(function(e){const{minLength:t,...n}=e,{commonProps:o,restProps:i}=g(n,{style:{"--min-length":Z(t||0)},className:a("spacer")});return s.jsx("div",{...o,...i})});k.__docgenInfo={description:"",methods:[],displayName:"Spacer",props:{minLength:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:`The minimum length of the spacer, in pixels or as a CSS value string.

@default 0`}},composes:["Omit"]};const J=d.memo(function(e){const{direction:t,showsIndicators:n=!0,...o}=e,{commonProps:i,restProps:r,children:c}=g(o,{className:[a("scrollview"),t||"vertical",n?"":"no-scroll-bar"]});return s.jsx("div",{...i,...r,children:c})});J.__docgenInfo={description:"",methods:[],displayName:"ScrollView",props:{direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:`The scrollable axis of the scroll view.

@default 'vertical'`},showsIndicators:{required:!1,tsType:{name:"boolean"},description:`A Boolean value that indicates whether the scroll view displays the scroll indicators.

@default true`}},composes:["IBaseComponent"]};const Q=d.memo(function(e){const t=d.useContext(H),{commonProps:n,restProps:o}=g(e,{className:`sw-divider ${t.boxDirection}`});return s.jsx("div",{...n,...o})});Q.__docgenInfo={description:"",methods:[],displayName:"Divider"};const L=d.memo(function(e){const{commonProps:t,restProps:n,children:o}=g(e,{className:a("button")});return s.jsx("button",{...t,...n,children:o})});L.__docgenInfo={description:"",methods:[],displayName:"Button"};const D=d.memo(function(e){const{title:t,showBackButton:n=!1,onBack:o,toolbarItems:i}=e;return s.jsx("div",{className:a("navigation-bar"),children:s.jsxs(S,{spacing:8,alignment:"center",style:{height:"100%",padding:"0 16px"},children:[n?s.jsx(L,{onClick:o,className:a("navigation-bar-back"),style:{backgroundColor:"transparent",border:"none",padding:"8px 0",minWidth:"auto",color:"var(--sw-color-blue, #007AFF)",fontSize:"17px"},children:s.jsxs(S,{spacing:4,alignment:"center",children:[s.jsx(P,{style:{fontSize:"20px",lineHeight:1},children:"‹"}),s.jsx(P,{style:{fontSize:"17px"},children:"Back"})]})}):s.jsx("div",{style:{width:"60px"}}),s.jsx(k,{}),t&&s.jsx(P,{style:{fontSize:"17px",fontWeight:"600",textAlign:"center",flex:1,position:"absolute",left:"50%",transform:"translateX(-50%)",maxWidth:"calc(100% - 120px)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:t}),s.jsx(k,{}),i?s.jsx("div",{className:a("navigation-bar-toolbar"),children:i}):s.jsx("div",{style:{width:"60px"}})]})})});D.__docgenInfo={description:`A navigation bar component that displays a title, optional back button, and toolbar items.

NavigationBar is used internally by StandardPage to provide iOS-style navigation.
It follows SwiftUI's navigation bar design patterns.

@example
\`\`\`tsx
<NavigationBar 
  title="Home"
  showBackButton={false}
/>
\`\`\`

@example
\`\`\`tsx
<NavigationBar 
  title="Details"
  showBackButton={true}
  onBack={() => navigateBack()}
  toolbarItems={<Button>Share</Button>}
/>
\`\`\``,methods:[],displayName:"NavigationBar",props:{title:{required:!1,tsType:{name:"string"},description:"Navigation bar title"},showBackButton:{required:!1,tsType:{name:"boolean"},description:`Whether to show back button
@default false`},onBack:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when back button is clicked"},toolbarItems:{required:!1,tsType:{name:"ReactNode"},description:"Toolbar items to display on the right side"}}};const $=d.forwardRef(function(e,t){const{type:n="page",navigationTitle:o,toolbarItems:i,transition:r,...c}=e,p=q(),u=d.useRef(null),m=r?.type||"slide",{commonProps:f,restProps:v,children:x}=g(Object.assign({},c),{className:[a("page")],"data-page-type":n,"data-transition-type":m}),b=p.count()>0,T=!!o;d.useEffect(()=>{u.current&&r&&K.applyTransitionConfig(u.current,r)},[r]);const y=h=>{u.current=h,typeof t=="function"?t(h):t&&(t.current=h)};return s.jsxs("div",{...f,...v,ref:y,children:[T&&s.jsx(D,{title:o,showBackButton:b,onBack:()=>p.dismiss(),toolbarItems:i}),s.jsx("div",{className:T?a("page-content"):void 0,children:x})]})});$.__docgenInfo={description:"",methods:[],displayName:"StandardPage",props:{type:{required:!1,tsType:{name:"literal",value:"'page'"},description:`The page type. Must be 'page' for StandardPage component.

@default 'page'`},navigationTitle:{required:!1,tsType:{name:"string"},description:`Navigation bar title.
When provided, a navigation bar will be displayed at the top of the page.`},toolbarItems:{required:!1,tsType:{name:"ReactNode"},description:"Toolbar items to display on the right side of the navigation bar."},transition:{required:!1,tsType:{name:"ITransitionConfig"},description:`Transition configuration for page animation.

@example
\`\`\`tsx
<StandardPage 
  id="detail"
  transition={{
    type: 'view-transition',
    viewTransitionName: 'product-image'
  }}
>
  ...
</StandardPage>
\`\`\``}},composes:["IPageBaseComponent"]};function z(l){const e=d.useRef(null),t=a("dragbar");return d.useEffect(()=>{if(!l.container?.current||!e.current)return;const n=l.container.current,o=e.current;let i=0,r=0;const c=m=>{m.preventDefault();const f=G?m.touches[0].clientY:m.clientY;r=Math.max(i-Math.max(20,f),200),n.style.height=`${r}px`},p=()=>{w.emit(l.eventToChangeDetent,r),document.removeEventListener(_,c),document.removeEventListener(E,p)},u=m=>{m.preventDefault(),i=n.getBoundingClientRect().bottom,document.addEventListener(_,c),document.addEventListener(E,p)};return o.addEventListener(R,u),()=>{o.removeEventListener(R,u)}},[l.container,l.eventToChangeDetent,e]),s.jsx("div",{className:t,ref:e,children:s.jsx("span",{className:a("dragbar-indicator")})})}z.__docgenInfo={description:"",methods:[],displayName:"DragBar",props:{eventToChangeDetent:{required:!0,tsType:{name:"string"},description:""},presentationDetents:{required:!0,tsType:{name:"Array",elements:[{name:"IPresentationDetent"}],raw:"IPresentationDetent[]"},description:""},container:{required:!0,tsType:{name:"RefObject",elements:[{name:"union",raw:"HTMLDivElement | null",elements:[{name:"HTMLDivElement"},{name:"null"}]}],raw:"RefObject<HTMLDivElement | null>"},description:""}}};const ee={medium:"60%",large:"90%"},te=800;function ne(l){const e=U.useStore();return d.useMemo(()=>{const t=e?.height||te,n=l.map(i=>{if(typeof i=="number")return i;const r=ee[i]||i;if(!/^\d+%$/.test(r))throw new Error(`Invalid detent size: ${i}, should be a number or a percentage string like '60%'`);return Math.floor(t*parseFloat(r)/100)}),o=n[0];return{sizes:n.sort((i,r)=>i-r).filter((i,r,c)=>c.indexOf(i)===r),default:o}},[l,e])}function se(l){const e=ne(l.presentationDetents),t=d.useRef(e.sizes.indexOf(e.default)),n=d.useCallback(o=>{if(!l.container?.current)return;const i=l.container.current,r=()=>{i.classList.remove("animate-height"),i.removeEventListener("transitionend",r)};i.addEventListener("transitionend",r),i.classList.add("animate-height");const c=oe(o,e.sizes);i.style.height=`${c}px`},[l.container,e]);d.useEffect(()=>{if(!l.container?.current)return;const o=l.container.current,i=e.sizes[t.current];`${i}px`!==o.style.height&&n(i)},[l.container,e,n]),d.useEffect(()=>(w.on(l.eventToChangeDetent,o=>{console.log("height",o),n(o)}),()=>{w.off(l.eventToChangeDetent)}),[l.eventToChangeDetent,n])}function oe(l,e){for(let t=0;t<e.length;t++){const n=e[t];if(n>l&&t===0||t===e.length-1)return n;const o=e[t+1];if(!(l>o))return l-n<o-l?n:o}}const ae=["medium","large"],F=d.forwardRef(function(e,t){const n=d.useRef(null),o=d.useRef(`change-height-${Math.random().toString(36).slice(2)}`),{type:i,presentationDetents:r=ae,...c}=e,{commonProps:p,restProps:u,children:m}=g(c,{className:[a("page")],"data-page-type":i});return se({container:n,eventToChangeDetent:o.current,presentationDetents:r}),d.useImperativeHandle(t,()=>n.current,[]),s.jsxs("div",{...p,...u,ref:n,children:[s.jsx(z,{eventToChangeDetent:o.current,container:n,presentationDetents:r}),m]})});F.__docgenInfo={description:`A view that presents an action sheet.

ActionSheet is a modal presentation style that slides up from the bottom of the screen.
It supports different detent sizes (medium, large, or custom percentages).

@example
\`\`\`tsx
<ActionSheet id="sheet-1" presentationDetents={['medium', 'large']}>
  <Text>Action Sheet Content</Text>
</ActionSheet>
\`\`\``,methods:[],displayName:"ActionSheet",props:{presentationDetents:{required:!1,tsType:{name:"Array",elements:[{name:"IPresentationDetent"}],raw:"IPresentationDetent[]"},description:`The presentation detents for the action sheet.
Detents define the stopping points when dragging the sheet.

@default ['medium', 'large']`},type:{required:!0,tsType:{name:"literal",value:"'actionsheet'"},description:"The page type. Must be 'actionsheet' for ActionSheet component."}},composes:["IPageBaseComponent"]};const j=class j extends d.Component{constructor(e){super(e),this.containerRef=O.createRef(),this.pageType=e.type||"page",console.log("[page] created",this.pageType,this.props.id)}componentDidMount(){if(!this.containerRef.current)return;const e=this.containerRef.current;if(this.props.noEnteringAnimation){w.emit(`${this.context.eventPrefix}.page-entered`,this.props.id);return}const t=()=>{w.emit(`${this.context.eventPrefix}.page-entered`,this.props.id),e.removeEventListener("animationend",t)};e.addEventListener("animationend",t),e.setAttribute("date-page-status","entering")}shouldComponentUpdate(e){return this.props.id!==e.id||this.props.type!==e.type}UNSAFE_componentWillUpdate(e){console.log("[page] update",this.pageType,this.props.id),console.log("[page] previous",this.props,"nextProps",e)}render(){console.log("[page] render",this.pageType,this.props.id);const{noEnteringAnimation:e,transition:t,...n}=this.props;return this.pageType==="actionsheet"?s.jsx(F,{...n,type:"actionsheet",ref:this.containerRef}):s.jsx($,{...n,type:"page",ref:this.containerRef,transition:t})}exitPage(e){if(!this.containerRef.current)return;const t=this.containerRef.current,n=()=>{t.removeEventListener("animationend",n),e&&e()};t.addEventListener("animationend",n),t.setAttribute("date-page-status","exiting")}};j.contextType=A;let I=j;I.__docgenInfo={description:`A container view that represents a single page in a navigation hierarchy.

Page is used internally by NavigationStack to manage individual pages.
It handles page transitions and lifecycle events.

@example
\`\`\`tsx
<Page id="page-1" type="page">
  <Text>Page Content</Text>
</Page>
\`\`\``,methods:[{name:"exitPage",docblock:`Exits the page with an optional callback.

Triggers the exit animation and calls the callback when the animation completes.

@param callback - Optional callback function executed after page exit animation is done`,modifiers:[],params:[{name:"callback",description:"Optional callback function executed after page exit animation is done",optional:!0,type:{name:"IFn",alias:"IFn"}}],returns:null,description:`Exits the page with an optional callback.

Triggers the exit animation and calls the callback when the animation completes.`}],displayName:"Page",props:{transition:{required:!1,tsType:{name:"ITransitionConfig"},description:"Transition configuration for page animation"}}};const B=C("_index_");function ie(l){const e=d.useRef([]),t=d.useRef(`${C("navi")}`),n=d.useRef({eventPrefix:t.current,append:m=>w.emit(`${t.current}.append`,m),removeLast:(m=1)=>w.emit(`${t.current}.remove`,m),count:()=>e.current.length,dismiss:()=>w.emit(`${t.current}.remove`,1)}),o=d.useRef({}),i=d.useMemo(()=>({component:()=>s.jsx(s.Fragment,{children:l.children}),type:"page",id:B,_id:`page$$${B}`}),[l.children]),[r,c]=d.useState([i]);d.useEffect(()=>{const m=t.current,f={};return w.on(`${m}.append`,v=>{const x=v.type||"page",b=e.current,T=`${x}$$${v.id}`;let y;const h=b.findIndex(N=>N._id===T);if(!(b.length&&h===b.length-1)){if(h===-1){y=Object.assign({},v,{type:x,_id:T});let N=b.findLastIndex(M=>M.type==="page");N===-1&&(N=b.length-1),e.current=[...b.slice(0,N+1),y]}else y=b[h],e.current=[...b.slice(h,1),y];y.type==="page"&&(f[y._id]=()=>{c([y]),delete f[y._id]}),c(N=>[...N,y])}}),w.on(`${m}.remove`,v=>{if(!v||!e.current.length)return;const x=e.current[e.current.length-1];e.current=e.current.slice(0,-v);const b=o.current;if(x.type!=="page"){b[x._id]?b[x._id].exitPage(()=>{c(y=>y.slice(0,-v))}):c(y=>y.slice(0,-v));return}const T=e.current[e.current.length-1]||i;c([T,x]),requestIdleCallback(()=>{b[x._id]?b[x._id].exitPage(()=>{c([T])}):c([T])})}),w.on(`${m}.page-entered`,v=>{f[v]?.()}),()=>{w.off(`${m}.append`),w.off(`${m}.remove`),w.off(`${m}.page-entered`)}},[i]),o.current={};const{commonProps:p,restProps:u}=g(l,{style:{},className:a("navigationstack")});return{commonProps:p,restProps:u,pageInstances:o,shownPages:r,contextValue:n}}function re(l){const{commonProps:e,restProps:t,shownPages:n,contextValue:o,pageInstances:i}=ie(l);return s.jsx(A.Provider,{value:o.current,children:s.jsx("div",{...e,...t,children:n.map((r,c)=>{const p=r.component;return s.jsx(I,{noEnteringAnimation:c===0||c<n.length-1,id:r._id,ref:u=>{i.current[r._id]=u},type:r.type,transition:r.transition,children:s.jsx(p,{})},r._id)})})})}re.__docgenInfo={description:"",methods:[],displayName:"NavigationStack"};const ce=d.memo(function(e){const{commonProps:t,restProps:n}=g(e,{className:a("image")});return s.jsx("img",{...t,...n})});ce.__docgenInfo={description:"",methods:[],displayName:"Image"};const le=d.memo(function(e){const{destination:t,dismiss:n,pageOptions:o,...i}=e,r=q(),c=d.useRef(C("page")),{commonProps:p,restProps:u,children:m}=g(i,{className:a("navigationlink")}),f=d.useCallback(()=>{if(n){r.removeLast();return}if(!t){console.warn("NavigationLink: destination is not set");return}if(typeof t=="string"){window.location.href=t;return}r.append({component:t,type:o?.type,id:c.current,transition:o?.transition})},[t,r,n,o]);return s.jsx("div",{...p,...u,onClick:f,children:m})});le.__docgenInfo={description:"",methods:[],displayName:"NavigationLink",props:{destination:{required:!1,tsType:{name:"union",raw:"string | ComponentType",elements:[{name:"string"},{name:"ComponentType"}]},description:`The destination component or URL to navigate to.
If a string is provided, it will navigate to that URL.
If a ComponentType is provided, it will navigate to that component within the NavigationStack.

@default undefined`},pageOptions:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * The type of page presentation.
   */
  type?: IPageType
  /**
   * Transition configuration for page animation.
   * 
   * @example
   * \`\`\`tsx
   * transition: {
   *   type: 'view-transition',
   *   viewTransitionName: 'shared-element'
   * }
   * \`\`\`
   */
  transition?: ITransitionConfig
}`,signature:{properties:[{key:"type",value:{name:"IPageType",required:!1},description:"The type of page presentation."},{key:"transition",value:{name:"ITransitionConfig",required:!1},description:`Transition configuration for page animation.

@example
\`\`\`tsx
transition: {
  type: 'view-transition',
  viewTransitionName: 'shared-element'
}
\`\`\``}]}},description:"Options for configuring the page presentation."},dismiss:{required:!1,tsType:{name:"boolean"},description:`A Boolean value that indicates whether to dismiss the current page.
When true, clicking the link will navigate back instead of forward.

@default false`}},composes:["IBaseComponent"]};const de=d.memo(function(e){const{destination:t,...n}=e,o=typeof t=="string"?t:t.href,{commonProps:i,restProps:r,children:c}=g(n,{className:a("link")});return s.jsx("a",{...i,...r,href:o,children:c})});de.__docgenInfo={description:"",methods:[],displayName:"Link",props:{destination:{required:!0,tsType:{name:"union",raw:"string | URL",elements:[{name:"string"},{name:"URL"}]},description:"The destination URL for the link."},target:{required:!1,tsType:{name:"string"},description:`The target window or frame for the link.
Common values: '_blank', '_self', '_parent', '_top'

@default undefined (uses browser default)`}},composes:["IBaseComponent"]};const pe=d.memo(function(e){const{...t}=e,{commonProps:n,restProps:o,children:i}=g(t,{className:a("list")});return s.jsx("div",{...n,...o,children:i})});pe.__docgenInfo={description:"",methods:[],displayName:"List"};const me=d.memo(function(e){const{header:t,...n}=e,{commonProps:o,restProps:i,children:r}=g(n,{className:a("section")});return s.jsxs("div",{...o,...i,children:[t&&s.jsx("div",{className:a("section-header"),children:t}),r]})});me.__docgenInfo={description:"",methods:[],displayName:"Section",props:{header:{required:!1,tsType:{name:"ReactNode"},description:`An optional header view for the section.

@default undefined`}},composes:["IBaseComponent"]};const ue=d.memo(function(e){const{estimatedItemHeight:t,...n}=e;return s.jsx(W,{...n})});ue.__docgenInfo={description:"",methods:[],displayName:"LazyVStack",props:{alignment:{required:!1,tsType:{name:"EAlignment"},description:`The guide for aligning the subviews in this stack.
This guide has the same horizontal screen coordinate for every child view.

@default undefined (uses container default)`},spacing:{required:!1,tsType:{name:"number"},description:`The distance between adjacent subviews, in pixels.
If nil, the stack chooses a default distance for each pair of subviews.

@default 0`},estimatedItemHeight:{required:!1,tsType:{name:"number"},description:`Estimated height of each item for virtualization.
Used to optimize rendering performance.`}},composes:["IBaseComponent"]};const he=d.memo(function(e){const{estimatedItemWidth:t,...n}=e;return s.jsx(S,{...n})});he.__docgenInfo={description:"",methods:[],displayName:"LazyHStack",props:{alignment:{required:!1,tsType:{name:"EAlignment"},description:`The guide for aligning the subviews in this stack.
This guide has the same vertical screen coordinate for every child view.

@default 'center'`},spacing:{required:!1,tsType:{name:"number"},description:`The distance between adjacent subviews, in pixels.
If nil, the stack chooses a default distance for each pair of subviews.

@default 0`},estimatedItemWidth:{required:!1,tsType:{name:"number"},description:`Estimated width of each item for virtualization.
Used to optimize rendering performance.`}},composes:["IBaseComponent"]};const fe=d.memo(function(e){const{columns:t=2,spacing:n=0,...o}=e,{commonProps:i,restProps:r,children:c}=g(o,{className:a("lazyvgrid"),style:{"--grid-columns":t,"--grid-spacing":`${n}px`}});return s.jsx("div",{...i,...r,children:c})});fe.__docgenInfo={description:"",methods:[],displayName:"LazyVGrid",props:{columns:{required:!1,tsType:{name:"number"},description:`Number of columns in the grid.

@default 2`},spacing:{required:!1,tsType:{name:"number"},description:`Spacing between grid items.

@default 0`}},composes:["IBaseComponent"]};const ge=d.memo(function(e){const{rows:t=2,spacing:n=0,...o}=e,{commonProps:i,restProps:r,children:c}=g(o,{className:a("lazyhgrid"),style:{"--grid-rows":t,"--grid-spacing":`${n}px`}});return s.jsx("div",{...i,...r,children:c})});ge.__docgenInfo={description:"",methods:[],displayName:"LazyHGrid",props:{rows:{required:!1,tsType:{name:"number"},description:`Number of rows in the grid.

@default 2`},spacing:{required:!1,tsType:{name:"number"},description:`Spacing between grid items.

@default 0`}},composes:["IBaseComponent"]};function ye(l){const{data:e,keyExtractor:t,renderItem:n}=l;return s.jsx(s.Fragment,{children:e.map((o,i)=>s.jsx("div",{children:n(o,i)},t(o,i)))})}ye.__docgenInfo={description:"Renders an array of items using the provided render function.",methods:[],displayName:"ForEach",props:{data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"The array of data to iterate over."},keyExtractor:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T, index: number) => string | number",signature:{arguments:[{type:{name:"T"},name:"item"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}}},description:"Function to extract a unique key from each item."},renderItem:{required:!0,tsType:{name:"signature",type:"function",raw:"(item: T, index: number) => ReactNode",signature:{arguments:[{type:{name:"T"},name:"item"},{type:{name:"number"},name:"index"}],return:{name:"ReactNode"}}},description:"Function to render each item."}}};const ve=d.memo(function(e){const{commonProps:t,restProps:n,children:o}=g(e,{className:a("group")});return s.jsx("div",{...t,...n,children:o})});ve.__docgenInfo={description:"",methods:[],displayName:"Group"};const be=d.memo(function(e){const{label:t,...n}=e,{commonProps:o,restProps:i,children:r}=g(n,{className:a("groupbox")});return s.jsxs("div",{...o,...i,children:[t&&s.jsx("div",{className:a("groupbox-label"),children:t}),s.jsx("div",{className:a("groupbox-content"),children:r})]})});be.__docgenInfo={description:"",methods:[],displayName:"GroupBox",props:{label:{required:!1,tsType:{name:"string"},description:"Optional label for the group box."}},composes:["IBaseComponent"]};const xe=d.memo(function(e){const{commonProps:t,restProps:n,children:o}=g(e,{className:a("card")});return s.jsx("div",{...t,...n,children:o})});xe.__docgenInfo={description:"",methods:[],displayName:"Card"};const Te=d.memo(function(e){const{label:t,defaultExpanded:n=!1,expanded:o,onExpandedChange:i,...r}=e,[c,p]=d.useState(n),u=o!==void 0,m=u?o:c,f=()=>{const T=!m;u||p(T),i?.(T)},{commonProps:v,restProps:x,children:b}=g(r,{className:[a("disclosuregroup"),m&&a("disclosuregroup-expanded")]});return s.jsxs("div",{...v,...x,children:[s.jsxs("button",{type:"button",className:a("disclosuregroup-toggle"),onClick:f,"aria-expanded":m,children:[s.jsx("span",{className:a("disclosuregroup-label"),children:t}),s.jsx("span",{className:a("disclosuregroup-icon"),children:m?"▼":"▶"})]}),m&&s.jsx("div",{className:a("disclosuregroup-content"),children:b})]})});Te.__docgenInfo={description:"",methods:[],displayName:"DisclosureGroup",props:{label:{required:!0,tsType:{name:"string"},description:"The label for the disclosure toggle."},defaultExpanded:{required:!1,tsType:{name:"boolean"},description:`Whether the group is initially expanded.

@default false`},expanded:{required:!1,tsType:{name:"boolean"},description:`Controlled expanded state.
If provided, the component becomes controlled.`},onExpandedChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(expanded: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"expanded"}],return:{name:"void"}}},description:"Callback fired when the expanded state changes."}},composes:["IBaseComponent"]};const we=d.memo(function(e){const{title:t,message:n,isVisible:o,onDismiss:i,buttons:r=[{label:"OK",action:i}],...c}=e;if(!o)return null;const{commonProps:p,restProps:u}=g(c,{className:a("alert")});return s.jsxs(s.Fragment,{children:[s.jsx("div",{className:a("alert-backdrop"),onClick:i}),s.jsx("div",{...p,...u,children:s.jsxs("div",{className:a("alert-content"),children:[s.jsx("div",{className:a("alert-title"),children:t}),n&&s.jsx("div",{className:a("alert-message"),children:n}),s.jsx("div",{className:a("alert-actions"),children:r.map((m,f)=>s.jsx("button",{type:"button",className:[a("alert-button"),a(`alert-button-${m.style||"default"}`)].join(" "),onClick:m.action,children:m.label},f))})]})})]})});we.__docgenInfo={description:"",methods:[],displayName:"Alert",props:{title:{required:!0,tsType:{name:"string"},description:"The title of the alert."},message:{required:!1,tsType:{name:"string"},description:"The message body of the alert."},isVisible:{required:!0,tsType:{name:"boolean"},description:"Whether the alert is visible."},onDismiss:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback fired when the alert should be dismissed."},buttons:{required:!1,tsType:{name:"Array",elements:[{name:"IAlertButton"}],raw:"IAlertButton[]"},description:"The buttons to display in the alert."}},composes:["IBaseComponent"]};function Ne(l){const{children:e,...t}=l,n=d.useRef(null),[o,i]=d.useState({width:0,height:0,x:0,y:0});d.useEffect(()=>{const p=n.current;if(!p)return;const u=()=>{const f=p.getBoundingClientRect();i({width:f.width,height:f.height,x:f.x,y:f.y})};u();const m=new ResizeObserver(u);return m.observe(p),window.addEventListener("resize",u),window.addEventListener("scroll",u,{passive:!0}),()=>{m.disconnect(),window.removeEventListener("resize",u),window.removeEventListener("scroll",u)}},[]);const{commonProps:r,restProps:c}=g(t,{className:[a("geometry-reader")]});return s.jsx("div",{...r,...c,ref:n,children:e(o)})}Ne.__docgenInfo={description:`A view that provides geometry information to its children.

GeometryReader is similar to SwiftUI's GeometryReader, allowing you to
access the size and position of a container and use that information
to create responsive layouts.

@example
\`\`\`tsx
<GeometryReader>
  {(geometry) => (
    <VStack>
      <Text>Width: {geometry.width}px</Text>
      <Text>Height: {geometry.height}px</Text>
    </VStack>
  )}
</GeometryReader>
\`\`\`

@example
\`\`\`tsx
<GeometryReader>
  {(geometry) => {
    const isWide = geometry.width > 600
    return isWide ? <HStack>...</HStack> : <VStack>...</VStack>
  }}
</GeometryReader>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/geometryreader`,methods:[],displayName:"GeometryReader",props:{children:{required:!0,tsType:{name:"signature",type:"function",raw:"(geometry: IGeometry) => ReactNode",signature:{arguments:[{type:{name:"IGeometry"},name:"geometry"}],return:{name:"ReactNode"}}},description:`Render function that receives geometry information
@param geometry - Geometry information
@returns React node`}},composes:["Omit"]};const Ie=d.memo(function(e){const{onSubmit:t,isValid:n,...o}=e,i=p=>{p.preventDefault(),t&&t(p)},{commonProps:r,restProps:c}=g(o,{className:[a("form")]});return s.jsx("form",{...r,...c,onSubmit:i,noValidate:n===!1})});Ie.__docgenInfo={description:`A container for grouping form controls.

Form provides a semantic container for form elements and handles form submission.
It automatically prevents default form submission behavior and calls the onSubmit handler.

@example
\`\`\`tsx
<Form onSubmit={(e) => {
  e.preventDefault()
  console.log('Form submitted')
}}>
  <TextField placeholder="Name" />
  <Button type="submit">Submit</Button>
</Form>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/form`,methods:[],displayName:"Form",props:{onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: FormEvent<HTMLFormElement>) => void",signature:{arguments:[{type:{name:"FormEvent",elements:[{name:"HTMLFormElement"}],raw:"FormEvent<HTMLFormElement>"},name:"event"}],return:{name:"void"}}},description:`Form submission handler
@param event - Form submit event`},isValid:{required:!1,tsType:{name:"boolean"},description:"Form validation state"}},composes:["IBaseComponent"]};const Pe=d.memo(function(e){const{items:t,initialIndex:n=0,selectedIndex:o,onSelectionChange:i,tabBarPosition:r="bottom",...c}=e,[p,u]=d.useState(n),m=o!==void 0,f=m?o:p,v=y=>{m||u(y),i&&i(y)},{commonProps:x,restProps:b}=g(c,{className:[a("tab-view"),r==="top"?a("tab-view-top"):a("tab-view-bottom")]}),T=t[f]?.content;return s.jsxs("div",{...x,...b,children:[r==="top"&&s.jsx("div",{className:a("tab-bar"),children:t.map((y,h)=>s.jsxs("button",{className:`${a("tab-item")} ${f===h?a("tab-item-active"):""}`,onClick:()=>v(h),type:"button",children:[y.icon&&s.jsx("span",{className:a("tab-icon"),children:y.icon}),s.jsx("span",{className:a("tab-label"),children:y.label})]},y.id||h))}),s.jsx("div",{className:a("tab-content"),children:T}),r==="bottom"&&s.jsx("div",{className:a("tab-bar"),children:t.map((y,h)=>s.jsxs("button",{className:`${a("tab-item")} ${f===h?a("tab-item-active"):""}`,onClick:()=>v(h),type:"button",children:[y.icon&&s.jsx("span",{className:a("tab-icon"),children:y.icon}),s.jsx("span",{className:a("tab-label"),children:y.label})]},y.id||h))})]})});Pe.__docgenInfo={description:`A view that switches between multiple child views using interactive tabs.

TabView displays a tab bar with multiple tabs, each associated with a content view.
Users can switch between tabs by tapping the tab bar items.

@example
\`\`\`tsx
<TabView
  items={[
    { label: 'Home', content: <HomeView /> },
    { label: 'Settings', content: <SettingsView /> },
  ]}
/>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/tabview`,methods:[],displayName:"TabView",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"ITabItem"}],raw:"ITabItem[]"},description:"Tab items"},initialIndex:{required:!1,tsType:{name:"number"},description:`Initial selected tab index
@default 0`},selectedIndex:{required:!1,tsType:{name:"number"},description:"Selected tab index (controlled)"},onSelectionChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:`Tab selection change handler
@param index - Selected tab index`},tabBarPosition:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}]},description:`Tab bar position
@default 'bottom'`}},composes:["IBaseComponent"]};const Se=d.forwardRef(function(e,t){const{isPresented:n,onDismiss:o,presentationStyle:i="pageSheet",showDragIndicator:r=!0,children:c,...p}=e;if(!n)return null;const u=v=>{v.target===v.currentTarget&&o&&o()},{commonProps:m,restProps:f}=g(p,{className:[a("sheet"),a(`sheet-${i}`)]});return s.jsx("div",{className:a("sheet-backdrop"),onClick:u,children:s.jsxs("div",{...m,...f,ref:t,role:"dialog","aria-modal":"true",children:[r&&i!=="fullScreen"&&s.jsx("div",{className:a("sheet-drag-indicator")}),s.jsx("div",{className:a("sheet-content"),children:c})]})})});Se.__docgenInfo={description:`A view that presents content as a modal sheet.

Sheet is a modal presentation style that slides up from the bottom of the screen.
It's similar to ActionSheet but provides more presentation options.

@example
\`\`\`tsx
<Sheet isPresented={showSheet} onDismiss={() => setShowSheet(false)}>
  <VStack>
    <Text>Sheet Content</Text>
  </VStack>
</Sheet>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/sheet`,methods:[],displayName:"Sheet",props:{isPresented:{required:!0,tsType:{name:"boolean"},description:"Whether the sheet is presented"},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback when sheet is dismissed"},presentationStyle:{required:!1,tsType:{name:"union",raw:"'pageSheet' | 'formSheet' | 'fullScreen'",elements:[{name:"literal",value:"'pageSheet'"},{name:"literal",value:"'formSheet'"},{name:"literal",value:"'fullScreen'"}]},description:`Sheet presentation style
@default 'pageSheet'`},showDragIndicator:{required:!1,tsType:{name:"boolean"},description:`Whether to show drag indicator
@default true`}},composes:["IBaseComponent"]};function ke(l){const{items:e,trigger:t,placement:n="bottom",isOpen:o,onOpenChange:i,...r}=l,[c,p]=d.useState(!1),u=d.useRef(null),m=d.useRef(null),f=o!==void 0,v=f?o:c,x=()=>{const h=!v;f||p(h),i&&i(h)},b=h=>{h.disabled||(h.action&&h.action(),f||p(!1),i&&i(!1))};d.useEffect(()=>{if(!v)return;const h=N=>{u.current&&m.current&&!u.current.contains(N.target)&&!m.current.contains(N.target)&&(f||p(!1),i&&i(!1))};return document.addEventListener("mousedown",h),()=>{document.removeEventListener("mousedown",h)}},[v,f,i]);const{commonProps:T,restProps:y}=g(r,{className:[a("menu-container")]});return s.jsxs("div",{...T,...y,children:[s.jsx("div",{ref:m,onClick:x,className:a("menu-trigger"),children:t}),v&&s.jsx("div",{ref:u,className:`${a("menu")} ${a(`menu-${n}`)}`,children:e.map((h,N)=>s.jsxs("div",{className:`${a("menu-item")} ${h.disabled?a("menu-item-disabled"):""}`,onClick:()=>b(h),children:[h.icon&&s.jsx("span",{className:a("menu-item-icon"),children:h.icon}),s.jsx("span",{className:a("menu-item-label"),children:h.label}),h.submenu&&s.jsx("span",{className:a("menu-item-arrow"),children:"›"})]},h.id||N))})]})}ke.__docgenInfo={description:`A view that displays a menu of options.

Menu displays a dropdown menu when triggered, similar to SwiftUI's Menu.
It supports nested submenus and can be positioned relative to the trigger.

@example
\`\`\`tsx
<Menu
  trigger={<Button>Options</Button>}
  items={[
    { label: 'Edit', action: () => console.log('Edit') },
    { label: 'Delete', action: () => console.log('Delete') },
  ]}
/>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/menu`,methods:[],displayName:"Menu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"IMenuItem"}],raw:"IMenuItem[]"},description:"Menu items"},trigger:{required:!0,tsType:{name:"ReactNode"},description:"Trigger element"},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:`Menu placement
@default 'bottom'`},isOpen:{required:!1,tsType:{name:"boolean"},description:"Whether the menu is open (controlled)"},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:"Open state change handler"}},composes:["IBaseComponent"]};const Ce=d.memo(function(e){const{items:t,...n}=e,{commonProps:o,restProps:i}=g(n,{className:[a("toolbar")]}),r=t.reduce((c,p)=>{const u=p.placement||"automatic";return c[u]||(c[u]=[]),c[u].push(p),c},{});return s.jsx("div",{...o,...i,children:s.jsxs("div",{className:a("toolbar-content"),children:[r.cancellationAction&&s.jsx("div",{className:a("toolbar-group"),children:r.cancellationAction.map((c,p)=>s.jsx("div",{className:a("toolbar-item"),children:c.content},c.id||p))}),r.principal&&s.jsx("div",{className:`${a("toolbar-group")} ${a("toolbar-group-center")}`,children:r.principal.map((c,p)=>s.jsx("div",{className:a("toolbar-item"),children:c.content},c.id||p))}),r.automatic&&s.jsx("div",{className:a("toolbar-group"),children:r.automatic.map((c,p)=>s.jsx("div",{className:a("toolbar-item"),children:c.content},c.id||p))}),r.confirmationAction&&s.jsx("div",{className:`${a("toolbar-group")} ${a("toolbar-group-end")}`,children:r.confirmationAction.map((c,p)=>s.jsx("div",{className:a("toolbar-item"),children:c.content},c.id||p))}),r.destructiveAction&&s.jsx("div",{className:`${a("toolbar-group")} ${a("toolbar-group-end")}`,children:r.destructiveAction.map((c,p)=>s.jsx("div",{className:`${a("toolbar-item")} ${a("toolbar-item-destructive")}`,children:c.content},c.id||p))})]})})});Ce.__docgenInfo={description:`A view that displays toolbar items.

Toolbar provides a container for toolbar items, similar to SwiftUI's Toolbar.
Items can be placed in different positions based on their placement property.

@example
\`\`\`tsx
<Toolbar
  items={[
    { content: <Button>Cancel</Button>, placement: 'cancellationAction' },
    { content: <Text>Title</Text>, placement: 'principal' },
    { content: <Button>Done</Button>, placement: 'confirmationAction' },
  ]}
/>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/toolbar`,methods:[],displayName:"Toolbar",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"IToolbarItem"}],raw:"IToolbarItem[]"},description:"Toolbar items"}},composes:["IBaseComponent"]};const je=d.memo(function(e){const{children:t,variant:n="default",style:o,...i}=e,{commonProps:r,restProps:c}=g({...i,style:o},{className:[a("badge"),a(`badge-${n}`)]});return s.jsx("div",{...r,...c,children:t})});je.__docgenInfo={description:`A view that displays a badge.

Badge is used to display small pieces of information, such as notification counts
or status indicators, similar to SwiftUI's Badge.

@example
\`\`\`tsx
<Badge>5</Badge>
<Badge style="error">New</Badge>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/badge`,methods:[],displayName:"Badge",props:{children:{required:!0,tsType:{name:"ReactNode"},description:"Badge content (text or number)"},variant:{required:!1,tsType:{name:"union",raw:"'default' | 'primary' | 'success' | 'warning' | 'error'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:`Badge style variant
@default 'default'`},style:{required:!1,tsType:{name:"IBaseComponent['style']",raw:"IBaseComponent['style']"},description:"Custom CSS style (overrides variant)"}},composes:["Omit"]};const Re=d.memo(function(e){const{value:t="",onChange:n,placeholder:o,minLines:i=1,maxLines:r,disabled:c=!1,...p}=e,u=x=>{n&&n(x.target.value)},{commonProps:m,restProps:f}=g(p,{className:[a("text-editor")]}),v=r?Math.min(Math.max(t.split(`
`).length,i),r):Math.max(t.split(`
`).length,i);return s.jsx("textarea",{...m,...f,value:t,onChange:u,placeholder:o,rows:v,disabled:c})});Re.__docgenInfo={description:`A view that displays and edits multiline text.

TextEditor is a multiline text input component, similar to SwiftUI's TextEditor.
It provides a textarea-like interface for editing longer text content.

@example
\`\`\`tsx
<TextEditor
  value={text}
  onChange={setText}
  placeholder="Enter text..."
/>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/texteditor`,methods:[],displayName:"TextEditor",props:{value:{required:!1,tsType:{name:"string"},description:"Editor value"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Value change handler"},placeholder:{required:!1,tsType:{name:"string"},description:"Placeholder text"},minLines:{required:!1,tsType:{name:"number"},description:`Minimum number of lines
@default 1`},maxLines:{required:!1,tsType:{name:"number"},description:"Maximum number of lines"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the editor is disabled"}},composes:["Omit"]};const _e=d.memo(function(e){const{edges:t=["top","bottom","left","right"],children:n,...o}=e,{commonProps:i,restProps:r}=g(o,{className:[a("safe-area"),...t.map(c=>a(`safe-area-${c}`))]});return s.jsx("div",{...i,...r,children:n})});_e.__docgenInfo={description:`A view that insets its content to respect safe area boundaries.

SafeArea ensures that content is not obscured by system UI elements,
such as notches, status bars, or home indicators, similar to SwiftUI's SafeArea.

@example
\`\`\`tsx
<SafeArea>
  <Text>Content that respects safe areas</Text>
</SafeArea>
\`\`\`

@see https://developer.apple.com/documentation/swiftui/safearea`,methods:[],displayName:"SafeArea",props:{edges:{required:!1,tsType:{name:"Array",elements:[{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]}],raw:"Array<'top' | 'bottom' | 'left' | 'right'>"},description:`Safe area edges to apply
@default ['top', 'bottom', 'left', 'right']`}},composes:["IBaseComponent"]};const Ee=d.memo(function(e){const{color:t,...n}=e,{commonProps:o,restProps:i}=g(n,{className:[a("color")],style:{backgroundColor:t,...n.style}});return s.jsx("div",{...o,...i})});Ee.__docgenInfo={description:`A view that displays a solid color.

Color is a view that displays a solid color, similar to SwiftUI's Color.
It can be used as a background or foreground color.

@example
\`\`\`tsx
<Color color="#007AFF" />
<Color color="rgba(0, 122, 255, 0.5)" />
\`\`\`

@see https://developer.apple.com/documentation/swiftui/color`,methods:[],displayName:"Color",props:{color:{required:!0,tsType:{name:"string"},description:"Color value (CSS color string)"}},composes:["IBaseComponent"]};const Be=d.memo(function(e){const{fill:t,stroke:n,strokeWidth:o=0,...i}=e,{commonProps:r,restProps:c}=g(i,{className:[a("shape"),a("shape-rectangle")],style:{backgroundColor:t,borderColor:n,borderWidth:o>0?`${o}px`:void 0,borderStyle:o>0?"solid":void 0,...i.style}});return s.jsx("div",{...r,...c})});Be.__docgenInfo={description:`A rectangular shape.

Rectangle displays a rectangular shape, similar to SwiftUI's Rectangle.

@example
\`\`\`tsx
<Rectangle fill="#007AFF" style={{ width: 100, height: 50 }} />
\`\`\`

@see https://developer.apple.com/documentation/swiftui/rectangle`,methods:[],displayName:"Rectangle",props:{fill:{required:!1,tsType:{name:"string"},description:"Fill color"},stroke:{required:!1,tsType:{name:"string"},description:"Stroke color"},strokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke width"}},composes:["IBaseComponent"]};const qe=d.memo(function(e){const{fill:t,stroke:n,strokeWidth:o=0,cornerRadius:i=8,...r}=e,{commonProps:c,restProps:p}=g(r,{className:[a("shape"),a("shape-rounded-rectangle")],style:{backgroundColor:t,borderColor:n,borderWidth:o>0?`${o}px`:void 0,borderStyle:o>0?"solid":void 0,borderRadius:`${i}px`,...r.style}});return s.jsx("div",{...c,...p})});qe.__docgenInfo={description:`A rectangular shape with rounded corners.

RoundedRectangle displays a rectangular shape with rounded corners, similar to SwiftUI's RoundedRectangle.

@example
\`\`\`tsx
<RoundedRectangle fill="#007AFF" cornerRadius={12} style={{ width: 200, height: 100 }} />
\`\`\`

@see https://developer.apple.com/documentation/swiftui/roundedrectangle`,methods:[],displayName:"RoundedRectangle",props:{fill:{required:!1,tsType:{name:"string"},description:"Fill color"},stroke:{required:!1,tsType:{name:"string"},description:"Stroke color"},strokeWidth:{required:!1,tsType:{name:"number"},description:"Stroke width"},cornerRadius:{required:!1,tsType:{name:"number"},description:`Corner radius
@default 8`}},composes:["IBaseComponent"]};export{we as A,L as B,xe as C,Te as D,ye as F,Ne as G,ce as I,ge as L,ke as M,D as N,Be as R,k as S,Pe as T,X as Z,je as a,Ee as b,Q as c,Ie as d,ve as e,be as f,he as g,J as h,fe as i,ue as j,de as k,pe as l,me as m,re as n,le as o,$ as p,_e as q,qe as r,Se as s,Re as t,Ce as u};
