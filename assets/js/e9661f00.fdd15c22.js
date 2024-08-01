"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6169],{78290:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>r});var t=n(85893),i=n(11151);const a={title:"Fee Messages",sidebar_label:"Fee Messages",sidebar_position:3,slug:"/middleware/ics29-fee/msgs"},o="Fee messages",c={id:"middleware/ics29-fee/msgs",title:"Fee Messages",description:"Learn about the different ways to pay for fees, how the fees are paid out and what happens when not enough escrowed fees are available for payout",source:"@site/docs/04-middleware/01-ics29-fee/03-msgs.md",sourceDirName:"04-middleware/01-ics29-fee",slug:"/middleware/ics29-fee/msgs",permalink:"/main/middleware/ics29-fee/msgs",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Fee Messages",sidebar_label:"Fee Messages",sidebar_position:3,slug:"/middleware/ics29-fee/msgs"},sidebar:"defaultSidebar",previous:{title:"Integration",permalink:"/main/middleware/ics29-fee/integration"},next:{title:"Fee Distribution",permalink:"/main/middleware/ics29-fee/fee-distribution"}},d={},r=[{value:"Escrowing fees",id:"escrowing-fees",level:2},{value:"<code>MsgPayPacketFee</code>",id:"msgpaypacketfee",level:3},{value:"<code>MsgPayPacketFeeAsync</code>",id:"msgpaypacketfeeasync",level:3},{value:"Paying out the escrowed fees",id:"paying-out-the-escrowed-fees",level:2},{value:"A locked fee middleware module",id:"a-locked-fee-middleware-module",level:2}];function l(e){const s={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"fee-messages",children:"Fee messages"}),"\n",(0,t.jsx)(s.admonition,{title:"Synopsis",type:"note",children:(0,t.jsx)(s.p,{children:"Learn about the different ways to pay for fees, how the fees are paid out and what happens when not enough escrowed fees are available for payout"})}),"\n",(0,t.jsx)(s.h2,{id:"escrowing-fees",children:"Escrowing fees"}),"\n",(0,t.jsx)(s.p,{children:"The fee middleware module exposes two different ways to pay fees for relaying IBC packets:"}),"\n",(0,t.jsx)(s.h3,{id:"msgpaypacketfee",children:(0,t.jsx)(s.code,{children:"MsgPayPacketFee"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"MsgPayPacketFee"})," enables the escrowing of fees for a packet at the next sequence send and should be combined into one ",(0,t.jsx)(s.code,{children:"MultiMsgTx"})," with the message that will be paid for. Note that the ",(0,t.jsx)(s.code,{children:"Relayers"})," field has been set up to allow for an optional whitelist of relayers permitted to receive this fee, however, this feature has not yet been enabled at this time."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-go",children:"type MsgPayPacketFee struct{\n  // fee encapsulates the recv, ack and timeout fees associated with an IBC packet\n  Fee                 Fee\n  // the source port unique identifier\n  SourcePortId        string\n  // the source channel unique identifier\n  SourceChannelId     string\n  // account address to refund fee if necessary\n  Signer              string\n  // optional list of relayers permitted to the receive packet fee\n  Relayers            []string\n}\n"})}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.code,{children:"Fee"})," message contained in this synchronous fee payment method configures different fees which will be paid out for ",(0,t.jsx)(s.code,{children:"MsgRecvPacket"}),", ",(0,t.jsx)(s.code,{children:"MsgAcknowledgement"}),", and ",(0,t.jsx)(s.code,{children:"MsgTimeout"}),"/",(0,t.jsx)(s.code,{children:"MsgTimeoutOnClose"}),".\nThe amount of fees escrowed in total is the denomwise maximum of ",(0,t.jsx)(s.code,{children:"RecvFee + AckFee"})," and ",(0,t.jsx)(s.code,{children:"TimeoutFee"}),". This is because we do not know whether the packet will be successfully received and acknowledged or whether it will timeout."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-go",children:"type Fee struct {\n  RecvFee             types.Coins\n  AckFee              types.Coins\n  TimeoutFee          types.Coins\n}\n"})}),"\n",(0,t.jsxs)(s.p,{children:["The diagram below shows the ",(0,t.jsx)(s.code,{children:"MultiMsgTx"})," with the ",(0,t.jsx)(s.code,{children:"MsgTransfer"})," coming from a token transfer message, along with ",(0,t.jsx)(s.code,{children:"MsgPayPacketFee"}),"."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"msgpaypacket.png",src:n(4093).Z+"",width:"1400",height:"897"})}),"\n",(0,t.jsx)(s.h3,{id:"msgpaypacketfeeasync",children:(0,t.jsx)(s.code,{children:"MsgPayPacketFeeAsync"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.code,{children:"MsgPayPacketFeeAsync"})," enables the asynchronous escrowing of fees for a specified packet. Note that a packet can be 'topped up' multiple times with additional fees of any coin denomination by broadcasting multiple ",(0,t.jsx)(s.code,{children:"MsgPayPacketFeeAsync"})," messages."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-go",children:"type MsgPayPacketFeeAsync struct {\n  // unique packet identifier comprised of the channel ID, port ID and sequence\n  PacketId            channeltypes.PacketId\n  // the packet fee associated with a particular IBC packet\n  PacketFee           PacketFee\n}\n"})}),"\n",(0,t.jsxs)(s.p,{children:["where the ",(0,t.jsx)(s.code,{children:"PacketFee"})," also specifies the ",(0,t.jsx)(s.code,{children:"Fee"})," to be paid as well as the refund address for fees which are not paid out"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-go",children:"type PacketFee struct {\n  Fee                    Fee\n  RefundAddress          string\n  Relayers               []string\n}\n"})}),"\n",(0,t.jsxs)(s.p,{children:["The diagram below shows how multiple ",(0,t.jsx)(s.code,{children:"MsgPayPacketFeeAsync"})," can be broadcasted asynchronously. Escrowing of the fee associated with a packet can be carried out by any party because ICS-29 does not dictate a particular fee payer. In fact, chains can choose to simply not expose this fee payment to end users at all and rely on a different module account or even the community pool as the source of relayer incentives."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"paypacketfeeasync.png",src:n(876).Z+"",width:"1400",height:"897"})}),"\n",(0,t.jsxs)(s.p,{children:["Please see our ",(0,t.jsx)(s.a,{href:"https://github.com/cosmos/ibc-go/wiki/Fee-enabled-fungible-token-transfers",children:"wiki"})," for example flows on how to use these messages to incentivise a token transfer channel using a CLI."]}),"\n",(0,t.jsx)(s.h2,{id:"paying-out-the-escrowed-fees",children:"Paying out the escrowed fees"}),"\n",(0,t.jsxs)(s.p,{children:["Following diagram takes a look at the packet flow for an incentivized token transfer and investigates the several scenario's for paying out the escrowed fees. We assume that the relayers have registered their counterparty address, detailed in the ",(0,t.jsx)(s.a,{href:"/main/middleware/ics29-fee/fee-distribution",children:"Fee distribution section"}),"."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"feeflow.png",src:n(80456).Z+"",width:"1400",height:"1932"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["In the case of a successful transaction, ",(0,t.jsx)(s.code,{children:"RecvFee"})," will be paid out to the designated counterparty payee address which has been registered on the receiver chain and sent back with the ",(0,t.jsx)(s.code,{children:"MsgAcknowledgement"}),", ",(0,t.jsx)(s.code,{children:"AckFee"})," will be paid out to the relayer address which has submitted the ",(0,t.jsx)(s.code,{children:"MsgAcknowledgement"})," on the sending chain (or the registered payee in case one has been registered for the relayer address), and the remaining fees (if any) will be reimbursed to the account which escrowed the fee. (The reimbursed amount equals ",(0,t.jsx)(s.code,{children:"EscrowedAmount - (RecvFee + AckFee)"}),")."]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\n",(0,t.jsxs)(s.p,{children:["In case of a timeout transaction, the ",(0,t.jsx)(s.code,{children:"TimeoutFee"})," will be paid to the ",(0,t.jsx)(s.code,{children:"Timeout Relayer"})," (who submits the timeout message to the source chain), and the remaining fees (if any) will be reimbursed to the account which escrowed the fee. (The reimbursed amount equals ",(0,t.jsx)(s.code,{children:"EscrowedAmount - (TimeoutFee)"}),")."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:["Please note that fee payments are built on the assumption that sender chains are the source of incentives \u2014 the chain that sends the packets is the same chain where fee payments will occur -- please see the ",(0,t.jsx)(s.a,{href:"/main/middleware/ics29-fee/fee-distribution",children:"Fee distribution section"})," to understand the flow for registering payee and counterparty payee (fee receiving) addresses."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"a-locked-fee-middleware-module",children:"A locked fee middleware module"}),"\n",(0,t.jsxs)(s.p,{children:["The fee middleware module can become locked if the situation arises that the escrow account for the fees does not have sufficient funds to pay out the fees which have been escrowed for each packet. ",(0,t.jsx)(s.em,{children:"This situation indicates a severe bug."})," In this case, the fee module will be locked until manual intervention fixes the issue."]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsx)(s.p,{children:"A locked fee module will simply skip fee logic and continue on to the underlying packet flow. A channel with a locked fee module will temporarily function as a fee disabled channel, and the locking of a fee module will not affect the continued flow of packets over the channel."}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},80456:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/feeflow-4c820ce13f8cbae511d4d03816fb3456.png"},4093:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/msgpaypacket-a5a0b058e23c59dec9015dc1d4873256.png"},876:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/paypacketfeeasync-bbad18cfb86a8132f357d3750bdad9a3.png"},11151:(e,s,n)=>{n.d(s,{Z:()=>c,a:()=>o});var t=n(67294);const i={},a=t.createContext(i);function o(e){const s=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(a.Provider,{value:s},e.children)}}}]);