"use client"
import React, { useEffect,useState } from 'react'
import chapters from "../../app/api/bible/chapters.json"
const SearchChart = ({searchData,setSearchData,filteredData,setFilteredData,setIsFiltered,isFiltered}) => {
    let bookids = searchData?.map((item)=>item.book)
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
    let [index,setIndex]=useState(null)
    
const handleFilter = (id,lo,hi)=>{
    if (isFiltered && id===index){
        setFilteredData([...searchData])
        setIsFiltered(false)
        setIndex(-1)

    }else {
        //console.log("index",id,lo,hi)
        setIndex((prev)=>id)
        setIsFiltered((prev)=>true)
        let newfilteredData = searchData.filter((item)=>item.book>=lo &&item.book<=hi )
        //console.log(newfilteredData.length,"new filted data length")
        setFilteredData(newfilteredData)
    }
    
}
  return (
    <div className='search-graph'>
        <div className="search-category-name" onClick={()=>handleFilter(0,1,5)} style={{display:Pentateuch===0?"none":"grid"}}><span>Pentateuch</span><span className='search-category-bar' style={{width:`calc(100%*(${Pentateuch/categoriesLen}))`,backgroundColor:index===0? "var(--paleblue)":"var(--theme)", color:index===0? "var(--black2)" :"" }}></span><span className='search-graph-number'>{Pentateuch}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(1,6,17)} style={{display:History===0?"none":"grid"}}><span>History</span><span className='search-category-bar' style={{width:`calc(100%*(${History/categoriesLen}))`,backgroundColor:index===1? "var(--paleblue)":"var(--theme)", color:index===1? "var(--black2)" :"" }}></span><span className='search-graph-number'>{History}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(2,18,22)} style={{display:WisdomAndPoetry===0?"none":"grid"}}><span>Wisdom and Poetry</span><span className='search-category-bar' style={{width:`calc(100%*(${WisdomAndPoetry/categoriesLen}))`,backgroundColor:index===2? "var(--paleblue)":"var(--theme)", color:index===2? "var(--black2)" :"" }}></span><span className='search-graph-number'>{WisdomAndPoetry}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(3,23,27)} style={{display:MajorProphets===0?"none":"grid"}}><span>Major Prophets</span><span className='search-category-bar' style={{width:`calc(100%*(${MajorProphets/categoriesLen}))`,backgroundColor:index===3? "var(--paleblue)":"var(--theme)", color:index===3? "var(--black2)" :"" }}></span><span className='search-graph-number'>{MajorProphets}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(4,28,39)} style={{display:MinorProphets===0?"none":"grid"}}><span>Minor Prophets</span><span className='search-category-bar' style={{width:`calc(100%*(${MinorProphets/categoriesLen}))`,backgroundColor:index===4? "var(--paleblue)":"var(--theme)", color:index===4? "var(--black2)" :"" }}></span><span className='search-graph-number'>{MinorProphets}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(5,40,44)} style={{display:GospelsAndActs===0?"none":"grid"}}><span>Gospels and Acts</span><span className='search-category-bar' style={{width:`calc(100%*(${GospelsAndActs/categoriesLen}))`,backgroundColor:index===5? "var(--paleblue)":"var(--theme)", color:index===5? "var(--black2)" :"" }}></span><span className='search-graph-number'>{GospelsAndActs}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(6,45,57)} style={{display:PaulineEpistles===0?"none":"grid"}}><span>Pauline Epistles</span><span className='search-category-bar' style={{width:`calc(100%*(${PaulineEpistles/categoriesLen}))`,backgroundColor:index===6? "var(--paleblue)":"var(--theme)", color:index===6? "var(--black2)" :"" }}></span><span className='search-graph-number'>{PaulineEpistles}</span></div>
        <div className="search-category-name"onClick={()=>handleFilter(7,58,66)} style={{display:GeneralEpistles===0?"none":"grid"}}><span>General Epistles</span><span className='search-category-bar' style={{width:`calc(100%*(${GeneralEpistles/categoriesLen}))`,backgroundColor:index===7? "var(--paleblue)":"var(--theme)", color:index===7? "var(--black2)" :"" }}></span><span className='search-graph-number'>{GeneralEpistles}</span></div>
    </div>
  )
}

export default SearchChart