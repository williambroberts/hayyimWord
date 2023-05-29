"use client"
import React,{useContext,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
const FavouritesPage = () => {
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
    favs page
   </main>
  )
}

export default FavouritesPage