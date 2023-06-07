"use client"
//import { getChapter } from '@/app/api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import React,{useContext,useEffect,useState} from 'react'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { v4 as uuidv4 } from 'uuid';
import NoteHamburger from './noteHamburger'
import { DataContext } from '@/contexts/dataContext'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import IconBasic_notebook from '../icons/note'
import Link from 'next/link'
import getText from '@/app/api/bible/getText'
import IconNotes from '../icons/note2'
const Display = () => {
    //const [chapter,setChapter]=useState(null)
    const [reFetch,setReFetch]=useState(false)
    
    const [id,setId]=useState(undefined) //verse api id , 
    const [exactId,setExactId]=useState(undefined) // word id
    const [isWrite,setIsWrite]=useState(false)
    const [clickedVerse,setClickedVerse]=useState(-1)
    const [highlights,setHighlights] = useState(null)
    const [noUserALert,setNoUserAlert]=useState(false)
    const [alertText,setAlertText]=useState(null)
    const [mounted,setMounted]=useState(false)
    const [displayText,setDisplayText]=useState(null)
    const {setOpenBookIndex,openBookIndex,setScrollChangeNeeded,scrollChangeNeeded,globalLineHeight,
        openChapterIndex,setOpenChapterIndex,globalFontSize,isNote,setIsNote,
        isChaptersMenuOpen,setIsChaptersMenuOpen,startVerse,setStartVerse,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)
        const {user}=useContext(IsAUserLoggedInContext)
        const {firebaseHighlights,setFirebaseHighlights,firebaseNotes,setFirebaseNotes} = useContext(DataContext)
        
        const [noteids,setNoteids]=useState(null)
        useEffect(()=>{
          if (user){
            let newids= []
          for (let i=0;i<firebaseNotes?.length;i++){
            if (!newids.includes[firebaseNotes[i].exactId]){
              newids.push(firebaseNotes[i].exactId)
            }

          }
          setNoteids(newids)
          console.log(newids,"new ids")
          }else {
            setNoteids((prev)=>null)
          }
          

        },[firebaseNotes,user])
        useEffect(()=>{
         
          const verseSpans = document.querySelectorAll('.text-paragraph-verse-number');
         
          for (const span of verseSpans) {
        
            if (span.textContent.includes(startVerse)) {
              const elemPosition = span.getBoundingClientRect()
              const elemPositionY = elemPosition.top + window.pageYOffset;
             
              window.scrollTo({ top: elemPositionY-136, behavior: 'smooth' });
              break; 
            }
          }
      
        },[scrollChangeNeeded])
        const reHighlight = ()=>{
          if (theText!==null && user!==null){
            let firebaseids = []
            let firebaseColors = []
          if (firebaseHighlights?.length===0){
            return
          }
          try {

          
            for (let item of firebaseHighlights){
              firebaseids.push(item.id)
              firebaseColors.push(item.color)
            }

            const newHighlights =Array(theText?.length).fill("var(--bg-1)")
            for (let i=0; i<theText?.length; i++){
              if (firebaseids.includes(theText[i].id)){
                let index = firebaseids.lastIndexOf(theText[i].id)
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
          setMounted(true)
        },[])
        useEffect(()=>{
         // reHighlight()
          console.log(noteids,"noteids")
            if (firebaseNotes!==null){

            
             for (let note of firebaseNotes){
            
            try{
              let myElem= document.querySelector(`#${note.exactId}`)
              if (myElem!==null){
               
                myElem.classList.add(".noted")
               console.log(myElem.classList,myElem.innerHTML)
              }
            }catch(err){
              console.log(err)
            }
           
          }
          }
         
        },[noteids])
    useEffect(()=>{
      const fetchAnotherTime = async ()=>{
        let reference = chaptersAndVerses[openBookIndex].shortname+parseInt(openChapterIndex+1)
        let data = await getText("kjv_strongs",reference)
       
        setTheText(data.results.kjv_strongs)
       // console.log(text,"fetched the text another time")
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
      if (startVerse!==-1){
        setStartVerse(-1)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });

      //console.log(openBookIndex,openChapterIndex,"old")
      if (openChapterIndex===0){
        setOpenBookIndex((prev)=>{return Math.max(0,openBookIndex-1)})
        if (openBookIndex!==0){
          setOpenChapterIndex(chaptersAndVerses[openBookIndex-1].chapters-1)
        }
      }else{
        setOpenChapterIndex((prev)=>{return prev-1})
      }
     // console.log(openBookIndex,openChapterIndex,"new")
    setReFetch((prev)=>!prev)
    }

    const handleRight = ()=>{
      if (startVerse!==-1){
        setStartVerse(-1)
      }
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
    useEffect(()=>{
      console.log("ching")
      try {
        let myElem = document.querySelector(`#${exactId}`)
        
         if (myElem!==null){
         if (myElem.id.includes("verse")){
            let myVerse = document.querySelector(`.verse${clickedVerse}`)
            console.log("my verse",myVerse,`.verse${clickedVerse}`)
            myVerse.style.backgroundColor="var(--theme2)"
         }else{
           myElem.style.backgroundColor="var(--theme2)"
         }
       console.log(myElem.style.color,"color",myElem)
         
       
      }
      }catch(err){
        console.log(err)
      }
      
     
      console.log(exactId)
      
    },[exactId])
    const handleClick = (e,index) =>{
      console.log("handleClick")
      if (startVerse!==-1){
        setStartVerse(-1)
        return
      }

      const clickedElement = e.target;
      
      let rowId = parseInt(clickedElement.id.split("V")[1])
      console.log(rowId,clickedVerse,index)
      if (isNote && clickedVerse!==-1 && rowId!==id) {
        setClickedVerse(-1)
        setIsNote(false)
      }
      else if (isNote && clickedVerse!==-1 && rowId===id){
        setExactId(clickedElement.id)
      
      }else{
        console.log(index,"index")
        setExactId(clickedElement.id)
        console.log(clickedElement);
         setClickedVerse(index)
        setIsNote(true)
        setId(theText[index]?.id)
      }
     console.log(theText[index].id,index,", id, index",clickedElement.id,"exact id")
     
     
    }
    const handleNoteOpen = (index)=>{
      setIsNote(true)
      setIsWrite(true)
      setClickedVerse(index)
      setId(theText[index].id)
    }
    useEffect(()=>{
      const toggleAlert = ()=>{
        if (noUserALert===true){
        if (!mounted){
          return
        }else{
          setTimeout(()=>{
          console.log("alert no user")
          setNoUserAlert(false)
        },3000)
        }
        
      }
      }
      toggleAlert()
    },[noUserALert])
   // console.log(theText,"theText")
    useEffect(()=>{
      let newDisplayText=[]
      //let textverses = document.querySelectorAll('.text-paragraph-verse-text')
      
      if (theText !==null){
        for (let i=0; i<theText.length;i++){
          //let newText = theText[i].text.replace(/(\w+)\{([\w\d]+)\}/g, `<span title="$2">$1</span>`).replace(/\{[^ ]+/g, '')
          let newText = theText[i].text.split(" ")
          let nt = ""
          for (let item of newText){
            if (item.includes("{")){
                let ni = item.replace(/(\w+)\{([\w\d]+)\}/g, `<span title="$2">$1</span>`).replace(/\{[^ ]+/g, '')
            nt+=ni 
            }else {
                let ni = "<span>"+item+"</span>"
                 nt+=ni 
            }
           
        }
          
          
          const newElem = document.createElement('div')
          
          newElem.innerHTML=nt
          newElem.querySelectorAll('span').forEach((item,index)=>{
            const span = document.createElement('span');
            span.textContent = item.textContent;
            span.title=item.title
            item.title!==""? span.className="text-text-span-u" :  span.className="text-text-span"
            let newid = "V"+theText[i].id+"V"+(index+1)
            span.id = newid
            // span.onclick=handleClick(index)
           // console.log(item,typeof(item))
            item.replaceWith(span)
            if (noteids?.includes(newid)){
              span.classList.add(".noted")
              span.style.color="red"
            }

          })
          newDisplayText.push(newElem) //or .innerHTML
          //newDisplayText.push(newElem)
         // textverses[i].innerHTML="newText"
         // console.log(textverses[i])
        // console.log(newText,typeof(newText))
        }
        setDisplayText([...newDisplayText])
       // console.log(newDisplayText[0].innerHTML,typeof(newDisplayText[0].innerHTML))

      }
      
      
    },[theText])
  return (
    <div className='display'>
      <span className='text-title'>{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span>
        <p className='text-paragraph' style={{fontSize:`${globalFontSize}px`,lineHeight:`${globalLineHeight}`}}>{theText?.map((item,index)=> <span key={uuidv4()} className='text-span'
        onClick={(e)=>handleClick(e,index)} style={{fontSize:`${globalFontSize}px`,backgroundColor:highlights!==null? `${highlights[index]}`:""}}
       > 
      <span className='text-paragraph-verse-number' style={{fontSize:`${globalFontSize}px`}} id={`verse${theText[index].id}-0`}>{item.verse}  
      {noteids?.includes(theText[index].id)? <abbr className='text-span-notebook' onClick={()=>handleNoteOpen(index)} title='view your note'><IconNotes/></abbr>:" "}</span>
      
     
 {displayText!==null?  displayText!==undefined? <span style={index+1===startVerse? {...highlightedVerseStyles}:{}} 
 onClick={()=>RemoveHighlight()} 
 className={`text-text verse${index}`}  dangerouslySetInnerHTML={{ __html: displayText[index]?.innerHTML }}/>: "" : ""}
     
       
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
    <NoteHamburger noUserALert={noUserALert} setNoUserAlert={setNoUserAlert} setAlertText={setAlertText} exactId={exactId}
    isWrite={isWrite} setIsWrite={setIsWrite} text={clickedVerse!==-1? theText[clickedVerse]?.text:""}
    isNote={isNote} setIsNote={setIsNote} id={id} book={chaptersAndVerses[displayTitle[0]].name} chapter={displayTitle[1]+1} verse={clickedVerse}/>
   
   <div className={`display-alert ${noUserALert? "open":""}`}>
      Please <Link href={"/login"}>log in</Link> to {alertText}
   </div>
    </div>
  )
}

export default Display