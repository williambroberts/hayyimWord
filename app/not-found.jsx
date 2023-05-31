"use client"

import React, { useEffect } from 'react'


const Custom404 =  () => {
  
  useEffect(()=>{
    setTimeout(()=>{
        //router.push("/")
      window.history.back()
        //redirect("/")
       // router.redirect("/")
    },1000)
  },[])
 
    
    

  return (
    <main>404-going back in 1 second</main>
    
  )
}

export default Custom404