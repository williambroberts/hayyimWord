"use client"
import React,{useContext,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
const NotesPage = () => {
    const {user,setUser}=useContext(IsAUserLoggedInContext)
  const router=useRouter()
  useEffect(()=>{
    console.log("user",user)
    if (user===null){
      router.push("/")
      return
    }
    
  },[user,router])
  return (
   <main>
    notes page
   </main>
  )
}

export default NotesPage