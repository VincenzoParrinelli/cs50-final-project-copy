import React, { ReactElement, useContext } from 'react'
import { FilesContext } from '../../Contexts/FilesContext'
import { FilesInterface } from "../../Interfaces/FilesInterface"
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as DeleteIcon } from "../Assets/Images/cross-remove-sign-svgrepo-com.svg"
import localforage from 'localforage'
import prettyBytes from 'pretty-bytes'
import "./FilesList.scss"

export default function FilesList(): ReactElement {

    const { files, setFiles } = useContext(FilesContext) as FilesInterface

    // Delete file on click
    const handleDeleteFile = async (fileIndex: number): Promise<void> => {

        // Remove file from indexedDb files array
        const updatedFiles = files!.filter((_file, i) => fileIndex !== i) as File[]

        // And set it
        await localforage.setItem("files", updatedFiles).then(() => setFiles(updatedFiles))

    }

    return (

        <div className='files-list'>

            <div className='files-list__container'>

                {files.map((file, fileIndex) => {

                    return (

                        <div className='files-list__file' key={uuidv4()}>

                            <div className='files-list__metadata-container'>

                                <div className='files-list__file-name'>{file.name}</div>

                                <p className='files-list__file-size'>{prettyBytes(file.size).toUpperCase()}</p>

                            </div>

                            <DeleteIcon className='files-list__delete-icon' onClick={() => handleDeleteFile(fileIndex)} />

                        </div>

                    )

                })}


            </div>

        </div >
    )
}
