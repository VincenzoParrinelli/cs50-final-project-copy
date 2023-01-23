import React, { createContext } from "react"
import { FilesInterface } from "../Interfaces/FilesInterface"

export const FilesContext = createContext({}) as unknown as React.Context<FilesInterface>