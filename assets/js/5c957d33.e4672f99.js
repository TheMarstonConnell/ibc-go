"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6832],{73002:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>l,frontMatter:()=>a,metadata:()=>c,toc:()=>h});var i=s(85893),n=s(11151);const a={title:"Contracts",sidebar_label:"Contracts",sidebar_position:7,slug:"/ibc/light-clients/wasm/contracts"},r="Contracts",c={id:"light-clients/wasm/contracts",title:"Contracts",description:"Learn about the expected behaviour of Wasm light client contracts and the between with 08-wasm.",source:"@site/versioned_docs/version-v8.4.x/03-light-clients/04-wasm/07-contracts.md",sourceDirName:"03-light-clients/04-wasm",slug:"/ibc/light-clients/wasm/contracts",permalink:"/v8/ibc/light-clients/wasm/contracts",draft:!1,unlisted:!1,tags:[],version:"v8.4.x",sidebarPosition:7,frontMatter:{title:"Contracts",sidebar_label:"Contracts",sidebar_position:7,slug:"/ibc/light-clients/wasm/contracts"},sidebar:"defaultSidebar",previous:{title:"Events",permalink:"/v8/ibc/light-clients/wasm/events"},next:{title:"Client",permalink:"/v8/ibc/light-clients/wasm/client"}},o={},h=[{value:"API",id:"api",level:2},{value:"<code>InstantiateMessage</code>",id:"instantiatemessage",level:2},{value:"<code>QueryMsg</code>",id:"querymsg",level:2},{value:"<code>SudoMsg</code>",id:"sudomsg",level:2},{value:"Migration",id:"migration",level:3},{value:"Expected behaviour",id:"expected-behaviour",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"contracts",children:"Contracts"}),"\n",(0,i.jsxs)(t.p,{children:["Learn about the expected behaviour of Wasm light client contracts and the between with ",(0,i.jsx)(t.code,{children:"08-wasm"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"api",children:"API"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"08-wasm"})," light client proxy performs calls to the Wasm light client via the Wasm VM. The calls require as input JSON-encoded payload messages that fall in the three categories described in the next sections."]}),"\n",(0,i.jsx)(t.h2,{id:"instantiatemessage",children:(0,i.jsx)(t.code,{children:"InstantiateMessage"})}),"\n",(0,i.jsxs)(t.p,{children:["This is the message sent to the contract's ",(0,i.jsx)(t.code,{children:"instantiate"})," entry point. It contains the bytes of the protobuf-encoded client and consensus states of the underlying light client, both provided in ",(0,i.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/blob/v8.0.0/proto/ibc/core/client/v1/tx.proto#L40-L52",children:(0,i.jsx)(t.code,{children:"MsgCreateClient"})}),". Please note that the bytes contained within the JSON message are represented as base64-encoded strings."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:'type InstantiateMessage struct {\n\tClientState    []byte `json:"client_state"`\n\tConsensusState []byte `json:"consensus_state"`\n\tChecksum       []byte `json:"checksum"\n}\n'})}),"\n",(0,i.jsx)(t.p,{children:"The Wasm light client contract is expected to store the client and consensus state in the corresponding keys of the client-prefixed store."}),"\n",(0,i.jsx)(t.h2,{id:"querymsg",children:(0,i.jsx)(t.code,{children:"QueryMsg"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"QueryMsg"})," acts as a discriminated union type that is used to encode the messages that are sent to the contract's ",(0,i.jsx)(t.code,{children:"query"})," entry point. Only one of the fields of the type should be set at a time, so that the other fields are omitted in the encoded JSON and the payload can be correctly translated to the corresponding element of the enumeration in Rust."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:'type QueryMsg struct {\n  Status               *StatusMsg               `json:"status,omitempty"`\n  ExportMetadata       *ExportMetadataMsg       `json:"export_metadata,omitempty"`\n  TimestampAtHeight    *TimestampAtHeightMsg    `json:"timestamp_at_height,omitempty"`\n  VerifyClientMessage  *VerifyClientMessageMsg  `json:"verify_client_message,omitempty"`\n  CheckForMisbehaviour *CheckForMisbehaviourMsg `json:"check_for_misbehaviour,omitempty"`\n}\n'})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-rust",children:"#[cw_serde]\npub enum QueryMsg {\n  Status(StatusMsg),\n  ExportMetadata(ExportMetadataMsg),\n  TimestampAtHeight(TimestampAtHeightMsg),\n  VerifyClientMessage(VerifyClientMessageRaw),\n  CheckForMisbehaviour(CheckForMisbehaviourMsgRaw),\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["To learn what it is expected from the Wasm light client contract when processing each message, please read the corresponding section of the ",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/overview",children:"Light client developer guide"}),":"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"StatusMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/client-state#status-method",children:[(0,i.jsx)(t.code,{children:"Status"})," method"]}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"ExportMetadataMsg"}),", see the section ",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/genesis#genesis-metadata",children:"Genesis metadata"}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"TimestampAtHeightMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/client-state#gettimestampatheight-method",children:[(0,i.jsx)(t.code,{children:"GetTimestampAtHeight"})," method"]}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"VerifyClientMessageMsg"}),", see the section ",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/updates-and-misbehaviour#verifyclientmessage",children:(0,i.jsx)(t.code,{children:"VerifyClientMessage"})}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"CheckForMisbehaviourMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/client-state#checkformisbehaviour-method",children:[(0,i.jsx)(t.code,{children:"CheckForMisbehaviour"})," method"]}),"."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"sudomsg",children:(0,i.jsx)(t.code,{children:"SudoMsg"})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:"SudoMsg"})," acts as a discriminated union type that is used to encode the messages that are sent to the contract's ",(0,i.jsx)(t.code,{children:"sudo"})," entry point. Only one of the fields of the type should be set at a time, so that the other fields are omitted in the encoded JSON and the payload can be correctly translated to the corresponding element of the enumeration in Rust."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"sudo"})," entry point is able to perform state-changing writes in the client-prefixed store."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:'type SudoMsg struct {\n  UpdateState                 *UpdateStateMsg                 `json:"update_state,omitempty"`\n  UpdateStateOnMisbehaviour   *UpdateStateOnMisbehaviourMsg   `json:"update_state_on_misbehaviour,omitempty"`\n  VerifyUpgradeAndUpdateState *VerifyUpgradeAndUpdateStateMsg `json:"verify_upgrade_and_update_state,omitempty"`\n  VerifyMembership            *VerifyMembershipMsg            `json:"verify_membership,omitempty"`\n  VerifyNonMembership         *VerifyNonMembershipMsg         `json:"verify_non_membership,omitempty"`\n  MigrateClientStore          *MigrateClientStoreMsg          `json:"migrate_client_store,omitempty"`\n}\n'})}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-rust",children:"#[cw_serde]\npub enum SudoMsg {\n  UpdateState(UpdateStateMsgRaw),\n  UpdateStateOnMisbehaviour(UpdateStateOnMisbehaviourMsgRaw),\n  VerifyUpgradeAndUpdateState(VerifyUpgradeAndUpdateStateMsgRaw),\n  VerifyMembership(VerifyMembershipMsgRaw),\n  VerifyNonMembership(VerifyNonMembershipMsgRaw),\n  MigrateClientStore(MigrateClientStoreMsgRaw),\n}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["To learn what it is expected from the Wasm light client contract when processing each message, please read the corresponding section of the ",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/overview",children:"Light client developer guide"}),":"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"UpdateStateMsg"}),", see the section ",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/updates-and-misbehaviour#updatestate",children:(0,i.jsx)(t.code,{children:"UpdateState"})}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"UpdateStateOnMisbehaviourMsg"}),", see the section ",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/updates-and-misbehaviour#updatestateonmisbehaviour",children:(0,i.jsx)(t.code,{children:"UpdateStateOnMisbehaviour"})}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"VerifyUpgradeAndUpdateStateMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/upgrades#implementing-verifyupgradeandupdatestate",children:[(0,i.jsx)(t.code,{children:"GetTimestampAtHeight"})," method"]}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"VerifyMembershipMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/client-state#verifymembership-method",children:[(0,i.jsx)(t.code,{children:"VerifyMembership"})," method"]}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"VerifyNonMembershipMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/client-state#verifynonmembership-method",children:[(0,i.jsx)(t.code,{children:"VerifyNonMembership"})," method"]}),"."]}),"\n",(0,i.jsxs)(t.li,{children:["For ",(0,i.jsx)(t.code,{children:"MigrateClientStoreMsg"}),", see the section ",(0,i.jsxs)(t.a,{href:"/v8/ibc/light-clients/proposals#implementing-checksubstituteandupdatestate",children:["Implementing ",(0,i.jsx)(t.code,{children:"CheckSubstituteAndUpdateState"})]}),"."]}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"migration",children:"Migration"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"08-wasm"})," proxy light client exposes the ",(0,i.jsx)(t.code,{children:"MigrateContract"})," RPC endpoint that can be used to migrate a given Wasm light client contract (specified by the client identifier) to a new Wasm byte code (specified by the hash of the byte code). The expected use case for this RPC endpoint is to enable contracts to migrate to new byte code in case the current byte code is found to have a bug or vulnerability. The Wasm byte code that contracts are migrated have to be uploaded beforehand using ",(0,i.jsx)(t.code,{children:"MsgStoreCode"})," and must implement the ",(0,i.jsx)(t.code,{children:"migrate"})," entry point. See section",(0,i.jsx)(t.a,{href:"/v8/ibc/light-clients/wasm/messages#msgmigratecontract",children:(0,i.jsx)(t.code,{children:"MsgMigrateContract"})})," for information about the request message for this RPC endpoint."]}),"\n",(0,i.jsx)(t.h2,{id:"expected-behaviour",children:"Expected behaviour"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"08-wasm"})," proxy light client modules expects the following behaviour from the Wasm light client contracts when executing messages that perform state-changing writes:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"The contract must not delete the client state from the store."}),"\n",(0,i.jsx)(t.li,{children:"The contract must not change the client state to a client state of another type."}),"\n",(0,i.jsx)(t.li,{children:"The contract must not change the checksum in the client state."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["Any violation of these rules will result in an error returned from ",(0,i.jsx)(t.code,{children:"08-wasm"})," that will abort the transaction."]})]})}function l(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,t,s)=>{s.d(t,{Z:()=>c,a:()=>r});var i=s(67294);const n={},a=i.createContext(n);function r(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);