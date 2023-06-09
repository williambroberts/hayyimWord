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
import getVerse from '@/app/api/bible/getVerse'
import { SearchStrong } from '@/app/api/bible/searchStrong'
import { superGetStrong } from '@/app/api/bible/superGetStrong'
import { SearchStrongPagnation } from '@/app/api/bible/searchStrongPagnation'
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

   const [superStrongData,setSuperStrongData]=useState(null)
   const [isSearch,setIsSearch]=useState(false)
  const [searchData,setSearchData]=useState(null)
  const [isSearchChart,setIsSearchChart]=useState(false)
  const [searchFound,setSearchFound]=useState(undefined)
  const [isChapter,setIsChapter]=useState(false)
    const [isVerse,setIsVerse]=useState(false)
    const [history,setHistory]=useState(null)
    const [recentSearches,setRecentSearches]=useState(null)
    const [isHistory,setIsHistory]=useState(false)
    const [searchInput,setSearchInput]=useState("")
    const [page,setPage]=useState(1)
    const [totalPages,setTotalPages]=useState(null)
    const [reObserve,setReObserve]=useState(false)
    const [reGetStrongs,setReGetStrongs]=useState(false)
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
  const fetchVerse = async (reference) =>{
    const data = await getVerse("kjv",reference)
    const toAdd = data?.results.kjv[0]
    console.log(toAdd,"toAdd",data)
      try {
      let histroyRaw = localStorage.getItem("history")
      let history = JSON.parse(histroyRaw)
      if (history===null){
        localStorage.setItem("history",JSON.stringify([toAdd]))
        setHistory([toAdd])
      }else {
        let ids = []
        for (let item of history){
          ids.push(item.id)
        }
        if (!ids.includes(toAdd.id)){
           history.push(toAdd)
        localStorage.setItem("history",JSON.stringify(history))
        setHistory([...history])
        }
       
      }

    }catch(err){
      console.log(err)
    }


  }
  if (startVerse!==-1){
    //add current to history
    let reference = chaptersAndVerses[openBookIndex].shortname+(openChapterIndex+1)+":"+(startVerse)
    console.log(reference,"verse ref",openBookIndex,openChapterIndex,startVerse)
    fetchVerse(reference)
  
  }
},[openBookIndex,openChapterIndex,startVerse])
  useEffect(()=>{
      console.log("isNote",isNote,isStrong)
      
      
  },[isSearch])
  useEffect(()=>{
    setIsSearchChart(false)
    //get new strong data
    const fetchStrong= async (strongText)=>{
      try {
        const data = await getStrong(strongText)
        const superData = await superGetStrong(strongText)
        if (superData!==undefined){
          console.log("strnong super",superData.results[0].entry)
          setSuperStrongData((prev)=>superData.results[0])
        }
        if (data!==undefined){
          console.log("strong data",data[0].lexeme)
          setStrongData((prev)=> data[0])
        }
      }catch(err){
        console.log(err)
      }
    }
    //search super api for that word
    const fetchData = async (searchInputVar)=> {
      
      try {
         
          const data = await SearchStrongPagnation(searchTranslation,searchInputVar,true,false,true,1)
      //console.log(data, "search result",searchTranslation, data?.results , Object.values(data?.results)[0])
      if (data!==undefined){
        setSearchData((prev)=> {return Object.values(data?.results)[0]} )
        setSearchFound(data.paging.total)
        setTotalPages(data.paging.last_page)
        console.log(data.paging.total,data.paging.last_page)
        setPage(1)
        setReObserve((prev)=>prev)
        setIsStrong(true)
       
        
      }
      
      }catch(err){
          console.log(err)
      }
      
      
    }

    //console.log(strongText,"strongText")
    fetchStrong(strongText)
    fetchData(strongText) 
  },[strongText,reGetStrongs])

  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,scrollChangeNeeded,setScrollChangeNeeded,
    openChapterIndex,setOpenChapterIndex,searchTranslation,setSearchTranslation,globalLineHeight,setGlobalLineHeight,
    isChaptersMenuOpen,setIsChaptersMenuOpen,globalFontSize,setGlobalFontSize,isNote,setIsNote,searchFound,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,isStrong,setIsStrong,strongData,
    strongText,setStrongText,searchData,setSearchData,isSearch,setIsSearch,isSearchChart,setIsSearchChart,setReGetStrongs,reGetStrongs,
    startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,isSettings,setIsSettings,setSearchFound,searchFound,
    isChapter,setIsChapter,isVerse,setIsVerse, recentSearches,setRecentSearches,searchInput,setSearchInput,
    isHistory,setIsHistory,history,setHistory,superStrongData,setSuperStrongData,setTotalPages,totalPages,page,setPage,reObserve,setReObserve,
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider