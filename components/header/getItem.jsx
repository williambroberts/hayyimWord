"use client"
import React,{useContext,useState} from 'react'
import { BookContext } from '@/contexts/books'
import { FirebookContext } from '@/contexts/fireBooks';
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import getText from '@/app/api/bible/getText';
import { usePathname } from 'next/navigation';
const GetItem = ({item,setIsChapter,isChapter,setIsVerse,isVerse,setIsHamburger}) => {
    const pathname = usePathname()
    const {setOpenBookIndex,openBookIndex, startVerse,setStartVerse,
        openChapterIndex,setOpenChapterIndex,isNote,setIsNote,setDisplayTitle,
        isChaptersMenuOpen,setIsChaptersMenuOpen,setScrollChangeNeeded,setTheText,
        isVersesMenuOpen,setIsVersesMenuOpen,isSettings,setIsSettings
        } = useContext(BookContext)
       // const {book,handleGetBook} = useContext(FirebookContext)
        //console.log(item,item.shortname,isChapter,isVerse)

        const handleBook =async (index) =>{
            if (!isChapter && !isVerse){
                 setIsChapter((prev)=>true)
            setOpenBookIndex((prev)=>index)
            }  else if (isChapter && !isVerse){
                setIsVerse((prev)=>true)
                console.log("new open chpt index",index)
                setOpenChapterIndex(index)
            }else {
                console.log(item,"item",openBookIndex,openChapterIndex)
                let reference = chaptersAndVerses[openBookIndex].shortname+parseInt(openChapterIndex+1)
               let data = await getText("kjv_strongs",reference)
                setStartVerse(item+1)
                setIsHamburger((prev)=>false)
                setScrollChangeNeeded((prev)=>!prev)
                setIsChaptersMenuOpen(false)
                 setIsVersesMenuOpen(false)
                 setDisplayTitle([openBookIndex,openChapterIndex])

                 //🦧 history component WIll!
              setTheText(data.results.kjv_strongs)
               console.log(data.results.kjv_strongs)
                //console.log(chaptersAndVerses[openBookIndex].shortname,openChapterIndex,item+1,reference)
                
            }  
            //console.log(pathname)
            if (pathname!=="/"){
              router.push("/")
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