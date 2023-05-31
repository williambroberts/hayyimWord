"use client"
import React,{useState,useContext} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { BookContext } from '@/contexts/books';
import IconCrossCircled from '../icons/action/cross';
const ChaptersHamburger = ({item,handleChaptersMenu}) => {
   // console.log(item,item?.id,item?.name,"this is open book chapters list")
    const chaptersList=Array(item?.chapters).fill(0)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,
        isChaptersMenuOpen,setIsChaptersMenuOpen,
        isVersesMenuOpen,setIsVersesMenuOpen, startVerse,setStartVerse,
        } = useContext(BookContext)
    const handleVerseMenu = (num) =>{
        //console.log("opening chapter ",num)
        setIsVersesMenuOpen(true)
        setOpenChapterIndex(num)
    }
    
  return (
    <div className={`chapters-hamburger ${isChaptersMenuOpen? "open":""}`}>
        <div className='chapters-hamburger-title'>{item?.name} <span className="close-menu" onClick={()=>handleChaptersMenu()}><IconCrossCircled/></span></div>
        {chaptersList?.map((item,index)=>(<span className='chapter-item' 
        onClick={()=>handleVerseMenu(parseInt(index))}
        key={uuidv4()}>{index+1}</span>))}
    </div>
  )
}

export default ChaptersHamburger