import React from 'react'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { v4 as uuidv4 } from 'uuid';
const VerseItem = ({verse,RemoveHighlight}) => {
    console.log(verse)
  return (
    <div className='verse-item'>
        {/* {verse?.map((item,index)=><span title={item.strong} className={`${item.strong===""?" verse-span" : "verse-span-u"}`}>{item.word}</span>)} */}
    </div>
  )
}

export default VerseItem