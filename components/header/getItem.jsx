"use client"
import React,{useContext,useState} from 'react'
import { BookContext } from '@/contexts/books'
const GetItem = ({item,setIsChapter,isChapter,setIsVerse,isVerse}) => {
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,isNote,setIsNote,
        isChaptersMenuOpen,setIsChaptersMenuOpen,
        isVersesMenuOpen,setIsVersesMenuOpen,isSettings,setIsSettings
        } = useContext(BookContext)
        console.log(item,item.shortname)

        const handleBook = (index) =>{
            if (!isChapter && !isVerse){
                 setIsChapter((prev)=>true)
            setOpenBookIndex((prev)=>index)
            }  else if (isChapter && !isVerse){
                setIsVerse((prev)=>true)
                setOpenChapterIndex(index)
            }else {
                console.log("3")
            }        
          }
  return (
    <div className='get-item' onClick={()=>handleBook(item.id===undefined? item:parseInt(item.id)-1)}>
        {item?.shortname===undefined? item+1 :item?.shortname}
        <span className='get-item-number'>{item.id}</span>
    </div>
  )
}

export default GetItem