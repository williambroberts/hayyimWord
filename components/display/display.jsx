"use client"
import { getChapter } from '@/app/api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import React,{useContext,useEffect,useState} from 'react'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { v4 as uuidv4 } from 'uuid';
import NoteHamburger from './noteHamburger'
import { DataContext } from '@/contexts/dataContext'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import IconBasic_notebook from '../icons/note'
import Link from 'next/link'
import IconNotes from '../icons/note2'
const Display = () => {
    const [chapter,setChapter]=useState(null)
    const [reFetch,setReFetch]=useState(false)
    
    const [pk,setPk]=useState(undefined)
    const [isWrite,setIsWrite]=useState(false)
    const [clickedVerse,setClickedVerse]=useState(-1)
    const [highlights,setHighlights] = useState(null)
    const [noUserALert,setNoUserAlert]=useState(false)
    const [alertText,setAlertText]=useState(null)
    const {setOpenBookIndex,openBookIndex,setScrollChangeNeeded,scrollChangeNeeded,
        openChapterIndex,setOpenChapterIndex,globalFontSize,isNote,setIsNote,
        isChaptersMenuOpen,setIsChaptersMenuOpen,startVerse,setStartVerse,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)
        const {user}=useContext(IsAUserLoggedInContext)
        const {firebaseHighlights,setFirebaseHighlights,firebaseNotes,setFirebaseNotes} = useContext(DataContext)
        
        const [notePks,setNotePks]=useState(null)
        useEffect(()=>{
          let newpks= []
          for (let i=0;i<firebaseNotes?.length;i++){
            if (!newpks.includes[firebaseNotes[i].pk]){
              newpks.push(firebaseNotes[i].pk)
            }

          }
          setNotePks(newpks)
          console.log(newpks,"new pks")

        },[firebaseNotes])
        useEffect(()=>{
          //console.log("scroll changed needed",startVerse)
          const verseSpans = document.querySelectorAll('.text-paragraph-verse-number');
          //console.log(verseSpans)
          for (const span of verseSpans) {
           // console.log(span.textContent)
            if (span.textContent.includes(startVerse)) {
              const elemPosition = span.getBoundingClientRect()
              const elemPositionY = elemPosition.top + window.pageYOffset;
              //console.log(elemPosition,"elemPos",elemPositionY,"y")
              window.scrollTo({ top: elemPositionY-136, behavior: 'smooth' });
              break; 
            }
          }
      
        },[scrollChangeNeeded])
        const reHighlight = ()=>{
          if (theText!==null && user!==null){
            let firebasePks = []
            let firebaseColors = []
          if (firebaseHighlights?.length===0){
            return
          }
          try {

          
            for (let item of firebaseHighlights){
              firebasePks.push(item.pk)
              firebaseColors.push(item.color)
            }

            const newHighlights =Array(theText.length).fill("var(--bg-1)")
            for (let i=0; i<theText.length; i++){
              if (firebasePks.includes(theText[i].pk)){
                let index = firebasePks.lastIndexOf(theText[i].pk)
                newHighlights[i]=firebaseColors[index]
              }
            }
            

            setHighlights(newHighlights)
            //console.log("new highlight",newHighlights)
          }catch(err){
            console.log(err)
          }
        }
        }
        useEffect(()=>{
          reHighlight()
        },[firebaseHighlights])

        useEffect(()=>{
          reHighlight()
        },[theText])
    useEffect(()=>{
      const fetchAnotherTime = async ()=>{
        
        const text = await getChapter(bollsTranslation,openBookIndex+1,openChapterIndex+1)
        setTheText(text)
        console.log(text,"fetched the text another time")
        setDisplayTitle([openBookIndex,openChapterIndex])
         
   }
   fetchAnotherTime()
  
    },[reFetch])

    const highlightedVerseStyles = {
        color: "var(--red)",
        cursor:"pointer",
       // backgroundColor:"#FFF36D"
    }
    const RemoveHighlight = ()=>{
        setStartVerse(-1)
        console.log("removed highlight")
        
    }
    const handleLeft = async ()=>{
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

      //console.log(openBookIndex,openChapterIndex,"old")
      if (openChapterIndex===0){
        setOpenBookIndex((prev)=>{return Math.max(0,openBookIndex-1)})
        
      }else{
        setOpenChapterIndex((prev)=>{return prev-1})
      }
     // console.log(openBookIndex,openChapterIndex,"new")
    setReFetch((prev)=>!prev)
    }

    const handleRight = ()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
     // console.log(openBookIndex,openChapterIndex,"old")
      if (openChapterIndex===chaptersAndVerses[openBookIndex].chapters-1){
        setOpenBookIndex((prev)=>Math.min(prev+1,65))
        setOpenChapterIndex(0)
        
      }else{
        setOpenChapterIndex((prev)=>prev+1)
      }
      //console.log(openBookIndex,openChapterIndex,"new") 
      setReFetch((prev)=>!prev)
    }
    
    const handleClick = (index) =>{
      if (startVerse!==-1){
        setStartVerse(-1)
        return
      }
      if (isNote && clickedVerse!==-1) {
        setClickedVerse(-1)
        setIsNote(false)
      }else{
        setClickedVerse(index)
        setIsNote(true)
        setPk(theText[index].pk)
      }
     // console.log(theText[index].pk,index,", pk, index")
     
     
    }
    const handleNoteOpen = (index)=>{
      setIsNote(true)
      setIsWrite(true)
      setClickedVerse(index)
      setPk(theText[index].pk)
    }
    useEffect(()=>{
      if (noUserALert===true){

        setTimeout(()=>{
          console.log("alert no user")
          setNoUserAlert(false)
        },3000)
      }
    },[noUserALert])
  return (
    <div className='display'>
      <span className='text-title'>{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span>
        <p className='text-paragraph' style={{fontSize:`${globalFontSize}px`}}>{theText?.map((item,index)=> <span key={uuidv4()} className='text-span'
        onClick={()=>RemoveHighlight()} style={{fontSize:`${globalFontSize}px`,backgroundColor:clickedVerse===index? "var(--theme2)":highlights!==null? `${highlights[index]}`:""}}
       > 
      <span className='text-paragraph-verse-number' style={{fontSize:`${globalFontSize}px`}}>{item.verse}  
      {notePks?.includes(theText[index].pk)? <abbr className='text-span-notebook' onClick={()=>handleNoteOpen(index)} title='view your note'><IconNotes/></abbr>:" "}</span>
      
      <span className='text-paragraph-verse-text' style={index+1===startVerse? {...highlightedVerseStyles}:{}}  onClick={()=>handleClick(index)}> 
      {item.text.replace(/<br\s*\/?>/gi, ". ").replace(/<i>|<\/i>/g, '')}</span>
       
        </span>
        
        )}</p>
        <div className='turner-container'>
           <span className='turner-left' onClick={()=>handleLeft()} 
        style={{display:` ${openBookIndex+openChapterIndex===0? "none":"flex"}  `}}>❮</span>
        <span className='turner-right'onClick={()=>handleRight()} 
        style={{display:` ${openBookIndex===65 && openChapterIndex===21? "none":"flex"}  `}}>❯</span>
        </div>
       
    
    
    
    {/* <div className={`note-blur ${isNote? "open":""}`} onClick={()=>setIsNote(false)}>
    </div> */}
    <NoteHamburger noUserALert={noUserALert} setNoUserAlert={setNoUserAlert} setAlertText={setAlertText}
    isWrite={isWrite} setIsWrite={setIsWrite} text={clickedVerse!==-1? theText[clickedVerse]?.text:""}
    isNote={isNote} setIsNote={setIsNote} pk={pk} book={chaptersAndVerses[displayTitle[0]].name} chapter={displayTitle[1]+1} verse={clickedVerse}/>
   
   <div className={`display-alert ${noUserALert? "open":""}`}>
      Please <Link href={"/login"}>log in</Link> to {alertText}
   </div>
    </div>
  )
}

export default Display