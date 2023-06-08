"use client"
import { BookContext } from '@/contexts/books'
import React, { useContext } from 'react'
import IconDelete from '../icons/action/delete'
import { v4 as uuidv4 } from 'uuid'
import IconArrowLeft from '../icons/navigation/arrowLeft'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
const HistoryHamburger = () => {
    const {isHistory,setIsHistory,history}=useContext(BookContext)
    const handleDelete = ()=>{

    }
    const handleGoto = () =>{

    }
  return (
    <div className={`settings ${isHistory? "open" : ""}`}>
        <nav className='settings-header'>
        <span className='settings-back' onClick={()=>setIsHistory(false)}><IconArrowLeft/></span>
           <span className='settings-title'>History</span>
        </nav>
        <div className='history-clear'>Tap verse to view in context. Clear History <span className='history-delete' onClick={()=>handleDelete()}><IconDelete/></span></div>
        <div className='history-wrapper'>
            {history?.map((item)=>  <div className='search-result-item' onClick={()=>handleGoto()}>
        <span className='search-result-item-title'>{chaptersAndVerses[item.book-1].name} {item?.chapter}:{item?.verse}
        <span className='search-result-icon'>&#8250;</span> 
        </span>
       <span className='search-result-item-text'>{item.text}</span>
      
    </div>)}
        </div>
    </div>
  )
}

export default HistoryHamburger