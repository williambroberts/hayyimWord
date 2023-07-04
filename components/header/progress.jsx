"use client"
import { BookContext } from '@/contexts/books'
import React, { useContext } from 'react'
import Icon211Bookmark from '../icons/navigation/bookmark'

const ProgressBible = () => {
    const  {openBookIndex,openChapterIndex}=useContext(BookContext)
    const parent = document.querySelector(".progress-though")
    const progress=100*(openBookIndex+1)/66
  return (
    <div className="progress-though">
        <span style={{'width':progress?`${progress}%`:0}}></span>
        <div><Icon211Bookmark/></div>
        <span style={{'width':progress?`${100-progress}%`:`${100}%`}}></span>
    </div>
  )
}

export default ProgressBible