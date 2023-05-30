"use client"
import React, { useContext, useEffect, useState } from 'react'
import IconCrossCircled from '../icons/action/cross'
import { DataContext } from '@/contexts/dataContext'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { firestore } from '@/firebase/firebaseConfig'
import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot,updateDoc,runTransaction,arrayUnion } from "firebase/firestore";

import { BookContext } from '@/contexts/books'
const NoteHamburger = ({isNote,setIsNote,pk}) => {
    const [isHighlight,setIsHighlight]=useState(false)
    const {user}=useContext(IsAUserLoggedInContext)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,scrollChangeNeeded,setScrollChangeNeeded,
        isChaptersMenuOpen,setIsChaptersMenuOpen,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
        startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)
    const {firebaseFavs,setFirebaseFavs} = useContext(DataContext)
    const [color,setColor]=useState(null)
    const [updateHighlight,setUpdateHighlight]=useState(false)
    const handleClose = ()=>{
        setIsNote(false)
        setIsHighlight(false)
    }

    const handleHighlight =(color)=>{
        setColor(color)
        setUpdateHighlight((prev)=>!prev)
    }
    useEffect(()=>{
        const highlightVerse = async()=>{
            if (user===null){
                console.log("no user")
                return
            }
            const userHighlightRef = doc(firestore, 'notes', user?.uid);
            try {
                await updateDoc(userHighlightRef,{ "favourites": arrayUnion({color:pk})})
                console.log("added highlight ",color)
                    
                }catch (err){
                console.log(err)
                }
        }
        highlightVerse()
        
    },[updateHighlight])
  return (
    <div className={`note-menu ${isNote? "open":""}`}>
        <div className={`note-options ${isHighlight? "":"open"}`}>
            <span className='note-span'>Copy</span>
            <span  className='note-span'>Note</span>
            <span  className='note-span' onClick={()=>setIsHighlight(true)}>Highlight</span>
             
        </div>
         
            <div className={`highlight-container ${isHighlight? "open":""}`}>
                <span onClick={()=>setIsHighlight(false)} className='highlight-close'>❮</span>
                <div className='highlight-colors'>
                    <span className='highlight-none' onClick={()=>handleHighlight(null)}></span>
                    <span className='highlight-red' onClick={()=>handleHighlight("red")}></span>
                    <span className='highlight-orange'onClick={()=>handleHighlight("orange")}></span>
                    <span className='highlight-yellow'onClick={()=>handleHighlight("yellow")}></span>
                    <span className='highlight-green' onClick={()=>handleHighlight("green")}></span>
                    <span className='highlight-blue' onClick={()=>handleHighlight("blue")}></span>
                    <span className='highlight-purple'onClick={()=>handleHighlight("purple")}></span>
                </div>
            </div>
            <span  className='note-cross' onClick={()=>handleClose()}><IconCrossCircled/></span>
    </div>
  )
}

export default NoteHamburger