"use client"
import { getChapter } from '@/app/api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import React,{useContext,useEffect,useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
const Display = () => {
    const [chapter,setChapter]=useState(null)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,
        isChaptersMenuOpen,setIsChaptersMenuOpen,startVerse,setStartVerse,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,theText,setTheText
        } = useContext(BookContext)
    useEffect(()=>{
        const fetchFirstTime = async ()=>{
             const text = await getChapter(bollsTranslation,openBookIndex+1,openChapterIndex+1)
             setTheText(text)
             console.log(text,"fetched the text 1st render")
        }
        fetchFirstTime()
    },[])

    const highlightedVerseStyles = {
        color: "red",
    }
    const RemoveHighlight = ()=>{
        setStartVerse(-1)
        
    }
  return (
    <div className='display'>
        <p className='text-paragraph'>{theText?.map((item,index)=> <span key={uuidv4()} className='text-span'
        onClick={()=>RemoveHighlight()}
        > 
      <span className='text-paragraph-verse-number'>{item.verse}</span>
      <span className='text-paragraph-verse-text' style={index+1===startVerse? {...highlightedVerseStyles}:{}}> 
      {(item.text.replace(/<br\s*\/?>/gi, ". "))}</span>
       
        </span>
        
        )}</p>
    </div>
  )
}

export default Display