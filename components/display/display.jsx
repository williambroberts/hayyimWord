"use client"
import { getChapter } from '@/app/api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import React,{useContext,useEffect,useState} from 'react'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { v4 as uuidv4 } from 'uuid';
const Display = () => {
    const [chapter,setChapter]=useState(null)
    const [reFetch,setReFetch]=useState(false)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,globalFontSize,
        isChaptersMenuOpen,setIsChaptersMenuOpen,startVerse,setStartVerse,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)

    // useEffect(()=>{
    //     const fetchFirstTime = async ()=>{
    //          const text = await getChapter(bollsTranslation,openBookIndex+1,openChapterIndex+1)
    //          setTheText(text)
    //          console.log(text,"fetched the text 1st render")
    //     }
    //     fetchFirstTime()
    // },[])

    useEffect(()=>{
      const fetchAnotherTime = async ()=>{
        
        const text = await getChapter(bollsTranslation,openBookIndex+1,openChapterIndex+1)
        setTheText(text)
        console.log(text,"fetched the text another time")
        setDisplayTitle([openBookIndex,openChapterIndex])
   }
   fetchAnotherTime()
    },[reFetch])

    const highlightedVerseStyles = {
        color: "red",
        cursor:"pointer",
    }
    const RemoveHighlight = ()=>{
        setStartVerse(-1)
        
    }
    const handleLeft = async ()=>{
      //console.log(openBookIndex,openChapterIndex,"old")
      if (openChapterIndex===0){
        setOpenBookIndex((prev)=>{return Math.max(0,openBookIndex-1)})
        
      }else{
        setOpenChapterIndex((prev)=>{return prev-1})
      }
     // console.log(openBookIndex,openChapterIndex,"new")
    setReFetch((prev)=>!prev)
    }

    const handleRight = ()=>{
     // console.log(openBookIndex,openChapterIndex,"old")
      if (openChapterIndex===chaptersAndVerses[openBookIndex].chapters-1){
        setOpenBookIndex((prev)=>Math.min(prev+1,65))
        setOpenChapterIndex(0)
        
      }else{
        setOpenChapterIndex((prev)=>prev+1)
      }
      //console.log(openBookIndex,openChapterIndex,"new") 
      setReFetch((prev)=>!prev)
    }
  return (
    <div className='display'>
      <span className='text-title'>{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span>
        <p className='text-paragraph' style={{fontSize:`${globalFontSize}px`}}>{theText?.map((item,index)=> <span key={uuidv4()} className='text-span'
        onClick={()=>RemoveHighlight()} style={{fontSize:`${globalFontSize}px`}}
        > 
      <span className='text-paragraph-verse-number' style={{fontSize:`${globalFontSize}px`}}>{item.verse}</span>
      <span className='text-paragraph-verse-text' style={index+1===startVerse? {...highlightedVerseStyles}:{}}> 
      {(item.text.replace(/<br\s*\/?>/gi, ". "))}</span>
       
        </span>
        
        )}</p>

        <span className='turner-left' onClick={()=>handleLeft()} 
        style={{display:` ${openBookIndex+openChapterIndex===0? "none":"flex"}  `}}>❮</span>
        <span className='turner-right'onClick={()=>handleRight()} 
        style={{display:` ${openBookIndex===65 && openChapterIndex===21? "none":"flex"}  `}}>❯</span>
    </div>
  )
}

export default Display