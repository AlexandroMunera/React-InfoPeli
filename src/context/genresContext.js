import React, { createContext, useState } from 'react'

const GenresContext = createContext({})

export function GenresContexProvider ({children}){
    const [genres, setGenres] = useState([])

    return <GenresContext.Provider
                value={{genres,setGenres}}>
                    {children}
         </GenresContext.Provider>

}

export default GenresContext
