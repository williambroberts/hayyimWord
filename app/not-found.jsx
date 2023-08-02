"use client"

import React, { useEffect } from 'react'


const Custom404 =  () => {
  
  useEffect(()=>{
    setTimeout(()=>{
      window.location.assign("/")
    },1000)
  },[])
 
    
    

  return (
    <main>404-going back in 1 second</main>
    
  )
}

export default Custom404