import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as v}from"./iframe-DOh0KEBf.js";import{s as g,p as s}from"./index-WCh9hO2n.js";const x=v.memo(function(t){const{value:a,onValueChange:i,min:r=0,max:n=100,step:l=1,disabled:o=!1,...d}=t,{commonProps:m,restProps:u}=g(d,{className:s("slider")}),p=f=>{const h=parseFloat(f.target.value);i(h)},c=(a-r)/(n-r)*100;return e.jsxs("div",{...m,...u,children:[e.jsx("div",{className:s("slider-track"),children:e.jsx("div",{className:s("slider-fill"),style:{width:`${c}%`}})}),e.jsx("input",{type:"range",min:r,max:n,step:l,value:a,onChange:p,disabled:o,className:s("slider-input")})]})});x.__docgenInfo={description:"",methods:[],displayName:"Slider",props:{value:{required:!0,tsType:{name:"number"},description:"The current value of the slider."},onValueChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: number) => void",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"void"}}},description:"Callback fired when the value changes."},min:{required:!1,tsType:{name:"number"},description:`The minimum value of the slider.

@default 0`},max:{required:!1,tsType:{name:"number"},description:`The maximum value of the slider.

@default 100`},step:{required:!1,tsType:{name:"number"},description:`The step increment for the slider.

@default 1`},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether the slider is disabled.

@default false`}},composes:["IBaseComponent"]};export{x as S};
