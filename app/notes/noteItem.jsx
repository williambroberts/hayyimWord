"use client"
import React,{useContext,useEffect,useState} from 'react'
import { getChapter } from '../api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import { useRouter } from 'next/navigation'
import FlexRow from '@/components/setup/flexRow'
import { firestore } from '@/firebase/firebaseConfig'
import { doc,runTransaction } from 'firebase/firestore'
import IconDelete from '@/components/icons/action/delete'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
const NoteItem = ({item}) => {
    const router = useRouter()
    console.log(item)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,
        isChaptersMenuOpen,setIsChaptersMenuOpen,setScrollChangeNeeded,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
        startVerse,setStartVerse,theText,setTheText
        } = useContext(BookContext)
        const {user}=useContext(IsAUserLoggedInContext)
    const handleGoto =async ()=>{
        
       console.log("get frmo note",item.bookid)
        setOpenBookIndex(item.bookid-1)
        setStartVerse(item.verse)
        setOpenChapterIndex(item.chapter-1)
        const data = await getChapter(bollsTranslation,parseInt(item.bookid),parseInt(item.chapter))
        setTheText(data)
        setScrollChangeNeeded((prev)=>!prev)
        router.push("/")
    }
    const handleDelete2 = async ()=>{
      if (user===null){
          console.log("no user, log in alert")
          return
      }
      const userNoteRef = doc(firestore, 'notes', user?.uid);
   try {
        await runTransaction(firestore, async (transaction) => {
          const docSnapshot = await transaction.get(userNoteRef);
         const notes = [...docSnapshot.data().notes]
          console.log(notes,"pre delete notes")
       
        let updatedNotes = notes.filter((note,index)=>note.pk!==item.pk)
        transaction.update(userNoteRef, { notes: updatedNotes })
         console.log("deleted that note",item.message) 
        })
    
        
      } catch (error) {
        console.error('Error deleting note: ', error);
      }
      //setIsWrite(false)
      //setMessage("")
    }

  return (
    <div  className='note-wrapper'>
        <div className='note-delete' onClick={()=>handleDelete2()}><IconDelete/></div>
     <div className='note-item' onClick={()=>handleGoto()}>
       <span className='note-title'>{item.book} {item.chapter}:{item.verse}
    <span className='note-date'>{item.date}</span>
    <span className='note-icon'>&#8250;</span> 
    </span>
    <span className='note-item-text'><strong>Context:</strong> {item.text.slice(0,100)}...</span>
   <span className='note-item-text'><strong>Note:</strong> {item.message.slice(0,50)}...</span>
     </div>

      
   
</div>
  )
}

export default NoteItem