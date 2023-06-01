"use client"
import React, { createContext,useEffect,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndVerses.json"
import BollsTranslations from "../app/api/bible/translationsBolls.json"
import SearchTranslations from "../app/api/bible/translationsSearch.json"
import { getChapter } from '@/app/api/bible/getChapter'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
export const BookContext = createContext()
const BookProvider = ({children}) => {
  const pathname = usePathname()
  const router = useRouter()
    const [openChapterIndex,setOpenChapterIndex]=useState(0)
    const [openBookIndex,setOpenBookIndex]=useState(0)
    const [bollsTranslation,setBollsTranslation]=useState(BollsTranslations[0])
    const [searchTranslation,setSearchTranslation]=useState(SearchTranslations[0][0])
    const [isChaptersMenuOpen,setIsChaptersMenuOpen]=useState(false)
    const [isVersesMenuOpen,setIsVersesMenuOpen]=useState(false)
   const [startVerse,setStartVerse]=useState(-1)
    const [theText,setTheText]=useState(null)
    const [isSettings,setIsSettings]=useState(false)
   const [displayTitle,setDisplayTitle]=useState([0,0])
   const [globalFontSize,setGlobalFontSize]=useState(16)
   const [scrollChangeNeeded,setScrollChangeNeeded]=useState(false)
   const [isNote,setIsNote]=useState(false)
  useEffect(()=>{
    console.log("new search translation will be",searchTranslation)
  },[searchTranslation])

   useEffect(()=>{
    const fetchChapter = async ()=>{
      console.log("new translation will be",bollsTranslation)
      const data = await getChapter(bollsTranslation,openBookIndex+1,openChapterIndex+1)
      setTheText(data)
      setDisplayTitle([openBookIndex,openChapterIndex])
      setScrollChangeNeeded((prev)=>!prev)
      console.log(pathname)
      if (pathname!=="/"){
        router.push("/")
      }
    }
    fetchChapter()
   },[bollsTranslation])
  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,scrollChangeNeeded,setScrollChangeNeeded,
    openChapterIndex,setOpenChapterIndex,searchTranslation,setSearchTranslation,
    isChaptersMenuOpen,setIsChaptersMenuOpen,globalFontSize,setGlobalFontSize,isNote,setIsNote,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
    startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,isSettings,setIsSettings
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider