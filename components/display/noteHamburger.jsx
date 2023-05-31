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
    const {firebaseHighlights,setFirebaseHighlights} = useContext(DataContext)
    const [color,setColor]=useState(null)
    const [updateHighlight,setUpdateHighlight]=useState(false)
    const handleClose = ()=>{
        setIsNote(false)
        setIsHighlight(false)
    }
    useEffect(()=>{
        if (!isNote) {
            setIsHighlight(false)
        }
    },[isNote])
    const handleHighlight =(color)=>{
        setColor(color)
        setUpdateHighlight((prev)=>!prev)
    }
    useEffect(()=>{
        const highlightVerse = async()=>{
            if (user===null){
                console.log("no user, log in alert")
                return
            }
            const userHighlightRef = doc(firestore, 'notes', user?.uid);
            try {
                await updateDoc(userHighlightRef,{ "highlights": arrayUnion({pk:pk,color:color})})
                console.log("added highlight ",color)
                    
                }catch (err){
                console.log(err)
                }
         console.log(firebaseHighlights?.length,"fb highlights,",firebaseHighlights)       
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
                    <span className='highlight-red' onClick={()=>handleHighlight("#ff78424b")}></span>
                    <span className='highlight-orange'onClick={()=>handleHighlight("#f7aa3572")}></span>
                    <span className='highlight-yellow'onClick={()=>handleHighlight("#FFF36D")}></span>
                    <span className='highlight-green' onClick={()=>handleHighlight("#abff32")}></span>
                    <span className='highlight-blue' onClick={()=>handleHighlight("#2edae30f")}></span>
                    <span className='highlight-purple'onClick={()=>handleHighlight("#c8bff7")}></span>
                </div>
            </div>
            <span  className='note-cross' onClick={()=>handleClose()}><IconCrossCircled/></span>
    </div>
  )
}

export default NoteHamburger