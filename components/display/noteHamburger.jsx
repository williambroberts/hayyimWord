"use client"
import React, { useContext, useEffect, useState } from 'react'
import IconCrossCircled from '../icons/action/cross'
import { DataContext } from '@/contexts/dataContext'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { firestore } from '@/firebase/firebaseConfig'
import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot,updateDoc,runTransaction,arrayUnion } from "firebase/firestore";
import { Inter } from 'next/font/google'
const inter =Inter({subsets:["latin"]})
import { BookContext } from '@/contexts/books'
import FlexRow from '../setup/flexRow'
import IconArrowLeft from '../icons/navigation/arrowLeft'
import IconDelete from '../icons/action/delete'
const NoteHamburger = ({isNote,setIsNote,id,exactId,chapter,book,verse,isWrite,
    setIsWrite,text,setNoUserAlert,setAlertText,noUserAlert,title,setSelectedWords}) => {
    const [isHighlight,setIsHighlight]=useState(false)
    const thedate = new Date()
    const theDay=thedate.getDate()
    const theYear = thedate.getFullYear()
    const theMonth=thedate.getMonth()+1
    const fulldate = theDay+"/"+theMonth+"/"+theYear
    const [message,setMessage]=useState("")
    const {user}=useContext(IsAUserLoggedInContext)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,scrollChangeNeeded,setScrollChangeNeeded,strongText,isStrong,
        isChaptersMenuOpen,setIsChaptersMenuOpen,setIsStrong,searchData,setSearchData,isSearch,setIsSearch,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,strongData,
        startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,searchFound,
        setRecentSearches,
        } = useContext(BookContext)
    const {firebaseHighlights,setFirebaseHighlights,firebaseNotes,setFirebaseNotes} = useContext(DataContext)
    const [color,setColor]=useState(null)
    const [updateHighlight,setUpdateHighlight]=useState(false)
    const [mounted,setMounted]=useState(false)
    const [isCopied,setIsCopied]=useState(false)
    const handleClose = ()=>{
        setIsNote(false)
        setIsHighlight(false)
        setIsWrite(false)
        setMessage("")
        setSelectedWords([])
        
    }
    useEffect(()=>{
        if (!isNote) {
            setIsHighlight(false)
        }
    },[isNote])
    const handleHighlight =(color)=>{
        if (exactId.includes("verse")){
            console.log("returning")
            return
        }
        setColor(color)
        setUpdateHighlight((prev)=>!prev)

    }

    const highlightVerse = async()=>{
           
        if (user===null){
            console.log("no user, log in alert")
            setNoUserAlert((prev)=>true)

            return
        }
        const userHighlightRef = doc(firestore, 'notes', user?.uid);
        try {
            await updateDoc(userHighlightRef,{ "highlights": arrayUnion({exactId:exactId,color:color,verse:verse+1,book:book,chapter:chapter,text:text,bookid:openBookIndex+1,date:fulldate})})
            console.log("added highlight ",color, `book${book} chapter ${chapter}, verse ${verse+1}, text ${text} ${fulldate}`)
                
            }catch (err){
            console.log(err)
            }
        
    }
    const highlightVerse2 =async ()=>{
        //runtransaction  
      
        if (user===null){
            console.log("no user, log in alert")
            setNoUserAlert((prev)=>true)
            setAlertText("highlight a verse.")
            return
        }
        if (color===null){
            return
        }
        if (exactId.includes("verse")){
            return
        }
        const useHighlightsRef = doc(firestore, 'notes', user?.uid);
     try {
          await runTransaction(firestore, async (transaction) => {
            const docSnapshot = await transaction.get(useHighlightsRef);
           const highlights = [...docSnapshot.data().highlights]
            console.log(highlights,"pre delete notes")
         
          let updatedHighlights = highlights.filter((item,index)=>item.exactId!==exactId)
          updatedHighlights.push({exactId:exactId,color:color,verse:verse+1,book:book,chapter:chapter,text:text,bookid:openBookIndex+1,date:fulldate})
          transaction.update(useHighlightsRef, { highlights: updatedHighlights })
          console.log("added highlight ",color, `book${book} chapter ${chapter}, verse ${verse+1}, text ${text} ${fulldate}`)
          })
      
          
        } catch (error) {
          console.error('Error rehighlightig/highlighting : ', error);
        } 
    }
    useEffect(()=>{
        if (mounted){
             highlightVerse2()
        }
       
       // highlightVerse()
        
    },[updateHighlight])

    const handleSubmit =async ()=>{
        if (user===null){   
            console.log("no user, log in alert")
           
            setNoUserAlert((prev)=>true)
             setAlertText("to take a note.")
            return
        }
        const userHighlightRef = doc(firestore, 'notes', user?.uid);
        try {
            await updateDoc(userHighlightRef,{ "notes": arrayUnion({exactId:exactId,message:message,text:text,verse:verse+1,chapter:chapter,book:book,bookid:openBookIndex+1,date:fulldate})})
            
            let myElem = document.querySelector(`#${exactId}`)
            myElem.classList.add("noted")

            console.log("added note ",message,myElem)
            }catch (err){
            console.log(err)
            }
     //console.log(firebaseNotes?.length,"fb notes,",firebaseNotes)    
     setIsWrite(false)
    }
    useEffect(()=>{
        setMounted(true)
    },[])
    useEffect(()=>{
       
        if (user!==null) {
            let notesExactIds = []
            let firebaseMessages = []
            for (let i=0;i<firebaseNotes?.length;i++) {
                notesExactIds.push(firebaseNotes[i].exactId)
                firebaseMessages.push(firebaseNotes[i].message)
            }
            if (notesExactIds.includes(exactId)){
                let index = notesExactIds.lastIndexOf(exactId)
                setMessage(firebaseMessages[index])
            }else{
                setMessage("")
            }
            //console.log(firebaseNotes,"hifrebase notes")
            // set message to firebase note if there is one
        }else {
            setMessage("")
        }
    },[exactId])

     const handleDelete2 = async ()=>{
        if (user===null){
            console.log("no user, log in alert")
            setNoUserAlert((prev)=>true)
            setAlertText("to delete a note.")
            return
        }
        const userNoteRef = doc(firestore, 'notes', user?.uid);
     try {
          await runTransaction(firestore, async (transaction) => {
            const docSnapshot = await transaction.get(userNoteRef);
           const notes = [...docSnapshot.data().notes]
            console.log(notes,"pre delete notes")
         
          let updatedNotes = notes.filter((item,index)=>item.exactId!==exactId)
          transaction.update(userNoteRef, { notes: updatedNotes })
           console.log("deleted that note",message) 
          })
          let myElem = document.querySelector(`#${exactId}`)
          myElem.classList.remove("noted")
          
        } catch (error) {
          console.error('Error deleting note: ', error);
        }
        setIsWrite(false)
        setMessage("")
      }

    const handleDelete = async ()=>{
        if (user===null){
            console.log("no user, log in alert")
            setNoUserAlert((prev)=>true)
            return
        }
        const userHighlightRef = doc(firestore, 'notes', user?.uid);
        try {
            await updateDoc(userHighlightRef,{ "notes": arrayUnion({exactId:exactId,message:""})})
            console.log("delted note ",message)
                
            }catch (err){
            console.log(err)
            }
        setIsWrite(false)
        setMessage("")
    }
    const handleDeleteHighlight =async ()=>{
        if (user===null){
            console.log("no user, log in alert")
            setNoUserAlert((prev)=>true)
            setAlertText("to delete a highlight.")
            return
        }
        const userNoteRef = doc(firestore, 'notes', user?.uid);
     try {
          await runTransaction(firestore, async (transaction) => {
            //get sapshot of document
            const docSnapshot = await transaction.get(userNoteRef);
            //Transaction functions should not directly modify application state.
           const highlights = [...docSnapshot.data().highlights]
            console.log(highlights,"pre delete highlights")
         
          let updatedHighlights = highlights.filter((item,index)=>item.exactId!==exactId)
          transaction.update(userNoteRef, { highlights: updatedHighlights })
           console.log("deleted that highlight",exactId,color) 
          })
      
          
        } catch (error) {
          console.error('Error deleting highlight: ', error);
        }
    }
    const handleCopy = ()=>{
        navigator.clipboard.writeText(`${book} ${chapter}:${verse+1} ${text}`)
        setIsCopied(true)
       setTimeout(()=>{
            setIsCopied(false)
        },1000)
        
        console.log(text,"copied")

    }
    useEffect(()=>{
        if (isWrite){
            setIsStrong(false)
        }else if( strongText!=="") {
            setIsStrong(true)
        }
    },[isWrite])
  const handleFoundToSearch = ()=>{
    setIsSearch((prev)=>true)
    let gotSearchesRaw = localStorage.getItem("recentSearches")
    let gotSearches = JSON.parse(gotSearchesRaw)
    if (gotSearches===null){
     // console.log("no recent searches") 
      localStorage.setItem("recentSearches",JSON.stringify([strongText]))
      setRecentSearches([strongText])
    }else {
      if (!gotSearches.includes(strongText)){
        // console.log(gotSearches,"recent searches",typeof(gotSearches))
      gotSearches.push(strongText)
      localStorage.setItem("recentSearches",JSON.stringify(gotSearches))
      setRecentSearches(gotSearches)
      }
     
    }
  }
  return (
    <div className={`note-menu ${isNote? "open":""}`}>
        <div className={`note-note ${isWrite? "open":""}`}>
            <FlexRow width={"100%"}>
                <span className='note-note-title'><strong>{book} {chapter}:{verse+1}</strong></span>
                <span className='note-close' onClick={()=>setIsWrite(false)}><IconArrowLeft/></span>

            </FlexRow>
            
                <form className='note-form'>
                    <textarea name="message" placeholder='Type note here...' className={inter.className}
                    id="frm-message" rows={4} onChange={(e)=>setMessage(e.target.value)} value={message}>

                    </textarea>
                </form>

        </div>
        <div className={`note-dict ${isStrong? "open":""}`}>
            <div className="note-dict-top">
                    <span className='note-dict-title'>{strongData?.lexeme}</span>
                    <span className='note-dict-found' onClick={()=>handleFoundToSearch()}>Found {searchFound} verses</span>
                    <span className='note-cross' onClick={()=>setIsStrong((prev)=>false)}><IconCrossCircled/></span>
            </div>
            <span className='note-dict-strong'>Strongs: {strongText}</span>
            <span className='note-dict-item'>Transliteration: {strongData?.transliteration}</span>
            <span className='note-dict-item'> Pronunciation: {strongData?.pronunciation}</span>
            <span className='note-dict-item'>{strongData?.short_definition}</span>
        </div>

        <div className='note-options-wrapper'>
           <div className={`note-options ${isHighlight? "":isWrite? "":"open"}`}>
            <span className='note-span' onClick={()=>handleCopy()}>{isCopied? "Done": "Copy"}</span>
            <span  className='note-span' onClick={()=>setIsWrite(true)}>Note</span>
            <span  className='note-span' onClick={()=>setIsHighlight(true)}>Highlight</span>
             
        </div>
         
            <div className={`highlight-container ${isHighlight? "open":""}`}>
                <span onClick={()=>setIsHighlight(false)} className='highlight-close'>❮</span>
                <div className='highlight-colors'>
                    <span className='highlight-none' onClick={()=>handleDeleteHighlight()}><IconDelete/></span>
                    <span className='highlight-red' onClick={()=>handleHighlight("#ff78424b")}></span>
                    <span className='highlight-orange'onClick={()=>handleHighlight("#f7aa3572")}></span>
                    <span className='highlight-yellow'onClick={()=>handleHighlight("#FFF36D")}></span>
                    <span className='highlight-green' onClick={()=>handleHighlight("#d9f7bf50")}></span>
                    <span className='highlight-blue' onClick={()=>handleHighlight("#2edae30f")}></span>
                    <span className='highlight-purple'onClick={()=>handleHighlight("#c8bff7")}></span>
                </div>
            </div>
            <div className={`highlight-container ${isWrite? "open":""}`}>
                <span className='note-span' onClick={()=>handleDelete2()}>Delete</span>
                <span className='note-span' onClick={()=>setIsWrite(false)}>Cancel</span>
                <span className='note-span' onClick={()=>handleSubmit()}>Save</span>
            </div>
           {isStrong? "": <span  className='note-cross' onClick={()=>handleClose()}><IconCrossCircled/></span> }
        </div>
        

    </div>
  )
}

export default NoteHamburger
