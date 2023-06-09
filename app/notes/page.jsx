"use client"
import React,{useContext,useEffect,useState} from 'react'
import { useRouter } from 'next/navigation'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { DataContext } from '@/contexts/dataContext'
import NoteItem from './noteItem'
import { v4 as uuidv4 } from 'uuid'
import NotesChart from './notesChart'
const NotesPage = () => {
    const {user,setUser}=useContext(IsAUserLoggedInContext)
    const {firebaseNotes,setFirebaseNotes} = useContext(DataContext)
    const [filteredData,setFilteredData]=useState(firebaseNotes)
    const [isFiltered,setIsFiltered]=useState(false)
  const router=useRouter()
  useEffect(()=>{
    console.log("user",user)
    if (user===null){
      router.push("/")
      return
    }
    
  },[user,router])
  useEffect(()=>{
    setFilteredData(firebaseNotes)
    //console.log(firebaseHighlights,filteredData)
  },[])
  return (
   <main>
    <NotesChart  setFilteredData={setFilteredData} setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
    <span className='page-stats'>Showing {firebaseNotes?.length} {firebaseNotes?.length!==1? "notes":"note"} of {firebaseNotes?.length}</span>
    <div classNmae="page-flex">
 {filteredData?.map((item)=><NoteItem key={uuidv4()} item={item}/>)}
    </div>
   
   </main>
  )
}

export default NotesPage