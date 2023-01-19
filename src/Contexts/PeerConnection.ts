import React, { createContext } from "react"

const servers = {

    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ],

    iceCandidatePoolSize: 10
    
} as RTCConfiguration

let pc = new RTCPeerConnection(servers) as RTCPeerConnection

export const PeerConnectionContext = createContext(pc) as React.Context<RTCPeerConnection>