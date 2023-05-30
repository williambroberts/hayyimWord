"use client"
import React,{useContext, useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import ChapterItem from './ChapterItem';
import { BookContext } from '@/contexts/books';
const BookItem = ({item}) => {
  const {setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,
    isChaptersMenuOpen,setIsChaptersMenuOpen,
    isVersesMenuOpen,setIsVersesMenuOpen,
    } = useContext(BookContext)
  
  
  const handleBook = (index) =>{
    setIsChaptersMenuOpen((prev)=>true)
   // console.log("open book index",index)
    setOpenBookIndex((prev)=>index)
  }
  
  return (
    <div className="book-item" onClick={()=>handleBook(parseInt(item.id)-1)}>
        <span className='book-item-name'>{item.shortname}</span>
    </div>
  )
}

export default BookItem