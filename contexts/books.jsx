"use client"
import React, { createContext,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndVerses.json"
export const BookContext = createContext()
const BookProvider = ({children}) => {
    const [openChapterIndex,setOpenChapterIndex]=useState(0)
    const [openBookIndex,setOpenBookIndex]=useState(0)
    
    const [isChaptersMenuOpen,setIsChaptersMenuOpen]=useState(false)
    const [isVersesMenuOpen,setIsVersesMenuOpen]=useState(false)
   

   
  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,
    isChaptersMenuOpen,setIsChaptersMenuOpen,
    isVersesMenuOpen,setIsVersesMenuOpen,
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider