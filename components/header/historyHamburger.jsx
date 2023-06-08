"use client"
import { BookContext } from '@/contexts/books'
import React, { useContext } from 'react'
import IconDelete from '../icons/action/delete'
import { v4 as uuidv4 } from 'uuid'
import IconArrowLeft from '../icons/navigation/arrowLeft'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { useParams, usePathname, useRouter } from 'next/navigation'
import getText from '@/app/api/bible/getText'
const HistoryHamburger = ({setIsHamburger}) => {
    const router = useRouter()
    const pathname= usePathname()
    const {isHistory,setIsHistory,history,setIsSearch,setOpenBookIndex,setStartVerse,setHistory,openBookIndex,openChapterIndex,
    setOpenChapterIndex,setTheText,setDisplayTitle,setScrollChangeNeeded}=useContext(BookContext)
    const handleDelete = ()=>{
        localStorage.setItem("history",JSON.stringify([]))
        setHistory(null)
    }
    const handleGoto =async (item)=>{
        setIsSearch((prev)=>false)
        
        setOpenBookIndex(item.book-1)
        setStartVerse(item.verse)
        setOpenChapterIndex(item.chapter-1)
       
        let reference = chaptersAndVerses[item.book-1].shortname+parseInt(item.chapter)
        let data = await getText("kjv_strongs",reference)
         
          setTheText(data.results.kjv_strongs)
        
          setDisplayTitle([openBookIndex,openChapterIndex])
       
       
        setScrollChangeNeeded((prev)=>!prev)
        setDisplayTitle([item.book-1,item.chapter-1])
        setIsHistory(false)
        setIsHamburger(false)
        if (pathname!=="/"){
          router.push("/")
        }
    }
  return (
    <div className={`settings ${isHistory? "open" : ""}`}>
        <nav className='settings-header'>
        <span className='settings-back' onClick={()=>setIsHistory(false)}><IconArrowLeft/></span>
           <span className='settings-title'>History</span>
        </nav>
        <div className='history-clear'>Tap verse to view in context. Clear History <span className='history-delete' onClick={()=>handleDelete()}><IconDelete/></span></div>
        <div className='history-wrapper'>
            {history?.map((item)=>  <div className='search-result-item' onClick={()=>handleGoto(item)}>
        <span className='search-result-item-title'>{chaptersAndVerses[item.book-1].name} {item?.chapter}:{item?.verse}
        <span className='search-result-icon'>&#8250;</span> 
        </span>
       <span className='search-result-item-text'>{item.text}</span>
      
    </div>)}
        </div>
    </div>
  )
}

export default HistoryHamburger