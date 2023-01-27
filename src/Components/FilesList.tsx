import React, { ReactElement, useContext, useEffect } from 'react'
import { FilesContext } from '../../Contexts/FilesContext'
import { FilesInterface } from "../../Interfaces/FilesInterface"
import { v4 as uuidv4 } from 'uuid'
import prettyBytes from 'pretty-bytes'
import "./FilesList.scss"

export default function FilesList(): ReactElement {

    const { files } = useContext(FilesContext) as FilesInterface

    console.log(files)

    return (

        <div className='files-list'>

            <div className='files-list__container'>

                {files.map(file => {

                    return (
                        <div className='files-list__file' key={uuidv4()}>

                            <span className='files-list__file-name'>{file.name}</span>

                            <p className='files-list__file-size'>{prettyBytes(file.size).toUpperCase()}</p>

                        </div>
                    )

                })}


            </div>

        </div >
    )
}
