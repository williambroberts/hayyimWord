"use client"
import React, { createContext,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndVerses.json"
import BollsTranslations from "../app/api/bible/translationsBolls.json"
export const BookContext = createContext()
const BookProvider = ({children}) => {
    const [openChapterIndex,setOpenChapterIndex]=useState(0)
    const [openBookIndex,setOpenBookIndex]=useState(0)
    const [bollsTranslation,setBollsTranslation]=useState(BollsTranslations[0])
    const [isChaptersMenuOpen,setIsChaptersMenuOpen]=useState(false)
    const [isVersesMenuOpen,setIsVersesMenuOpen]=useState(false)
   const [startVerse,setStartVerse]=useState(-1)
    const [theText,setTheText]=useState(null)
   
  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,
    isChaptersMenuOpen,setIsChaptersMenuOpen,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
    startVerse,setStartVerse,theText,setTheText
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider