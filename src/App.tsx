import React, { useState } from 'react'
import Dashboard from './Components/Dashboard'
import FilesList from './Components/FilesList'
import { FilesContext } from '../Contexts/FilesContext'
import "./App.scss"

const App: React.FC = () => {

  const [files, setFiles] = useState<File[]>([])

  return (
    <div className='app'>

      <FilesContext.Provider value={{ files, setFiles }}>
        <Dashboard />

        {files.length > 0 && <FilesList />}

      </FilesContext.Provider>

    </div>
  )
}

export default App
