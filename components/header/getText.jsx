"use client"
import React, { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"

import { BookContext } from '@/contexts/books';
import GetItem from './getItem';
import { FirebookContext } from '@/contexts/fireBooks';
const GetText = ({setIsHamburger}) => {
   
    
    const [chaptersArray,setChaptersArray] = useState(null)
    const [versesArray,setVersesArray]=useState(null)
    const [numOfVersesInOpenChapter,SetNumOfVersesInOpenChapter]=useState(1)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,isNote,setIsNote,
        isChaptersMenuOpen,setIsChaptersMenuOpen,isVerse,setIsVerse,isChapter,setIsChapter,
        isVersesMenuOpen,setIsVersesMenuOpen,isSettings,setIsSettings
        } = useContext(BookContext)

        useEffect(()=>{
            const versesObject = chaptersAndVerses[openBookIndex].chapter_verses
                 const numOfVerses = Object.entries(versesObject).filter(([k,v])=> parseInt(k)===openChapterIndex+1)[0][1]
                 //console.log("num of veres in new open chapter",numOfVerses)
                 SetNumOfVersesInOpenChapter(numOfVerses)
               },[openChapterIndex])
        useEffect(()=>{
            let newChaptersArray = Array(chaptersAndVerses[openBookIndex]?.chapters).fill(0)
            setChaptersArray([...newChaptersArray])
        },[openBookIndex])

        useEffect(()=>{
            let newVersesArray = Array(numOfVersesInOpenChapter).fill(0)
            setVersesArray([...newVersesArray])
        },[numOfVersesInOpenChapter])

        const handleCloseChapters = ()=>{
            setIsChapter((prev)=>false)
            console.log("closed chapter")
        }
      const handleCloseVerses = ()=>{
        setIsVerse((prev)=>false)
      }
  return (
    <div className='text-selector-container'>
        {!isChapter && !isVerse?
        <div className='text-selector'>
        <span className='testament-title' id="ot-title">Old Testament</span>
         {chaptersAndVerses.slice(0,39).map((item,index)=>(<GetItem key={uuidv4()} item={item} setIsChapter={setIsChapter}/>) )}
         <a className='get-item2' href="#ot-title">top</a>
         <span className='testament-title'>New Testament</span>
         {chaptersAndVerses.slice(39).map((item,index)=>(<GetItem key={uuidv4()} item={item} setIsChapter={setIsChapter}/>) )}
         <a className='get-item2' href="#ot-title">top</a>
        </div>
        : !isVerse && isChapter?
        <div className='text-selector'>
           
        <span className='testament-title' id="ot-title">{chaptersAndVerses[openBookIndex].name} </span>
        <span className='get-item2' onClick={()=>handleCloseChapters()}>back</span>
         {chaptersArray?.map((item,index)=>(<GetItem key={uuidv4()} item={index} setIsChapter={setIsChapter} isVerse={isVerse}setIsHamburger={setIsHamburger}
         isChapter={isChapter} setIsVerse={setIsVerse}/>) )}
         <a className='get-item2' href="#ot-title">top</a>
       
        </div> :
         <div className='text-selector'>
           
         <span className='testament-title' id="ot-title">{chaptersAndVerses[openBookIndex].name} {openChapterIndex+1}</span>
         <span className='get-item2' onClick={()=>handleCloseVerses()}>back</span>
          {versesArray?.map((item,index)=>(<GetItem key={uuidv4()} item={index} setIsChapter={setIsChapter} isVerse={isVerse} setIsHamburger={setIsHamburger}
          isChapter={isChapter} setIsVerse={setIsVerse}/>) )}
          <a className='get-item2' href="#ot-title">top</a>
        
         </div> 
         }

    </div>
  )
}

export default GetText