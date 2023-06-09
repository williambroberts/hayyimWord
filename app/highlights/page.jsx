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
  const router=useRouter()
  useEffect(()=>{
    console.log("user",user)
    if (user===null){
      router.push("/")
      return
    } 
    
  },[user,router])
  useEffect(()=>{
    setFilteredData(firebaseHighlights)
    //console.log(firebaseHighlights,filteredData)
  },[])
  return (
   <main>
    <HighLightChart setFilteredData={setFilteredData} setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
    <span className='page-stats'>Showing {filteredData?.length} {firebaseHighlights?.length!==1? "highlights":"highlight"} of {firebaseHighlights?.length}</span>
    <div className='page-flex'>
      {filteredData?.map((item)=> (<HightlightItem key={uuidv4()} item={item}/>) )}
    </div>
   </main>
  )
}

export default HighlightsPage