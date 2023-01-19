import React, { useState, ReactElement, useContext, ChangeEvent } from 'react'
import { PeerConnectionContext } from '../Contexts/PeerConnection'
import "./Dashboard.scss"

export default function Dashboard(): ReactElement {

    const [file, setFile] = useState<File | null>(null)

    // Get peer connection from context
    const pc = useContext(PeerConnectionContext) as RTCPeerConnection

    const handleFile = (e: ChangeEvent): void => {

        const target = e.target as HTMLInputElement

        setFile(target.files![0])

    }

    return (
        <div className='dashboard'>

            <h1>UPLOAD FILE</h1>

            <div

                className='dashboard__file-dragger'
              
            >

                DRAG FILE HERE

            </div>

            <p className='dashboard__or-paragraph'> or </p>

            <label htmlFor="file" className='dashboard__browse-btn'>Browse</label>

            <input
                id='file'
                type="file"
                className='dashboard__file-input'
                onChange={e => handleFile(e)}
            />


        </div>
    )
} 
