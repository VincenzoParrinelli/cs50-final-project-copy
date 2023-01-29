import React, { ReactElement, useContext } from 'react'
import { FilesContext } from '../../Contexts/FilesContext'
import { FilesInterface } from "../../Interfaces/FilesInterface"
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as DeleteIcon } from "../Assets/Images/cross-remove-sign-svgrepo-com.svg"
import prettyBytes from 'pretty-bytes'
import "./FilesList.scss"

export default function FilesList(): ReactElement {

    const { files, setFiles } = useContext(FilesContext) as FilesInterface

    return (

        <div className='files-list'>

            <div className='files-list__container'>

                {files.map((file, i) => {

                    return (

                        <div className='files-list__file' key={uuidv4()}>

                            <div className='files-list__metadata-container'>

                                <div className='files-list__file-name'>{file.name}</div>

                                <p className='files-list__file-size'>{prettyBytes(file.size).toUpperCase()}</p>

                            </div>

                            <DeleteIcon className='files-list__delete-icon' />

                        </div>

                    )

                })}


            </div>

        </div >
    )
}
