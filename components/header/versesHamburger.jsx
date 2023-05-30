"use client"
import React,{useContext,useEffect,useState} from 'react'
import { BookContext } from '@/contexts/books';
import { v4 as uuidv4 } from 'uuid';
const VersesHamburger = ({numberOfVerses}) => {
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,
        isChaptersMenuOpen,setIsChaptersMenuOpen,
        isVersesMenuOpen,setIsVersesMenuOpen,
        } = useContext(BookContext)

    console.log(numberOfVerses,"num of veres in open chapter in open book")
    const versesList = Array(numberOfVerses).fill(0)
    const handleFetchChapter = (index)=>{
        console.log("fetchign...",index)
    }
  return (  
    <div className={`chapters-hamburger ${isVersesMenuOpen? "open": ""}`}>
 {versesList.map((item,index)=>(<span className='chapter-item' onClick={()=>handleFetchChapter(parseInt(index))}
        key={uuidv4()}>{index+1}</span>))}
    </div>
  )
}

export default VersesHamburger