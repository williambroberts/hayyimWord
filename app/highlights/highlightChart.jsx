"use client"
import React, { useContext, useEffect,useState } from 'react'
import chapters from "../../app/api/bible/chapters.json"
import { DataContext } from '@/contexts/dataContext'
const HighLightChart = ({setFilteredData,setIsFiltered,isFiltered}) => {
    const{firebaseHighlights,setfirebaseHighlights,firebaseNotes,setFirebaseNotes} = useContext(DataContext)
    let bookids = firebaseHighlights?.map((item)=>item.bookid)
  //  console.log(bookids,"bookids")
    let categories = bookids?.map((id)=>chapters[chapters.findIndex(item=>item.bookid===id)].category)
    let categoriesLen = categories?.length
    let Pentateuch = categories?.filter((item)=> item==="Pentateuch").length
    let History = categories?.filter((item)=> item==="History").length
    let WisdomAndPoetry = categories?.filter((item)=> item==="Wisdom and Poetry").length
    let MajorProphets = categories?.filter((item)=> item==="Major Prophets").length
    let MinorProphets = categories?.filter((item)=> item==="Minor Prophets").length
    let GospelsAndActs = categories?.filter((item)=> item==="Gospels and Acts").length
    let PaulineEpistles = categories?.filter((item)=> item==="Pauline Epistles").length
    let GeneralEpistles = categories?.filter((item)=> item==="General Epistles").length
    const [index,setIndex]=useState(null)
    
const handleFilter = (id,lo,hi)=>{
    //console.log("index",index,id,lo,hi,isFiltered)
    if (isFiltered && id===index){
        setFilteredData([...firebaseHighlights])
        setIsFiltered(false)
        setIndex(-1)
       // console.log(firebaseHighlights)
    }else {
       // console.log("index",index,id,lo,hi)
        setIndex((prev)=>id)
        setIsFiltered((prev)=>true)
        let newfilteredData = firebaseHighlights?.filter((item)=>item.bookid>=lo &&item.bookid<=hi )
        //console.log(newfilteredData.length,"new filted data length")
        setFilteredData(newfilteredData)
    }
    
}
  return (
    <div className='search-graph'>
        <div className="search-category-name" onClick={()=>handleFilter(0,1,5)} style={{display:Pentateuch===0?"none":"grid"}}><span>Pentateuch</span><span className='search-category-bar' style={{width:`calc(100%*(${Pentateuch/categoriesLen}))`,backgroundColor:index===0? "var(--paleblue)":"var(--theme)", color:index===0? "var(--black2)" :"" }}>{Pentateuch}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(1,6,17)} style={{display:History===0?"none":"grid"}}><span>History</span><span className='search-category-bar' style={{width:`calc(100%*(${History/categoriesLen}))`,backgroundColor:index===1? "var(--paleblue)":"var(--theme)", color:index===1? "var(--black2)" :"" }}>{History}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(2,18,22)} style={{display:WisdomAndPoetry===0?"none":"grid"}}><span>Wisdom and Poetry</span><span className='search-category-bar' style={{width:`calc(100%*(${WisdomAndPoetry/categoriesLen}))`,backgroundColor:index===2? "var(--paleblue)":"var(--theme)", color:index===2? "var(--black2)" :"" }}>{WisdomAndPoetry}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(3,23,27)} style={{display:MajorProphets===0?"none":"grid"}}><span>Major Prophets</span><span className='search-category-bar' style={{width:`calc(100%*(${MajorProphets/categoriesLen}))`,backgroundColor:index===3? "var(--paleblue)":"var(--theme)", color:index===3? "var(--black2)" :"" }}>{MajorProphets}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(4,28,39)} style={{display:MinorProphets===0?"none":"grid"}}><span>Minor Prophets</span><span className='search-category-bar' style={{width:`calc(100%*(${MinorProphets/categoriesLen}))`,backgroundColor:index===4? "var(--paleblue)":"var(--theme)", color:index===4? "var(--black2)" :"" }}>{MinorProphets}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(5,40,44)} style={{display:GospelsAndActs===0?"none":"grid"}}><span>Gospels and Acts</span><span className='search-category-bar' style={{width:`calc(100%*(${GospelsAndActs/categoriesLen}))`,backgroundColor:index===5? "var(--paleblue)":"var(--theme)", color:index===5? "var(--black2)" :"" }}>{GospelsAndActs}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(6,45,57)} style={{display:PaulineEpistles===0?"none":"grid"}}><span>Pauline Epistles</span><span className='search-category-bar' style={{width:`calc(100%*(${PaulineEpistles/categoriesLen}))`,backgroundColor:index===6? "var(--paleblue)":"var(--theme)", color:index===6? "var(--black2)" :"" }}>{PaulineEpistles}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(7,58,66)} style={{display:GeneralEpistles===0?"none":"grid"}}><span>General Epistles</span><span className='search-category-bar' style={{width:`calc(100%*(${GeneralEpistles/categoriesLen}))`,backgroundColor:index===7? "var(--paleblue)":"var(--theme)", color:index===7? "var(--black2)" :"" }}>{GeneralEpistles}</span></div>
    </div>
  )
}

export default HighLightChart