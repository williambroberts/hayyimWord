import React, { createContext,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndverses.json"
export const BookContext = createContext()
const BookProvider = ({children}) => {
    const [openChapterIndex,setOpenChapterIndex]=useState(-1)
    const [openBookIndex,setOpenBookIndex]=useState(-1)
  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,openChapterIndex,setOpenChapterIndex}}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider