"use client"
import React,{useContext,useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { DataContext } from '@/contexts/dataContext'
import HightlightItem from './highlightItem'
import { v4 as uuidv4 } from 'uuid'
import HighLightChart from './highlightChart'
const HighlightsPage = () => {
  const {firebaseHighlights,setfirebaseHighlights} = useContext(DataContext)
  const [filteredData,setFilteredData]=useState(firebaseHighlights)
  const [isFiltered,setIsFiltered]=useState(false)
    const {user,setUser}=useContext(IsAUserLoggedInContext)
    const [start,setStart]=useState(0)
    const pagnation = 10
   
    const theItems = filteredData?.slice(start,start+pagnation)
  const router=useRouter()
  useEffect(()=>{
   // console.log("user",user)
    if (user===null){
      router.push("/")
      return
    } 
    
  },[user,router])
  useEffect(()=>{
    setFilteredData(firebaseHighlights)
    //console.log(firebaseHighlights,filteredData)
  },[firebaseHighlights])
  return (
   <main>
    <HighLightChart setFilteredData={setFilteredData} setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
    <span className='page-stats'>Showing {theItems?.length} {firebaseHighlights?.length!==1? "highlights":"highlight"} of {firebaseHighlights?.length}</span>
    <div className='px-3  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {theItems?.map((item)=> (<HightlightItem key={uuidv4()} item={item}/>) )}
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

export default HighlightsPage