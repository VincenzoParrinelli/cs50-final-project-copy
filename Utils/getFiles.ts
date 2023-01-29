import localforage from 'localforage'

// Get files utils function that returns files from indexedDb if any else void
export const getFiles = async (): Promise<File[] | void> => {

    try {

        const files = await localforage.getItem("files") as File[]

        if (files) return files
        

    } catch (err) {

        console.error(err)
    }
}


