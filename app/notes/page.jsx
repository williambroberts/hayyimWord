"use client"
import React,{useContext,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { DataContext } from '@/contexts/dataContext'
import NoteItem from './noteItem'
import { v4 as uuidv4 } from 'uuid'
const NotesPage = () => {
    const {user,setUser}=useContext(IsAUserLoggedInContext)
    const {firebaseNotes,setFirebaseNotes} = useContext(DataContext)
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
    <span className='page-stats'>Showing {firebaseNotes?.length} {firebaseNotes?.length>1? "notes":"note"}</span>
    <div classNmae="page-flex">
 {firebaseNotes?.map((item)=><NoteItem key={uuidv4()} item={item}/>)}
    </div>
   
   </main>
  )
}

export default NotesPage