"use client"
import React,{useContext, useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import ChapterItem from './ChapterItem';
import { BookContext } from '@/contexts/books';
const BookItem = ({item}) => {
  const {setOpenBookIndex,openBookIndex,openChapterIndex,setOpenChapterIndex,openBookList,setOpenBookList} = useContext(BookContext)
  const[isOpen,setIsOpen]=useState(false)
  const chapters = Array(item.chapters).fill(0)
  Object.entries(item.chapter_verses).forEach((item)=>{
    chapters.push(item)
  })
  const handleBook = (index) =>{
    console.log(index)
    let newOpenBookList = [...openBookList] 
    if (newOpenBookList[index-1]===true){
      newOpenBookList[index-1]=false
      setOpenBookList([...newOpenBookList])
    }else{
      let newBookList = Array(66).fill(false)
      newBookList[index-1]=true
      setOpenBookList([...newBookList])
    }
    console.log(openBookList,index)
  }
  
  return (
    <div className="book-item" onClick={()=>handleBook(parseInt(item.id))}>
        <span className='book-item-name'>{item.name}</span>
    <div className={`chapters-container ${openBookList[parseInt(item.id)-1]===true? "open": ""}`} >
    
       {chapters.map((item,index)=> (<ChapterItem key={uuidv4()} chapter={chapters[index]} />) )}
      </div> 
    </div>
  )
}

export default BookItem