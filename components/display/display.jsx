"use client"
import { getChapter } from '@/app/api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import React,{useContext,useEffect,useState} from 'react'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { v4 as uuidv4 } from 'uuid';
const Display = () => {
    const [chapter,setChapter]=useState(null)
    const [reFetch,setReFetch]=useState(false)
    const [isNote,setIsNote]=useState(false)
    const {setOpenBookIndex,openBookIndex,setScrollChangeNeeded,scrollChangeNeeded,
        openChapterIndex,setOpenChapterIndex,globalFontSize,
        isChaptersMenuOpen,setIsChaptersMenuOpen,startVerse,setStartVerse,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)

        useEffect(()=>{
          console.log("scroll changed needed",startVerse)
          const verseSpans = document.querySelectorAll('.text-paragraph-verse-number');
          console.log(verseSpans)
          for (const span of verseSpans) {
            console.log(span.textContent)
            if (span.textContent.includes(startVerse)) {
              const elemPosition = span.getBoundingClientRect()
              const elemPositionY = elemPosition.top + window.pageYOffset;
              console.log(elemPosition,"elemPos",elemPositionY,"y")
              window.scrollTo({ top: elemPositionY-136, behavior: 'smooth' });
              break; 
            }
          }
      
        },[scrollChangeNeeded])

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

    const handleClick = () =>{

    }
  return (
    <div className='display'>
      <span className='text-title'>{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span>
        <p className='text-paragraph' style={{fontSize:`${globalFontSize}px`}}>{theText?.map((item,index)=> <span key={uuidv4()} className='text-span'
        onClick={()=>RemoveHighlight()} style={{fontSize:`${globalFontSize}px`}}
       > 
      <span className='text-paragraph-verse-number' style={{fontSize:`${globalFontSize}px`}}>{item.verse} </span>
      
      <span className='text-paragraph-verse-text' style={index+1===startVerse? {...highlightedVerseStyles}:{}}  onClick={()=>handleClick()}> 
      {(item.text.replace(/<br\s*\/?>/gi, ". "))}</span>
       
        </span>
        
        )}</p>

        <span className='turner-left' onClick={()=>handleLeft()} 
        style={{display:` ${openBookIndex+openChapterIndex===0? "none":"flex"}  `}}>❮</span>
        <span className='turner-right'onClick={()=>handleRight()} 
        style={{display:` ${openBookIndex===65 && openChapterIndex===21? "none":"flex"}  `}}>❯</span>
    
    
    
    <div className='note-container'>
    
    </div>
    </div>
  )
}

export default Display