"use client"
import React, { useContext, useEffect, useState } from 'react'
import IconCrossCircled from '../icons/action/cross'
import { DataContext } from '@/contexts/dataContext'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { firestore } from '@/firebase/firebaseConfig'
import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot,updateDoc,runTransaction,arrayUnion } from "firebase/firestore";

import { BookContext } from '@/contexts/books'
import FlexRow from '../setup/flexRow'
import IconArrowLeft from '../icons/navigation/arrowLeft'
const NoteHamburger = ({isNote,setIsNote,pk,chapter,book,verse,isWrite,setIsWrite}) => {
    const [isHighlight,setIsHighlight]=useState(false)
   
    const [message,setMessage]=useState(null)
    const {user}=useContext(IsAUserLoggedInContext)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,scrollChangeNeeded,setScrollChangeNeeded,
        isChaptersMenuOpen,setIsChaptersMenuOpen,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
        startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)
    const {firebaseHighlights,setFirebaseHighlights,firebaseNotes,setFirebaseNotes} = useContext(DataContext)
    const [color,setColor]=useState(null)
    const [updateHighlight,setUpdateHighlight]=useState(false)
    const handleClose = ()=>{
        setIsNote(false)
        setIsHighlight(false)
        setIsWrite(false)
        setMessage(null)
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

    const handleSubmit =async ()=>{
        if (user===null){
            console.log("no user, log in alert")
            return
        }
        const userHighlightRef = doc(firestore, 'notes', user?.uid);
        try {
            await updateDoc(userHighlightRef,{ "notes": arrayUnion({pk:pk,message:message})})
            console.log("added highlight ",message)
                
            }catch (err){
            console.log(err)
            }
     //console.log(firebaseNotes?.length,"fb notes,",firebaseNotes)    
     setIsWrite(false)
    }

    useEffect(()=>{
        console.log(pk,"changed pk")
        if (user!==null) {
            let notesPks = []
            let firebaseMessages = []
            for (let i=0;i<firebaseNotes?.length;i++) {
                notesPks.push(firebaseNotes[i].pk)
                firebaseMessages.push(firebaseNotes[i].message)
            }
            if (notesPks.includes(pk)){
                let index = notesPks.lastIndexOf(pk)
                setMessage(firebaseMessages[index])
            }else{
                setMessage("")
            }
            console.log(firebaseNotes,"hifrebase notes")
            // set message to firebase note if there is one
        }else {
            setMessage("")
        }
    },[pk])

  return (
    <div className={`note-menu ${isNote? "open":""}`}>
        <div className={`note-note ${isWrite? "open":""}`}>
            <FlexRow width={"100%"}>
                <span className='note-note-title'>{book} {chapter} {verse+1}</span>
                <span className='note-close' onClick={()=>setIsWrite(false)}><IconArrowLeft/></span>

            </FlexRow>
            
                <form className='note-form'>
                    <textarea name="message" id="frm-message" rows={4} onChange={(e)=>setMessage(e.target.value)} value={message}>

                    </textarea>
                </form>

        </div>
        <div className='note-options-wrapper'>
           <div className={`note-options ${isHighlight? "":isWrite? "":"open"}`}>
            <span className='note-span'>Copy</span>
            <span  className='note-span' onClick={()=>setIsWrite(true)}>Note</span>
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
            <div className={`highlight-container ${isWrite? "open":""}`}>
                <span className='note-span'>Delete</span>
                <span className='note-span' onClick={()=>setIsWrite(false)}>Cancel</span>
                <span className='note-span' onClick={()=>handleSubmit()}>Save</span>
            </div>
            <span  className='note-cross' onClick={()=>handleClose()}><IconCrossCircled/></span> 
        </div>
        
    </div>
  )
}

export default NoteHamburger