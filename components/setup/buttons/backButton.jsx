"use client"
import React from 'react'

const BackButton = () => {

    const goBack = () =>{
        window.history.back()
    }
  return (
    <span className='back-button' onClick={()=>goBack()}>
      
        <span>
            Back
        </span>
       </span>
  )
}

export default BackButton