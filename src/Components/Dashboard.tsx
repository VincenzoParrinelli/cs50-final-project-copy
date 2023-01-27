import React, { useState, useRef, useEffect, ReactElement, useContext, ChangeEvent, DragEvent } from 'react'
import { v4 as uuidv4 } from "uuid"
import { PeerConnectionContext } from '../../Contexts/PeerConnection'
import { FilesContext } from '../../Contexts/FilesContext'
import { FilesInterface } from "../../Interfaces/FilesInterface"
import localforage from 'localforage'
import "./Dashboard.scss"

export default function Dashboard(): ReactElement {

    const [clientCode, setClientCode] = useState<string>("")
    const { files, setFiles }: FilesInterface = useContext(FilesContext)

    const draggableAreaRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>

    // Get peer connection from context
    const pc = useContext(PeerConnectionContext)

    // Genereate new code for this client
    const getNewCode = (): void => {

        const newCode = uuidv4()

        localStorage.setItem("clientCode", newCode)

        setClientCode(newCode)
    }

    // Get files utils function that returns files from indexedDb if any else void
    const getFiles = async (): Promise<File[] | void> => {

        try {

            const files = await localforage.getItem("files") as File[]

            if (files) return files

        } catch (err) {

            console.error(err)
        }
    }

    // On component mount fetch client code from local storage else if first time using the extension generate a new code
    // Also fetch files saved in indexedDb in order to render a file history
    useEffect(() => {

        const localStorageClientCode = localStorage.getItem("clientCode") as string | null

        if (!localStorageClientCode) getNewCode()

        else setClientCode(localStorageClientCode)

        getFiles().then(files => setFiles(files as File[]))


    }, [])

    // Get new files 
    const handleFile = (e: ChangeEvent): void => {

        const target = e.target as HTMLInputElement

        const filesFromTarget = [...target.files!]

        getFiles().then(async files => {

            await localforage.setItem("files", files ? [...files, ...filesFromTarget] : filesFromTarget)

            setFiles(files ? [...files, ...filesFromTarget] : filesFromTarget)

        })

    }

    // When user hoveres on drag and drop area change style
    const handleDragOver = (e: DragEvent): void => {
        e.preventDefault()

        draggableAreaRef.current?.classList.add("dashboard__file-dragger--drag-over")

    }

    // When user leaves cursor from drag and drop remove style
    const handleDragLeave = (e: DragEvent): void => {
        e.preventDefault()

        draggableAreaRef.current?.classList.remove("dashboard__file-dragger--drag-over")
    }

    // Handle drag and dropped files
    const handleOnDrop = (e: DragEvent): void => {
        e.preventDefault()

        if (!e.dataTransfer.files) return

        [...e.dataTransfer.files].forEach(item => {

            setFiles(prevFiles => [...prevFiles, item])

        })

        draggableAreaRef.current?.classList.remove("dashboard__file-dragger--drag-over")
    }

    return (


        <div className='dashboard'>

            <h1 className='dashboard__upload-file-heading'>UPLOAD FILES</h1>

            <p className='dashboard__your-code-paragraph'>Your Code:</p>

            <span className='dashboard__client-code'>{clientCode}</span>

            <button className='dashboard__new-code-btn' onClick={() => getNewCode()}>New Code</button>

            <label className='dashboard__sender-id-label' htmlFor='receiver-id'>Send to:</label>

            <input className='dashboard__receiver-input' id='receiver-id' type="text" placeholder='Enter receiver id...' />

            <div
                ref={draggableAreaRef}
                className='dashboard__file-dragger'
                onDragOver={e => handleDragOver(e)}
                onDragLeave={e => handleDragLeave(e)}
                onDrop={e => handleOnDrop(e)}
            >

                <span className='dashboard__drag-file-span'>DRAG FILE HERE</span>

                <p className='dashboard__or-paragraph'>OR</p>

                <label htmlFor="file" className='dashboard__browse-paragraph'>BROWSE</label>

                <input
                    id='file'
                    type="file"
                    multiple
                    className='dashboard__file-input'
                    onChange={e => handleFile(e)}
                />

            </div>

            <button className='dashboard__send-btn'>SEND</button>

        </div>

    )
} 
