"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4562],{17827:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var n=a(85893),c=a(11151);const r={},i="ADR 008: Callback to IBC Actors",l={id:"adr-008-app-caller-cbs",title:"ADR 008: Callback to IBC Actors",description:"Changelog",source:"@site/architecture/adr-008-app-caller-cbs.md",sourceDirName:".",slug:"/adr-008-app-caller-cbs",permalink:"/architecture/adr-008-app-caller-cbs",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"ADR 007: Solo machine sign bytes",permalink:"/architecture/adr-007-solomachine-signbytes"},next:{title:"ADR 009: ICS27 message server addition",permalink:"/architecture/adr-009-v6-ics27-msgserver"}},s={},o=[{value:"Changelog",id:"changelog",level:2},{value:"Status",id:"status",level:2},{value:"Context",id:"context",level:2},{value:"Definitions",id:"definitions",level:2},{value:"Decision",id:"decision",level:2},{value:"Data structures",id:"data-structures",level:2},{value:"Callback Middleware",id:"callback-middleware",level:3},{value:"Callback-Compatible IBC Application",id:"callback-compatible-ibc-application",level:3},{value:"ContractKeeper",id:"contractkeeper",level:2},{value:"PacketCallbacks",id:"packetcallbacks",level:3},{value:"Consequences",id:"consequences",level:2},{value:"Positive",id:"positive",level:3},{value:"Negative",id:"negative",level:3},{value:"Neutral",id:"neutral",level:3},{value:"References",id:"references",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"adr-008-callback-to-ibc-actors",children:"ADR 008: Callback to IBC Actors"}),"\n",(0,n.jsx)(t.h2,{id:"changelog",children:"Changelog"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"2022-08-10: Initial Draft"}),"\n",(0,n.jsx)(t.li,{children:"2023-03-22: Merged"}),"\n",(0,n.jsx)(t.li,{children:"2023-09-13: Updated with decisions made in implementation"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"status",children:"Status"}),"\n",(0,n.jsx)(t.p,{children:"Accepted, middleware implemented"}),"\n",(0,n.jsx)(t.h2,{id:"context",children:"Context"}),"\n",(0,n.jsx)(t.p,{children:"IBC was designed with callbacks between core IBC and IBC applications. IBC apps would send a packet to core IBC. When the result of the packet lifecycle eventually resolved into either an acknowledgement or a timeout, core IBC called a callback on the IBC application so that the IBC application could take action on the basis of the result (e.g. unescrow tokens for ICS-20)."}),"\n",(0,n.jsx)(t.p,{children:"This setup worked well for off-chain users interacting with IBC applications."}),"\n",(0,n.jsx)(t.p,{children:"We are now seeing the desire for secondary applications (e.g. smart contracts, modules) to call into IBC apps as part of their state machine logic and then do some actions on the basis of the packet result. Or to receive a packet from IBC and do some logic upon receipt."}),"\n",(0,n.jsx)(t.p,{children:"Example Usecases:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Send an ICS-20 packet, and if it is successful, then send an ICA-packet to swap tokens on LP and return funds to sender"}),"\n",(0,n.jsx)(t.li,{children:"Execute some logic upon receipt of token transfer to a smart contract address"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"This requires a second layer of callbacks. The IBC application already gets the result of the packet from core IBC, but currently there is no standardized way to pass this information on to an actor module/smart contract."}),"\n",(0,n.jsx)(t.h2,{id:"definitions",children:"Definitions"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Actor: an actor is an on-chain module (this may be a hardcoded module in the chain binary or a smart contract) that wishes to execute custom logic whenever IBC receives a packet flow that it has either sent or received. It ",(0,n.jsx)(t.strong,{children:"must"})," be addressable by a string value."]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"decision",children:"Decision"}),"\n",(0,n.jsx)(t.p,{children:"Create a middleware that can interface between IBC applications and smart contract VMs. The IBC applications and smart contract VMs will implement respective interfaces that will then be composed together by the callback middleware to allow a smart contract of any compatible VM to interact programmatically with an IBC application."}),"\n",(0,n.jsx)(t.h2,{id:"data-structures",children:"Data structures"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"CallbackPacketData"})," struct will get constructed from custom callback data in the application packet. The ",(0,n.jsx)(t.code,{children:"CallbackAddress"})," is the IBC Actor address on which the callback should be called on. The ",(0,n.jsx)(t.code,{children:"SenderAddress"})," is also provided to optionally allow a VM to ensure that the sender is the same as the callback address."]}),"\n",(0,n.jsxs)(t.p,{children:["The struct also defines a ",(0,n.jsx)(t.code,{children:"CommitGasLimit"})," which is the maximum gas a callback is allowed to use. If the callback exceeds this limit, the callback will panic and the tx will commit without the callback's state changes."]}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"ExecutionGasLimit"})," is the practical limit of the tx execution that is set in the context gas meter. It is the minimum of the ",(0,n.jsx)(t.code,{children:"CommitGasLimit"})," and the gas left in the context gas meter which is determined by the relayer's choice of tx gas limit. If ",(0,n.jsx)(t.code,{children:"ExecutionGasLimit < CommitGasLimit"}),", then an out-of-gas error will revert the entire transaction without committing anything, allowing for a different relayer to retry with a larger tx gas limit."]}),"\n",(0,n.jsx)(t.p,{children:"Any middleware targeting this interface for callback handling should define a global limit that caps the gas that a callback is allowed to take (especially on AcknowledgePacket and TimeoutPacket) so that a custom callback does not prevent the packet lifecycle from completing. However, since this is a global cap it is likely to be very large. Thus, users may specify a smaller limit to cap the amount of fees a relayer must pay in order to complete the packet lifecycle on the user's behalf."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"// Implemented by any packet data type that wants to support PacketActor callbacks\n// PacketActor's will be unable to act on any packet data type that does not implement\n// this interface. \ntype CallbackPacketData struct {\n    CallbackAddress: string\n    ExecutionGasLimit: uint64\n    SenderAddress: string\n    CommitGasLimit: uint64\n}\n"})}),"\n",(0,n.jsx)(t.p,{children:"IBC Apps or middleware can then call the IBCActor callbacks like so in their own callbacks:"}),"\n",(0,n.jsx)(t.h3,{id:"callback-middleware",children:"Callback Middleware"}),"\n",(0,n.jsxs)(t.p,{children:["The CallbackMiddleware wraps an underlying IBC application along with a contractKeeper that delegates the callback to a virtual machine. This allows the Callback middleware to interface any compatible IBC application with any compatible VM (e.g. EVM, WASM) so long as the application implements the ",(0,n.jsx)(t.code,{children:"CallbacksCompatibleModule"})," interface and the VM implements the ",(0,n.jsx)(t.code,{children:"ContractKeeper"})," interface."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"// IBCMiddleware implements the ICS26 callbacks for the ibc-callbacks middleware given\n// the underlying application.\ntype IBCMiddleware struct {\n\tapp         types.CallbacksCompatibleModule\n\tics4Wrapper porttypes.ICS4Wrapper\n\n\tcontractKeeper types.ContractKeeper\n\n\t// maxCallbackGas defines the maximum amount of gas that a callback actor can ask the\n\t// relayer to pay for. If a callback fails due to insufficient gas, the entire tx\n\t// is reverted if the relayer hadn't provided the minimum(userDefinedGas, maxCallbackGas).\n\t// If the actor hasn't defined a gas limit, then it is assumed to be the maxCallbackGas.\n\tmaxCallbackGas uint64\n}\n"})}),"\n",(0,n.jsx)(t.h3,{id:"callback-compatible-ibc-application",children:"Callback-Compatible IBC Application"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"CallbacksCompatibleModule"})," extends ",(0,n.jsx)(t.code,{children:"porttypes.IBCModule"})," to include an ",(0,n.jsx)(t.code,{children:"UnmarshalPacketData"})," function that allows the middleware to request that the underlying app unmarshal the packet data. This will then allow the middleware to retrieve the callback specific data from an arbitrary set of IBC application packets."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"// CallbacksCompatibleModule is an interface that combines the IBCModule and PacketDataUnmarshaler\n// interfaces to assert that the underlying application supports both.\ntype CallbacksCompatibleModule interface {\n\tporttypes.IBCModule\n\tporttypes.PacketDataUnmarshaler\n}\n\n// PacketDataUnmarshaler defines an optional interface which allows a middleware to\n// request the packet data to be unmarshaled by the base application.\ntype PacketDataUnmarshaler interface {\n\t// UnmarshalPacketData unmarshals the packet data into a concrete type\n\t// ctx, portID, channelID are provided as arguments, so that (if needed)\n\t// the packet data can be unmarshaled based on the channel version.\n\t// the version of the underlying app is also returned.\n\tUnmarshalPacketData(ctx sdk.Context, portID, channelID string, bz []byte) (interface{}, string, error)\n}\n"})}),"\n",(0,n.jsx)(t.p,{children:"The application's packet data must additionally implement the following interfaces:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"// PacketData defines an optional interface which an application's packet data structure may implement.\ntype PacketData interface {\n\t// GetPacketSender returns the sender address of the packet data.\n\t// If the packet sender is unknown or undefined, an empty string should be returned.\n\tGetPacketSender(sourcePortID string) string\n}\n\n// PacketDataProvider defines an optional interfaces for retrieving custom packet data stored on behalf of another application.\n// An existing problem in the IBC middleware design is the inability for a middleware to define its own packet data type and insert packet sender provided information.\n// A short term solution was introduced into several application's packet data to utilize a memo field to carry this information on behalf of another application.\n// This interfaces standardizes that behaviour. Upon realization of the ability for middleware's to define their own packet data types, this interface will be deprecated and removed with time.\ntype PacketDataProvider interface {\n\t// GetCustomPacketData returns the packet data held on behalf of another application.\n\t// The name the information is stored under should be provided as the key.\n\t// If no custom packet data exists for the key, nil should be returned.\n\tGetCustomPacketData(key string) interface{}\n}\n"})}),"\n",(0,n.jsx)(t.p,{children:"The callback data can be embedded in an application packet by providing custom packet data for source and destination callback in the custom packet data under the appropriate key."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsonc",children:'// Custom Packet data embedded as a JSON object in the packet data\n\n// src callback custom data\n{\n  "src_callback": {\n    "address": "callbackAddressString",\n    // optional\n    "gas_limit": "userDefinedGasLimitString",\n  }\n}\n\n// dest callback custom data\n{\n  "dest_callback": {\n    "address": "callbackAddressString",\n    // optional\n    "gas_limit": "userDefinedGasLimitString",\n  }\n}\n\n// src and dest callback custom data embedded together\n{\n  "src_callback": {\n    "address": "callbackAddressString",\n    // optional\n    "gas_limit": "userDefinedGasLimitString",\n  },\n  "dest_callback": {\n    "address": "callbackAddressString",\n    // optional\n    "gas_limit": "userDefinedGasLimitString",\n  }\n}\n'})}),"\n",(0,n.jsx)(t.h2,{id:"contractkeeper",children:"ContractKeeper"}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"ContractKeeper"})," interface must be implemented by any VM that wants to support IBC callbacks. This allows for separation of concerns\nbetween the middleware which is handling logic intended for all VMs (e.g. setting gas meter, extracting callback data, emitting events),\nwhile the ContractKeeper can handle the specific details of calling into the VM in question."]}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"ContractKeeper"})," ",(0,n.jsx)(t.strong,{children:"may"})," impose additional checks such as ensuring that the contract address is the same as the packet sender in source callbacks.\nIt may also disable certain callback methods by simply performing a no-op."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:"// ContractKeeper defines the entry points exposed to the VM module which invokes a smart contract\ntype ContractKeeper interface {\n\t// IBCSendPacketCallback is called in the source chain when a PacketSend is executed. The\n\t// packetSenderAddress is determined by the underlying module, and may be empty if the sender is\n\t// unknown or undefined. The contract is expected to handle the callback within the user defined\n\t// gas limit, and handle any errors, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, and the error will be propagated to the underlying IBC\n\t// application, resulting in a packet send failure.\n\t//\n\t// Implementations are provided with the packetSenderAddress and MAY choose to use this to perform\n\t// validation on the origin of a given packet. It is recommended to perform the same validation\n\t// on all source chain callbacks (SendPacket, AcknowledgementPacket, TimeoutPacket). This\n\t// defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks.\n\tIBCSendPacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tsourcePort string,\n\t\tsourceChannel string,\n\t\ttimeoutHeight clienttypes.Height,\n\t\ttimeoutTimestamp uint64,\n\t\tpacketData []byte,\n\t\tcontractAddress,\n\t\tpacketSenderAddress string,\n\t) error\n\t// IBCOnAcknowledgementPacketCallback is called in the source chain when a packet acknowledgement\n\t// is received. The packetSenderAddress is determined by the underlying module, and may be empty if\n\t// the sender is unknown or undefined. The contract is expected to handle the callback within the\n\t// user defined gas limit, and handle any errors, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, but the packet lifecycle will not be blocked.\n\t//\n\t// Implementations are provided with the packetSenderAddress and MAY choose to use this to perform\n\t// validation on the origin of a given packet. It is recommended to perform the same validation\n\t// on all source chain callbacks (SendPacket, AcknowledgementPacket, TimeoutPacket). This\n\t// defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks.\n\tIBCOnAcknowledgementPacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tpacket channeltypes.Packet,\n\t\tacknowledgement []byte,\n\t\trelayer sdk.AccAddress,\n\t\tcontractAddress,\n\t\tpacketSenderAddress string,\n\t) error\n\t// IBCOnTimeoutPacketCallback is called in the source chain when a packet is not received before\n\t// the timeout height. The packetSenderAddress is determined by the underlying module, and may be\n\t// empty if the sender is unknown or undefined. The contract is expected to handle the callback\n\t// within the user defined gas limit, and handle any error, out of gas, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, but the packet lifecycle will not be blocked.\n\t//\n\t// Implementations are provided with the packetSenderAddress and MAY choose to use this to perform\n\t// validation on the origin of a given packet. It is recommended to perform the same validation\n\t// on all source chain callbacks (SendPacket, AcknowledgementPacket, TimeoutPacket). This\n\t// defensively guards against exploits due to incorrectly wired SendPacket ordering in IBC stacks.\n\tIBCOnTimeoutPacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tpacket channeltypes.Packet,\n\t\trelayer sdk.AccAddress,\n\t\tcontractAddress,\n\t\tpacketSenderAddress string,\n\t) error\n\t// IBCReceivePacketCallback is called in the destination chain when a packet acknowledgement is written.\n\t// The contract is expected to handle the callback within the user defined gas limit, and handle any errors,\n\t// out of gas, or panics gracefully.\n\t// This entry point is called with a cached context. If an error is returned, then the changes in\n\t// this context will not be persisted, but the packet lifecycle will not be blocked.\n\tIBCReceivePacketCallback(\n\t\tcachedCtx sdk.Context,\n\t\tpacket ibcexported.PacketI,\n\t\tack ibcexported.Acknowledgement,\n\t\tcontractAddress string,\n\t) error\n}\n"})}),"\n",(0,n.jsx)(t.h3,{id:"packetcallbacks",children:"PacketCallbacks"}),"\n",(0,n.jsx)(t.p,{children:"The packet callbacks implemented in the middleware will first call the underlying application and then route to the IBC actor callback in the post-processing step.\nIt will extract the callback data from the application packet and set the callback gas meter depending on the global limit, the user limit, and the gas left in the transaction gas meter.\nThe callback will then be routed through the callback keeper which will either panic or return a result (success or failure). In the event of a (non-oog) panic or an error, the callback state changes\nare discarded and the transaction is committed."}),"\n",(0,n.jsx)(t.p,{children:"If the relayer-defined gas limit is exceeded before the user-defined gas limit or global callback gas limit is exceeded, then the entire transaction is reverted to allow for resubmission. If the chain-defined or user-defined gas limit is reached,\nthe callback state changes are reverted and the transaction is committed."}),"\n",(0,n.jsxs)(t.p,{children:["For the ",(0,n.jsx)(t.code,{children:"SendPacket"})," callback, we will revert the entire transaction on any kind of error or panic. This is because the packet lifecycle has not yet started, so we can revert completely to avoid starting the packet lifecycle if the callback is not successful."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-go",children:'// SendPacket implements source callbacks for sending packets.\n// It defers to the underlying application and then calls the contract callback.\n// If the contract callback returns an error, panics, or runs out of gas, then\n// the packet send is rejected.\nfunc (im IBCMiddleware) SendPacket(\n\tctx sdk.Context,\n\tchanCap *capabilitytypes.Capability,\n\tsourcePort string,\n\tsourceChannel string,\n\ttimeoutHeight clienttypes.Height,\n\ttimeoutTimestamp uint64,\n\tdata []byte,\n) (uint64, error) {\n    // run underlying app logic first\n    // IBCActor logic will postprocess\n\tseq, err := im.ics4Wrapper.SendPacket(ctx, chanCap, sourcePort, sourceChannel, timeoutHeight, timeoutTimestamp, data)\n\tif err != nil {\n\t\treturn 0, err\n\t}\n\n    // use underlying app to get source callback information from packet data\n\tcallbackData, err := types.GetSourceCallbackData(im.app, data, sourcePort, ctx.GasMeter().GasRemaining(), im.maxCallbackGas)\n\t// SendPacket is not blocked if the packet does not opt-in to callbacks\n\tif err != nil {\n\t\treturn seq, nil\n\t}\n\n\tcallbackExecutor := func(cachedCtx sdk.Context) error {\n\t\treturn im.contractKeeper.IBCSendPacketCallback(\n\t\t\tcachedCtx, sourcePort, sourceChannel, timeoutHeight, timeoutTimestamp, data, callbackData.CallbackAddress, callbackData.SenderAddress,\n\t\t)\n\t}\n\n\terr = im.processCallback(ctx, types.CallbackTypeSendPacket, callbackData, callbackExecutor)\n\t// contract keeper is allowed to reject the packet send.\n\tif err != nil {\n\t\treturn 0, err\n\t}\n\n    types.EmitCallbackEvent(ctx, sourcePort, sourceChannel, seq, types.CallbackTypeSendPacket, callbackData, nil)\n\treturn seq, nil\n}\n\n// WriteAcknowledgement implements the ReceivePacket destination callbacks for the ibc-callbacks middleware\n// during asynchronous packet acknowledgement.\n// It defers to the underlying application and then calls the contract callback.\n// If the contract callback runs out of gas and may be retried with a higher gas limit then the state changes are\n// reverted via a panic.\nfunc (im IBCMiddleware) WriteAcknowledgement(\n\tctx sdk.Context,\n\tchanCap *capabilitytypes.Capability,\n\tpacket ibcexported.PacketI,\n\tack ibcexported.Acknowledgement,\n) error {\n    // run underlying app logic first\n    // IBCActor logic will postprocess\n\terr := im.ics4Wrapper.WriteAcknowledgement(ctx, chanCap, packet, ack)\n\tif err != nil {\n\t\treturn err\n\t}\n\n    // use underlying app to get destination callback information from packet data\n\tcallbackData, err := types.GetDestCallbackData(\n\t\tim.app, packet.GetData(), packet.GetSourcePort(), ctx.GasMeter().GasRemaining(), im.maxCallbackGas,\n\t)\n\t// WriteAcknowledgement is not blocked if the packet does not opt-in to callbacks\n\tif err != nil {\n\t\treturn nil\n\t}\n\n\tcallbackExecutor := func(cachedCtx sdk.Context) error {\n\t\treturn im.contractKeeper.IBCReceivePacketCallback(cachedCtx, packet, ack, callbackData.CallbackAddress)\n\t}\n\n\t// callback execution errors are not allowed to block the packet lifecycle, they are only used in event emissions\n\terr = im.processCallback(ctx, types.CallbackTypeReceivePacket, callbackData, callbackExecutor)\n\t// emit events\n    types.EmitCallbackEvent(\n\t\tctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence(),\n\t\ttypes.CallbackTypeAcknowledgementPacket, callbackData, err,\n\t)\n\n\treturn nil\n}\n\n// Call the IBCActor recvPacket callback after processing the packet\n// if the recvPacket callback exists. If the callback returns an error\n// then return an error ack to revert all packet data processing. \nfunc (im IBCMiddleware) OnRecvPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    relayer sdk.AccAddress,\n) (ack exported.Acknowledgement) {\n    // run underlying app logic first\n    // IBCActor logic will postprocess\n    ack := im.app.OnRecvPacket(ctx, packet, relayer)\n\t// if ack is nil (asynchronous acknowledgements), then the callback will be handled in WriteAcknowledgement\n\t// if ack is not successful, all state changes are reverted. If a packet cannot be received, then there is\n\t// no need to execute a callback on the receiving chain.\n\tif ack == nil || !ack.Success() {\n\t\treturn ack\n\t}\n\n    // use underlying app to get destination callback information from packet data\n    callbackData, err := types.GetDestCallbackData(\n\t\tim.app, packet.GetData(), packet.GetSourcePort(), ctx.GasMeter().GasRemaining(), im.maxCallbackGas,\n\t)\n\t// OnRecvPacket is not blocked if the packet does not opt-in to callbacks\n\tif err != nil {\n\t\treturn ack\n\t}\n\n\tcallbackExecutor := func(cachedCtx sdk.Context) error {\n\t\treturn im.contractKeeper.IBCReceivePacketCallback(cachedCtx, packet, ack, callbackData.CallbackAddress)\n\t}\n\n    // callback execution errors are not allowed to block the packet lifecycle, they are only used in event emissions\n\terr = im.processCallback(ctx, types.CallbackTypeReceivePacket, callbackData, callbackExecutor)\n\ttypes.EmitCallbackEvent(\n\t\tctx, packet.GetDestPort(), packet.GetDestChannel(), packet.GetSequence(),\n\t\ttypes.CallbackTypeReceivePacket, callbackData, err,\n\t)\n\n\treturn ack\n}\n\n// Call the IBCActor acknowledgementPacket callback after processing the packet\n// if the ackPacket callback exists and returns an error\n// DO NOT return the error upstream. The acknowledgement must complete for the packet\n// lifecycle to end, so the custom callback cannot block completion.\n// Instead we emit error events and set the error in state\n// so that users and on-chain logic can handle this appropriately\nfunc (im IBCModule) OnAcknowledgementPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    acknowledgement []byte,\n    relayer sdk.AccAddress,\n) error {\n    // we first call the underlying app to handle the acknowledgement\n    // IBCActor logic will postprocess\n\terr := im.app.OnAcknowledgementPacket(ctx, packet, acknowledgement, relayer)\n\tif err != nil {\n\t\treturn err\n\t}\n\n    // use underlying app to get source callback information from packet data\n\tcallbackData, err := types.GetSourceCallbackData(\n\t\tim.app, packet.GetData(), packet.GetSourcePort(), ctx.GasMeter().GasRemaining(), im.maxCallbackGas,\n\t)\n\t// OnAcknowledgementPacket is not blocked if the packet does not opt-in to callbacks\n\tif err != nil {\n\t\treturn nil\n\t}\n\n\tcallbackExecutor := func(cachedCtx sdk.Context) error {\n\t\treturn im.contractKeeper.IBCOnAcknowledgementPacketCallback(\n\t\t\tcachedCtx, packet, acknowledgement, relayer, callbackData.CallbackAddress, callbackData.SenderAddress,\n\t\t)\n\t}\n\n\t// callback execution errors are not allowed to block the packet lifecycle, they are only used in event emissions\n\terr = im.processCallback(ctx, types.CallbackTypeAcknowledgementPacket, callbackData, callbackExecutor)\n    types.EmitCallbackEvent(\n\t\tctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence(),\n\t\ttypes.CallbackTypeAcknowledgementPacket, callbackData, err,\n\t)\n\n\treturn nil\n}\n\n// Call the IBCActor timeoutPacket callback after processing the packet\n// if the timeoutPacket callback exists and returns an error\n// DO NOT return the error upstream. The timeout must complete for the packet\n// lifecycle to end, so the custom callback cannot block completion.\n// Instead we emit error events and set the error in state\n// so that users and on-chain logic can handle this appropriately\nfunc (im IBCModule) OnTimeoutPacket(\n    ctx sdk.Context,\n    packet channeltypes.Packet,\n    relayer sdk.AccAddress,\n) error {\n    // application-specific onTimeoutPacket logic\n    err := im.app.OnTimeoutPacket(ctx, packet, relayer)\n\tif err != nil {\n\t\treturn err\n\t}\n\n    // use underlying app to get source callback information from packet data\n\tcallbackData, err := types.GetSourceCallbackData(\n\t\tim.app, packet.GetData(), packet.GetSourcePort(), ctx.GasMeter().GasRemaining(), im.maxCallbackGas,\n\t)\n\t// OnTimeoutPacket is not blocked if the packet does not opt-in to callbacks\n\tif err != nil {\n\t\treturn nil\n\t}\n\n\tcallbackExecutor := func(cachedCtx sdk.Context) error {\n\t\treturn im.contractKeeper.IBCOnTimeoutPacketCallback(cachedCtx, packet, relayer, callbackData.CallbackAddress, callbackData.SenderAddress)\n\t}\n\n\t// callback execution errors are not allowed to block the packet lifecycle, they are only used in event emissions\n\terr = im.processCallback(ctx, types.CallbackTypeTimeoutPacket, callbackData, callbackExecutor)\n\ttypes.EmitCallbackEvent(\n\t\tctx, packet.GetSourcePort(), packet.GetSourceChannel(), packet.GetSequence(),\n\t\ttypes.CallbackTypeTimeoutPacket, callbackData, err,\n\t)\n\n\treturn nil\n}\n\n// processCallback executes the callbackExecutor and reverts contract changes if the callbackExecutor fails.\n//\n// Error Precedence and Returns:\n//   - oogErr: Takes the highest precedence. If the callback runs out of gas, an error wrapped with types.ErrCallbackOutOfGas is returned.\n//   - panicErr: Takes the second-highest precedence. If a panic occurs and it is not propagated, an error wrapped with types.ErrCallbackPanic is returned.\n//   - callbackErr: If the callbackExecutor returns an error, it is returned as-is.\n//\n// panics if\n//   - the contractExecutor panics for any reason, and the callbackType is SendPacket, or\n//   - the contractExecutor runs out of gas and the relayer has not reserved gas grater than or equal to\n//     CommitGasLimit.\nfunc (IBCMiddleware) processCallback(\n\tctx sdk.Context, callbackType types.CallbackType,\n\tcallbackData types.CallbackData, callbackExecutor func(sdk.Context) error,\n) (err error) {\n\tcachedCtx, writeFn := ctx.CacheContext()\n\tcachedCtx = cachedCtx.WithGasMeter(storetypes.NewGasMeter(callbackData.ExecutionGasLimit))\n\n\tdefer func() {\n\t\t// consume the minimum of g.consumed and g.limit\n\t\tctx.GasMeter().ConsumeGas(cachedCtx.GasMeter().GasConsumedToLimit(), fmt.Sprintf("ibc %s callback", callbackType))\n\n\t\t// recover from all panics except during SendPacket callbacks\n\t\tif r := recover(); r != nil {\n\t\t\tif callbackType == types.CallbackTypeSendPacket {\n\t\t\t\tpanic(r)\n\t\t\t}\n\t\t\terr = errorsmod.Wrapf(types.ErrCallbackPanic, "ibc %s callback panicked with: %v", callbackType, r)\n\t\t}\n\n\t\t// if the callback ran out of gas and the relayer has not reserved enough gas, then revert the state\n\t\tif cachedCtx.GasMeter().IsPastLimit() {\n\t\t\tif callbackData.AllowRetry() {\n\t\t\t\tpanic(storetypes.ErrorOutOfGas{Descriptor: fmt.Sprintf("ibc %s callback out of gas; commitGasLimit: %d", callbackType, callbackData.CommitGasLimit)})\n\t\t\t}\n\t\t\terr = errorsmod.Wrapf(types.ErrCallbackOutOfGas, "ibc %s callback out of gas", callbackType)\n\t\t}\n\n\t\t// allow the transaction to be committed, continuing the packet lifecycle\n\t}()\n\n\terr = callbackExecutor(cachedCtx)\n\tif err == nil {\n\t\twriteFn()\n\t}\n\n\treturn err\n}\n'})}),"\n",(0,n.jsxs)(t.p,{children:["Chains are expected to specify a ",(0,n.jsx)(t.code,{children:"maxCallbackGas"})," to ensure that callbacks do not consume an arbitrary amount of gas. Thus, it should always be possible for a relayer to complete the packet lifecycle even if the actor callbacks cannot run successfully."]}),"\n",(0,n.jsx)(t.h2,{id:"consequences",children:"Consequences"}),"\n",(0,n.jsx)(t.h3,{id:"positive",children:"Positive"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"IBC Actors can now programmatically execute logic that involves sending a packet and then performing some additional logic once the packet lifecycle is complete"}),"\n",(0,n.jsx)(t.li,{children:"Middleware implementing ADR-8 can be generally used for any application"}),"\n",(0,n.jsx)(t.li,{children:"Leverages a similar callback architecture to the one used between core IBC and IBC applications"}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"negative",children:"Negative"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"Callbacks may now have unbounded gas consumption since the actor may execute arbitrary logic. Chains implementing this feature should take care to place limitations on how much gas an actor callback can consume."}),"\n",(0,n.jsx)(t.li,{children:"The relayer pays for the callback gas instead of the IBCActor"}),"\n"]}),"\n",(0,n.jsx)(t.h3,{id:"neutral",children:"Neutral"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["Application packets that want to support ADR-8 must additionally have their packet data implement ",(0,n.jsx)(t.code,{children:"PacketDataProvider"})," and ",(0,n.jsx)(t.code,{children:"PacketData"})," interfaces."]}),"\n",(0,n.jsxs)(t.li,{children:["Applications must implement ",(0,n.jsx)(t.code,{children:"PacketDataUnmarshaler"})," interface"]}),"\n",(0,n.jsxs)(t.li,{children:["Callback receiving module must implement the ",(0,n.jsx)(t.code,{children:"ContractKeeper"})," interface"]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"references",children:"References"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/issues/1660",children:"Original issue"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/pull/3287",children:"CallbackPacketData interface implementation"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/cosmos/ibc-go/pull/3287",children:"ICS 20, ICS 27 implementations of the CallbackPacketData interface"})}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,c.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},11151:(e,t,a)=>{a.d(t,{Z:()=>l,a:()=>i});var n=a(67294);const c={},r=n.createContext(c);function i(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);