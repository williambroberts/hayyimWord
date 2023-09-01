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
    const [start,setStart]=useState(0)
    const pagnation = 10
   
    const theItems = filteredData?.slice(start,start+pagnation)
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
    console.log(firebaseNotes,filteredData)
  },[firebaseNotes])
  return (
   <main>
    <NotesChart  setFilteredData={setFilteredData} setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
    <span className='page-stats'>Showing {theItems?.length} {firebaseNotes?.length!==1? "notes":"note"} of {firebaseNotes?.length}</span>
    <div classNmae="px-3  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {theItems?.map((item)=><NoteItem key={uuidv4()} item={item}/>)}
    </div>
    <div className='pagnation__'>
      <button 
      style={{visibility:start===0?"hidden":"visible"}}
      onClick={()=>setStart(s=>s-pagnation)} className='turner-left'>❮</button>
      {/* {pages.map((item,index)=><button className='pagnation__page' onClick={()=>setStart((index+1)*pagnation)}>{index+1}</button>)} */}
      <button 
      style={{visibility:start+pagnation>=filteredData?.length? "hidden":"visible"}}
      onClick={()=>setStart(s=>s+pagnation)} className='turner-right'>❯</button>
    </div>
   </main>
  )
}

export default NotesPage