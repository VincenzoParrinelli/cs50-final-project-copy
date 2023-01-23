import React, { ReactElement, useContext } from 'react'
import { FilesContext } from '../../Contexts/FilesContext'
import { FilesInterface } from "../../Interfaces/FilesInterface"
import { v4 as uuidv4 } from 'uuid'
import "./FilesList.scss"

export default function FilesList(): ReactElement {

    const { files } = useContext(FilesContext) as FilesInterface


    return (
        <div className='files-list'>

            {files.map(file => {

                return (
                    <div className='files-list__file' key={uuidv4()}>{file.name}</div>
                )

            })}

        </div>
    )
}
