// Interface for filesContext
export interface FilesInterface {
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}