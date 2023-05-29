"use client"
import React,{useContext, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import ChapterItem from './ChapterItem';
import { BookContext } from '@/contexts/books';
const BookItem = ({item}) => {
  const {setOpenBookIndex,openBookIndex,openChapterIndex,setOpenChapterIndex} = useContext(BookContext)
  const[isOpen,setIsOpen]=useState(false)
  const chapters = Array(item.chapters).fill(0)
  Object.entries(item.chapter_verses).forEach((item)=>{
    chapters.push(item)
  })
  return (
    <div className="book-item" >
        <span className='book-item-name'>{item.name}</span>
    <div className={`chapters-container ${isOpen? "open": ""}`}>
       {chapters.map((item,index)=> (<ChapterItem chapter={chapters[index]} />) )}
      </div> 
    </div>
  )
}

export default BookItem