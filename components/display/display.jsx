"use client"
//import { getChapter } from '@/app/api/bible/getChapter'
import { BookContext } from '@/contexts/books'
import React,{Suspense, useContext,useEffect,useState} from 'react'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { v4 as uuidv4 } from 'uuid';
import NoteHamburger from './noteHamburger'
import { DataContext } from '@/contexts/dataContext'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import IconBasic_notebook from '../icons/note'
import Link from 'next/link'
import getText from '@/app/api/bible/getText'
import IconNotes from '../icons/note2'

import Loading from '@/app/loading';
import ProgressBible from '../header/progress';

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
    const [pureText,setPureText]=useState(null)
    const [textArrays,setTextArrays]=useState(null)
    const [title,setTitle]=useState(null)
    const [firebaseHighlightsColors,setFirebaseHighlightsColors]=useState(null)
    const [firebaseHighlightsIds,setFirebaseHighlightsIds]=useState(null)
    const [selectedWords,setSelectedWords]=useState([])
    const {setOpenBookIndex,openBookIndex,setScrollChangeNeeded,scrollChangeNeeded,globalLineHeight,
        openChapterIndex,setOpenChapterIndex,globalFontSize,isNote,setIsNote,strongText,setStrongText,
        isChaptersMenuOpen,setIsChaptersMenuOpen,startVerse,setStartVerse,isStrong,setIsStrong,isSearch,
        isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,theText,setTheText,displayTitle,setDisplayTitle
        } = useContext(BookContext)
        const {user}=useContext(IsAUserLoggedInContext)
        const {firebaseHighlights,setFirebaseHighlights,firebaseNotes,setFirebaseNotes} = useContext(DataContext)
        
        const [noteids,setNoteids]=useState(null)
        useEffect(()=>{
          if (!isSearch){
            
            console.log("strongText,isNote,isStrong",strongText,isNote,isStrong,)
          }
        },[isSearch])
        useEffect(()=>{
          setIsNote(false)
          return ()=>setIsNote(false)
        },[])
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
              firebaseids.push(item.exactId)
              firebaseColors.push(item.color)
            }
            setFirebaseHighlightsColors(firebaseColors)
            setFirebaseHighlightsIds(firebaseids)
            // const newHighlights =Array(theText?.length).fill("var(--bg-1)")
            // for (let i=0; i<theText?.length; i++){
            //   if (firebaseids.includes(theText[i].exactId)){
            //     let index = firebaseids.lastIndexOf(theText[i].exactId)
            //     newHighlights[i]=firebaseColors[index]
            //   }
            // }
            

            //setHighlights(newHighlights)
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

    useEffect(()=>{
     
      let parent = document.querySelector(".text-paragraph")
      let strongWords = parent.querySelectorAll(".verse-span-u")
       console.log(strongText,strongWords)

    },[strongText])
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
   
    const handleClick = (e,index) =>{
      console.log("handleClick")
      
      if (startVerse!==-1){
        setStartVerse(-1)
        return
      }else if (isWrite){
        //if note taking cant click off but by button only
        return
      }
      let newSelectedWords= []
      const clickedElement = e.target;
      //if clicked element not a  word close
      let rowId = parseInt(clickedElement.id.split("V")[1])
      console.log(rowId,clickedVerse,index,clickedElement.id,exactId)
      if (clickedElement.id===exactId){
        if (isNote){
           setIsNote(false)
        setClickedVerse(-1)
        setSelectedWords(newSelectedWords)
       
        }else {
          setIsNote(true)
          setClickedVerse(index)
          newSelectedWords = clickedElement.id
          setSelectedWords(newSelectedWords)
          setIsStrong(true)
          console.log("check here will 1")
        }
       
        console.log("exact id same")
       
        
      }else if (clickedElement.className==="text-span"){
        setIsNote(false)
        setClickedVerse(-1)
       
        setSelectedWords(newSelectedWords)
        setExactId(-1)
      }else if (clickedElement.id!==exactId){
        setIsNote(true)
        setClickedVerse(index)
        setExactId(clickedElement.id)
        //when click on diff word , keep little note menu open but close note taking
        setIsWrite(false)
        if (clickedElement.className==="text-paragraph-verse-number"){
          newSelectedWords.push(clickedElement.id)
            for (let word of textArrays[index]){
              newSelectedWords.push(word.exactId)
            }
            setSelectedWords([...newSelectedWords])
         
     
        }else {
          newSelectedWords=[clickedElement.id]
          setSelectedWords([...newSelectedWords])
          console.log(clickedElement.title)
          setStrongText(clickedElement.title)
          let position = clickedElement.getBoundingClientRect()
          let HeightFromBottom = window.innerHeight-position.bottom
          console.log(HeightFromBottom,"height")
          if (HeightFromBottom<200){
            window.scrollBy(0,200)
          }
          if (clickedElement.title!==""){
            setIsStrong(true)
           console.log("check here will 2")
          }else {
            setIsStrong(false)
          }
        }
       
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
        let bigx = []
        let newPureText=[]
        for (let i=0; i<theText.length;i++){

          let wordsOnly = theText[i].text.replace(/\{.*?\}/g, '')
          newPureText.push(wordsOnly)
          let newText = theText[i].text.split(" ")
          let nt = ""
          let x = []
          for (let j=0; j<newText.length;j++){
            if (newText[j].includes("{")){
                let ni = newText[j].replace(/(\w+)\{([\w\d]+)\}/g, `<span title="$2">$1</span>`).replace(/\{[^ ]+/g, '')
                let xi = newText[j].replace(/(\w+)\{([\w\d]+)\}/g, `$2 $1`).replace(/\{[^ ]+/g, '').split(" ")
                let no = {strong:xi[0],word:xi[1],exactId:"V"+theText[i].id+"V"+(j+1)}
                x.push(no)
               nt+=ni 
            }else {
                let ni = "<span>"+newText[j]+"</span>"
                 nt+=ni 
                 let no = {strong:"",word:newText[j],exactId:"V"+theText[i].id+"V"+(j+1)}
                 x.push(no)
            }
           
        }
          bigx.push(x)
          
          const newElem = document.createElement('div')
          
          newElem.innerHTML=nt
          newElem.querySelectorAll('span').forEach((item,index)=>{
            const span = document.createElement('span');
            span.textContent = item.textContent;
            span.title=item.title
            item.title!==""? span.className="text-text-span-u" :  span.className="text-text-span"
            let newid = "V"+theText[i].id+"V"+(index+1)
            span.id = newid
            
           
            item.replaceWith(span)
           

          })
          newDisplayText.push(newElem) //or .innerHTML
         
        }
        setTextArrays([...bigx])
        setPureText([...newPureText])
       
        console.log(bigx)
       // console.log(newDisplayText[0].innerHTML,typeof(newDisplayText[0].innerHTML))

      }
      
      
    },[theText])
  
  return (
    <div className='display'>
      <Suspense fallback={<Loading/>}>
    <ProgressBible/>
      
      <span className='text-title'>{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span>
        <p className='text-paragraph' style={{fontSize:`${globalFontSize}px`,lineHeight:`${globalLineHeight}`}}>{theText?.map((item,index)=> <span key={uuidv4()} className='text-span'
        onClick={(e)=>handleClick(e,index)} style={{color:index+1===startVerse?"var(--red)":"", 
          fontSize:`${globalFontSize}px`,backgroundColor:selectedWords.includes(`verse${theText[index].id}-0`)? "var(--theme2)": highlights!==null? `${highlights[index]}`:""}}
      id={`text-span${index}`} > 
      <span className='text-paragraph-verse-number' style={{fontSize:`${globalFontSize}px`}} id={`verse${theText[index].id}-0`}>{item.verse}  
      {noteids?.includes(theText[index].exactId)? <abbr className='text-span-notebook' onClick={()=>handleNoteOpen(index)} title='view your note'><IconNotes/></abbr>:" "}</span>
      
     
 {/* {displayText!==null?  displayText!==undefined? <span style={index+1===startVerse? {...highlightedVerseStyles}:{}} 
 onClick={()=>RemoveHighlight()} 
 className={`text-text verse${index}`}  dangerouslySetInnerHTML={{ __html: displayText[index]?.innerHTML }}/>: "" : ""} */}

      {textArrays!==null? textArrays!==undefined? textArrays[index]?.map((item,index)=>(<span style={{backgroundColor:selectedWords?.includes(item.exactId)? "var(--theme2)" :firebaseHighlightsIds?.includes(item.exactId)? firebaseHighlightsColors[firebaseHighlightsIds?.indexOf(item.exactId)] :"" }} 
      id={item.exactId} key={uuidv4()} onClick={()=>RemoveHighlight()}
      title={item.strong} className={`${item.strong===""?  "verse-span" :item.strong===strongText && isNote?"verse-span-u-h": "verse-span-u"}`}>{noteids?.includes(item.exactId)?<IconBasic_notebook/> :""}{item.word}</span>)) : "": ""}
       
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
    isWrite={isWrite} setIsWrite={setIsWrite} text={clickedVerse!==-1? pureText[clickedVerse]:""} title={title} setSelectedWords={setSelectedWords}
    isNote={isNote} setIsNote={setIsNote} id={id} book={chaptersAndVerses[displayTitle[0]].name} chapter={displayTitle[1]+1} verse={clickedVerse}/>
   
   <div className={`display-alert ${noUserALert? "open":""}`}>
      Please <Link href={"/login"}>log in</Link> to {alertText}
   </div>
   </Suspense>
    </div>
  )
}

export default Display

//♗ ✍⊛