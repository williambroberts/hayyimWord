import React from 'react'

const NoteHamburger = ({isNote,setIsNote}) => {
  return (
    <div className={`note-menu ${isNote? "open":""}`}>

    </div>
  )
}

export default NoteHamburger