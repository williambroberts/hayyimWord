"use client"
import React,{useContext,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { DataContext } from '@/contexts/dataContext'
import HightlightItem from './highlightItem'
import { v4 as uuidv4 } from 'uuid'
const HighlightsPage = () => {
  const {firebaseHighlights,setfirebaseHighlights} = useContext(DataContext)
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
    <span className='highlight-data'>Showing {firebaseHighlights?.length} highights</span>
    <div className='highlight-flex'>
      {firebaseHighlights?.map((item)=> (<HightlightItem key={uuidv4()} item={item}/>) )}
    </div>
   </main>
  )
}

export default HighlightsPage