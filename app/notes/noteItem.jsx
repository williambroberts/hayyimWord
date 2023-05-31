"use client"
import React,{useContext} from 'react'
import { getChapter } from '../api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import { useRouter } from 'next/navigation'
const NoteItem = ({item}) => {
    const router = useRouter()
    console.log(item)
    const {setOpenBookIndex,openBookIndex,
        openChapterIndex,setOpenChapterIndex,
        isChaptersMenuOpen,setIsChaptersMenuOpen,setScrollChangeNeeded,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
        startVerse,setStartVerse,theText,setTheText
        } = useContext(BookContext)
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
  return (
    <div className='note-item' onClick={()=>handleGoto()}>
    <span className='note-title'>{item.book} {item.chapter}:{item.verse}
    <span className='search-result-icon'>&#8250;</span> 
    </span>
    <span className='note-item-text'><strong>Context:</strong> {item.text.slice(0,100)}...</span>
   <span className='note-item-text'><strong>Note:</strong> {item.message.slice(0,50)}...</span>
   {/* {formattedStr===''? "": <div className="search-result-item-text" dangerouslySetInnerHTML={{ __html: formattedStr }}/>} */}
</div>
  )
}

export default NoteItem