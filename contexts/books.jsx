"use client"
import React, { createContext,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndVerses.json"
import BollsTranslations from "../app/api/bible/translationsBolls.json"
import SearchTranslations from "../app/api/bible/translationsSearch.json"
export const BookContext = createContext()
const BookProvider = ({children}) => {
    const [openChapterIndex,setOpenChapterIndex]=useState(0)
    const [openBookIndex,setOpenBookIndex]=useState(0)
    const [bollsTranslation,setBollsTranslation]=useState(BollsTranslations[0])
    const [searchTranslation,setSearchTranslation]=useState(SearchTranslations[0])
    const [isChaptersMenuOpen,setIsChaptersMenuOpen]=useState(false)
    const [isVersesMenuOpen,setIsVersesMenuOpen]=useState(false)
   const [startVerse,setStartVerse]=useState(-1)
    const [theText,setTheText]=useState(null)
    const [isSettings,setIsSettings]=useState(false)
   const [displayTitle,setDisplayTitle]=useState([0,0])
   const [globalFontSize,setGlobalFontSize]=useState(16)
  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,searchTranslation,setSearchTranslation,
    isChaptersMenuOpen,setIsChaptersMenuOpen,globalFontSize,setGlobalFontSize,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
    startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,isSettings,setIsSettings
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider