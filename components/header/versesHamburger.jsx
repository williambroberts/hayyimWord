"use client"
import { getChapter } from '@/app/api/bible/getChapter';
import React,{useContext,useEffect,useState} from 'react'
import { BookContext } from '@/contexts/books';
import { v4 as uuidv4 } from 'uuid';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const VersesHamburger = ({numberOfVerses,book,setIsHamburger}) => {
  const pathname=usePathname()
  const router = useRouter()
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,scrollChangeNeeded,setScrollChangeNeeded,
        isChaptersMenuOpen,setIsChaptersMenuOpen,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
        startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)

    //console.log(numberOfVerses,"num of veres in open chapter in open book")
    const versesList = Array(numberOfVerses).fill(0)
    const handleFetchChapter = async (index)=>{
        //console.log("fetchign...",openBookIndex,openChapterIndex,index,"b,c,v")
        const data = await getChapter(bollsTranslation,openBookIndex+1,openChapterIndex+1)
        setStartVerse(index)
        setIsChaptersMenuOpen(false)
        setIsVersesMenuOpen(false)
        setIsHamburger(false)
        setTheText(data)
        setDisplayTitle([openBookIndex,openChapterIndex])
        setScrollChangeNeeded((prev)=>!prev)
        console.log(pathname)
        if (pathname!=="/"){
          router.push("/")
        }
        
    }
    const highlightStyles ={
      color: "red",
    }
  return (  
    <div className={`chapters-hamburger ${isVersesMenuOpen? "open": ""}`}>
        <span className='chapters-hamburger-title'>{book?.name} Chapter: {openChapterIndex+1} </span>
 {versesList?.map((item,index)=>(<span className='chapter-item' style={index+1===startVerse && book?.id===openBookIndex+1? {...highlightStyles}:{}}
 onClick={()=>handleFetchChapter(parseInt(index)+1)}
        key={uuidv4()}>{index+1}</span>))}
    </div>
  )
}

export default VersesHamburger