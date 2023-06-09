"use client"
import React,{useContext} from 'react'
import { getChapter } from '../api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import { useRouter } from 'next/navigation'
import IconDelete from '@/components/icons/action/delete'
import { firestore } from '@/firebase/firebaseConfig'
import { doc,runTransaction } from 'firebase/firestore'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
const HightlightItem = ({item}) => {
    const router = useRouter()
    //console.log(item)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,
        isChaptersMenuOpen,setIsChaptersMenuOpen,setScrollChangeNeeded,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
        startVerse,setStartVerse,theText,setTheText
        } = useContext(BookContext)
        const {user}=useContext(IsAUserLoggedInContext)
    const handleGoto =async ()=>{
        
       console.log("get frmo highlight",item.bookid)
        setOpenBookIndex(item.bookid-1)
        setStartVerse(item.verse)
        setOpenChapterIndex(item.chapter-1)
        const data = await getChapter(bollsTranslation,parseInt(item.bookid),parseInt(item.chapter))
        setTheText(data)
        setScrollChangeNeeded((prev)=>!prev)
        router.push("/")
    }
    const handleDeleteHighlight =async ()=>{
      if (user===null){
          console.log("no user, log in alert")
          return
      }
      const userNoteRef = doc(firestore, 'notes', user?.uid);
   try {
        await runTransaction(firestore, async (transaction) => {
          const docSnapshot = await transaction.get(userNoteRef);
         const highlights = [...docSnapshot.data().highlights]
          console.log(highlights,"pre delete highlights")
       
        let updatedHighlights = highlights.filter((saved,index)=>saved.exactId!==item.exactId)
        transaction.update(userNoteRef, { highlights: updatedHighlights })
         console.log("deleted that highlight",item.exactId,item.color) 
        })
    
        
      } catch (error) {
        console.error('Error deleting highlight: ', error);
      }
  }
  return (
    <div className='note-wrapper'>

    
    <div className='note-delete' onClick={()=>handleDeleteHighlight()}><IconDelete/></div>
    <div className='highlight-item' onClick={()=>handleGoto()}>
    <span className='note-title'>{item.book} {item.chapter}:{item.verse}
    <span className='highlight-indicator' style={{backgroundColor:item.color}}></span>
    <span className='note-date'>{item.date}</span>
    <span className='note-icon'>&#8250;</span> 
    </span>
   <span className='highlight-result-item-text' >{item.text}</span>
   {/* {formattedStr===''? "": <div className="search-result-item-text" dangerouslySetInnerHTML={{ __html: formattedStr }}/>} */}
</div>
</div>
  )
}

export default HightlightItem