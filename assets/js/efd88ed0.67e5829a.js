"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3182],{68495:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>d,toc:()=>l});var a=n(85893),i=n(11151);const r={title:"Integrating IBC middleware into a chain",sidebar_label:"Integrating IBC middleware into a chain",sidebar_position:2,slug:"/ibc/middleware/integration"},o="Integrating IBC middleware into a chain",d={id:"ibc/middleware/integration",title:"Integrating IBC middleware into a chain",description:"Learn how to integrate IBC middleware(s) with a base application to your chain. The following document only applies for Cosmos SDK chains.",source:"@site/versioned_docs/version-v5.4.x/01-ibc/04-middleware/02-integration.md",sourceDirName:"01-ibc/04-middleware",slug:"/ibc/middleware/integration",permalink:"/v5/ibc/middleware/integration",draft:!1,unlisted:!1,tags:[],version:"v5.4.x",sidebarPosition:2,frontMatter:{title:"Integrating IBC middleware into a chain",sidebar_label:"Integrating IBC middleware into a chain",sidebar_position:2,slug:"/ibc/middleware/integration"},sidebar:"defaultSidebar",previous:{title:"IBC middleware",permalink:"/v5/ibc/middleware/develop"},next:{title:"intro",permalink:"/v5/ibc/upgrades/intro"}},s={},l=[{value:"Example integration",id:"example-integration",level:2}];function c(e){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"integrating-ibc-middleware-into-a-chain",children:"Integrating IBC middleware into a chain"}),"\n",(0,a.jsx)(t.p,{children:"Learn how to integrate IBC middleware(s) with a base application to your chain. The following document only applies for Cosmos SDK chains."}),"\n",(0,a.jsxs)(t.p,{children:["If the middleware is maintaining its own state and/or processing SDK messages, then it should create and register its SDK module ",(0,a.jsx)(t.strong,{children:"only once"})," with the module manager in ",(0,a.jsx)(t.code,{children:"app.go"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"All middleware must be connected to the IBC router and wrap over an underlying base IBC application. An IBC application may be wrapped by many layers of middleware, only the top layer middleware should be hooked to the IBC router, with all underlying middlewares and application getting wrapped by it."}),"\n",(0,a.jsxs)(t.p,{children:["The order of middleware ",(0,a.jsx)(t.strong,{children:"matters"}),", function calls from IBC to the application travel from top-level middleware to the bottom middleware and then to the application. Function calls from the application to IBC goes through the bottom middleware in order to the top middleware and then to core IBC handlers. Thus the same set of middleware put in different orders may produce different effects."]}),"\n",(0,a.jsx)(t.h2,{id:"example-integration",children:"Example integration"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-go",children:'// app.go\n\n// middleware 1 and middleware 3 are stateful middleware, \n// perhaps implementing separate sdk.Msg and Handlers\nmw1Keeper := mw1.NewKeeper(storeKey1)\nmw3Keeper := mw3.NewKeeper(storeKey3)\n\n// Only create App Module **once** and register in app module\n// if the module maintains independent state and/or processes sdk.Msgs\napp.moduleManager = module.NewManager(\n    ...\n    mw1.NewAppModule(mw1Keeper),\n    mw3.NewAppModule(mw3Keeper),\n    transfer.NewAppModule(transferKeeper),\n    custom.NewAppModule(customKeeper)\n)\n\nmw1IBCModule := mw1.NewIBCModule(mw1Keeper)\nmw2IBCModule := mw2.NewIBCModule() // middleware2 is stateless middleware\nmw3IBCModule := mw3.NewIBCModule(mw3Keeper)\n\nscopedKeeperTransfer := capabilityKeeper.NewScopedKeeper("transfer")\nscopedKeeperCustom1 := capabilityKeeper.NewScopedKeeper("custom1")\nscopedKeeperCustom2 := capabilityKeeper.NewScopedKeeper("custom2")\n\n// NOTE: IBC Modules may be initialized any number of times provided they use a separate\n// scopedKeeper and underlying port.\n\n// initialize base IBC applications\n// if you want to create two different stacks with the same base application,\n// they must be given different scopedKeepers and assigned different ports.\ntransferIBCModule := transfer.NewIBCModule(transferKeeper)\ncustomIBCModule1 := custom.NewIBCModule(customKeeper, "portCustom1")\ncustomIBCModule2 := custom.NewIBCModule(customKeeper, "portCustom2")\n\n// create IBC stacks by combining middleware with base application\n// NOTE: since middleware2 is stateless it does not require a Keeper\n// stack 1 contains mw1 -> mw3 -> transfer\nstack1 := mw1.NewIBCMiddleware(mw3.NewIBCMiddleware(transferIBCModule, mw3Keeper), mw1Keeper)\n// stack 2 contains mw3 -> mw2 -> custom1\nstack2 := mw3.NewIBCMiddleware(mw2.NewIBCMiddleware(customIBCModule1), mw3Keeper)\n// stack 3 contains mw2 -> mw1 -> custom2\nstack3 := mw2.NewIBCMiddleware(mw1.NewIBCMiddleware(customIBCModule2, mw1Keeper))\n\n// associate each stack with the moduleName provided by the underlying scopedKeeper\nibcRouter := porttypes.NewRouter()\nibcRouter.AddRoute("transfer", stack1)\nibcRouter.AddRoute("custom1", stack2)\nibcRouter.AddRoute("custom2", stack3)\napp.IBCKeeper.SetRouter(ibcRouter)\n'})})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>d,a:()=>o});var a=n(67294);const i={},r=a.createContext(i);function o(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);