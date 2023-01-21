import React, { useState, useRef, useEffect, ReactElement, useContext, ChangeEvent, DragEvent } from 'react'
import { v4 as uuidv4 } from "uuid"
import { PeerConnectionContext } from '../Contexts/PeerConnection'
import "./Dashboard.scss"

export default function Dashboard(): ReactElement {

    const [file, setFile] = useState<File | null>(null)
    const [clientCode, setClientCode] = useState<string | null>("")

    const draggableAreaRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>

    // Get peer connection from context
    const pc = useContext(PeerConnectionContext) as RTCPeerConnection

    useEffect(() => {

        const sessionStorageClientCode = localStorage.getItem("clientCode") as string | null

        if (!sessionStorageClientCode) {

            const newClientCode = uuidv4()

            setClientCode(newClientCode)

            localStorage.setItem("clientCode", newClientCode)
        }

        else setClientCode(sessionStorageClientCode)

        
    }, [])

    const handleFile = (e: ChangeEvent): void => {

        const target = e.target as HTMLInputElement

        setFile(target.files![0])

    }

    const handleDragOver = (e: DragEvent): void => {
        e.preventDefault()

        draggableAreaRef.current?.classList.add("dashboard__file-dragger--drag-over")

    }

    const handleDragLeave = (e: DragEvent): void => {
        e.preventDefault()

        draggableAreaRef.current?.classList.remove("dashboard__file-dragger--drag-over")
    }

    const handleOnDrop = (e: DragEvent): void => {
        e.preventDefault()

        if (!e.dataTransfer.items) return

        [...e.dataTransfer.items].forEach(item => {

            setFile(item.getAsFile())

        })

        draggableAreaRef.current?.classList.remove("dashboard__file-dragger--drag-over")
    }

    return (
        <div className='dashboard'>

            <h1 className='dashboard__upload-file-heading'>UPLOAD FILE</h1>

            <p className='dashboard__your-code-paragraph'>Your Code:</p>

            <span className='dashboard__client-code'>{clientCode}</span>

            <label className='dashboard__sender-id-label' htmlFor='receiver-id'>Send to:</label>

            <input className='dashboard__receiver-input' id='receiver-id' type="text" placeholder='Enter receiver id...' />

            <div
                ref={draggableAreaRef}
                className='dashboard__file-dragger'
                onDragOver={e => handleDragOver(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDrop={e => handleOnDrop(e)}
            >

                DRAG FILE HERE

                <p className='dashboard__or-paragraph'>OR</p>

                <label htmlFor="file" className='dashboard__browse-paragraph'>BROWSE</label>

                <input
                    id='file'
                    type="file"
                    className='dashboard__file-input'
                    onChange={e => handleFile(e)}
                />

            </div>

            <button className='dashboard__send-btn'>SEND</button>

        </div>
    )
} 
