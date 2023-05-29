import React from 'react'

const ChapterItem = ({chapter}) => {
    const chapterNumber = Object.keys(chapter)
    //console.log(chapterNumber)
  return (
    <div className='chapter-item'>
        <span>{chapterNumber}</span>
    </div>
  )
}

export default ChapterItem