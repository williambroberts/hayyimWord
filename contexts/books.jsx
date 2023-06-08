"use client"
import React, { createContext,useEffect,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndVerses.json"
import BollsTranslations from "../app/api/bible/translationsBolls.json"
import SearchTranslations from "../app/api/bible/translationsSearch.json"
import { getChapter } from '@/app/api/bible/getChapter'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import getText from '@/app/api/bible/getText'
import getStrong from '@/app/api/bible/getStrong'
import { SearchBible } from '@/app/api/bible/searchBible'
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
   const [globalLineHeight,setGlobalLineHeight]=useState(1.5)
   const [isStrong,setIsStrong]=useState(false)
   const [strongText,setStrongText]=useState(null)
   const [strongData,setStrongData]=useState(null)
   const [isSearch,setIsSearch]=useState(false)
  const [searchData,setSearchData]=useState(null)
  const [isSearchChart,setIsSearchChart]=useState(false)
  const [searchFound,setSearchFound]=useState(undefined)
  const [isChapter,setIsChapter]=useState(false)
    const [isVerse,setIsVerse]=useState(false)
  useEffect(()=>{
    console.log("new search translation will be",searchTranslation)
  },[searchTranslation])
// useEffect(()=>{
//   const fetchText =async ()=>{
//     let reference = chaptersAndVerses[openBookIndex].shortname+parseInt(openChapterIndex+1)
//     let data = await getText("kjv_strongs",reference)
//     setScrollChangeNeeded((prev)=>!prev)
//     setIsChaptersMenuOpen(false)
//      setIsVersesMenuOpen(false)
//      //🦧 history component WIll!
//   setTheText(data.results.kjv_strongs)
//    console.log(data.results.kjv_strongs)
//   }
//   fetchText()
// },[])
  useEffect(()=>{
      console.log("isNote",isNote,isStrong)
      
      
  },[isSearch])
  useEffect(()=>{
    setIsSearchChart(false)
    //get new strong data
    const fetchStrong= async (strongText)=>{
      try {
        const data = await getStrong(strongText)
        if (data!==undefined){
          console.log("strong data",data[0].lexeme)
          setStrongData((prev)=> data[0])
        }
      }catch(err){
        console.log(err)
      }
    }
    //search super api for that word
    const fetchData = async (searchInput)=> {
      //console.log("searchinput,",searchInput)
      try {
          const data = await SearchBible(searchTranslation,searchInput,true,false,true)
      //console.log(data, "search result",searchTranslation, data?.results , Object.values(data?.results)[0])
      if (data!==undefined){
        setSearchData((prev)=> {return Object.values(data?.results)[0]} )
        setSearchFound((prev)=>data.paging.total)
      }
      
      }catch(err){
          console.log(err)
      }
      
      
    }
    fetchStrong(strongText)
    fetchData(strongText) 
  },[strongText])

  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,scrollChangeNeeded,setScrollChangeNeeded,
    openChapterIndex,setOpenChapterIndex,searchTranslation,setSearchTranslation,globalLineHeight,setGlobalLineHeight,
    isChaptersMenuOpen,setIsChaptersMenuOpen,globalFontSize,setGlobalFontSize,isNote,setIsNote,searchFound,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,isStrong,setIsStrong,strongData,
    strongText,setStrongText,searchData,setSearchData,isSearch,setIsSearch,isSearchChart,setIsSearchChart,
    startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,isSettings,setIsSettings
    ,isChapter,setIsChapter,isVerse,setIsVerse,
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider