"use client"
import { SearchBible } from '@/app/api/bible/searchBible'
import React, { useState,useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import SearchResultItem from './searchResult';
import IconArrowLeft from '../icons/navigation/arrowLeft';
import IconMagnify from '../icons/action/mag';
import { BookContext } from '@/contexts/books';
import IconDelete from '../icons/action/delete';
import SearchChart from './serachChart';

const Search = ({setIsSearch,isSearch,setSearchData,searchData,filteredData,setFilteredData}) => {
    const [searchInput,setSearchInput]=useState("")
    const [search,setSearch]=useState(false)
    const [loading, setLoading] = useState(true);
    const [isFiltered,setIsFiltered]=useState(false)
    const {searchTranslation,setSearchTranslation,isSearchChart,setIsSearchChart}=useContext(BookContext)
    const [recentSearches,setRecentSearches]=useState(null)
  console.log(recentSearches,"recent")
   const handleSubmit = (e)=>{
    e.preventDefault()
    setSearch((prev)=> !prev)
    //console.log("submitted")
    let gotSearchesRaw = localStorage.getItem("recentSearches")
    let gotSearches = JSON.parse(gotSearchesRaw)
    if (gotSearches===null){
     // console.log("no recent searches") 
      localStorage.setItem("recentSearches",JSON.stringify([searchInput]))
      setRecentSearches([searchInput])
    }else {
      if (!gotSearches.includes(searchInput)){
        // console.log(gotSearches,"recent searches",typeof(gotSearches))
      gotSearches.push(searchInput)
      localStorage.setItem("recentSearches",JSON.stringify(gotSearches))
      setRecentSearches(gotSearches)
      }
     
    }
   }
   useEffect(()=>{
    let gotSearchesRaw = localStorage.getItem("recentSearches")
    let gotSearches = JSON.parse(gotSearchesRaw)
    if (gotSearches===null){
      console.log("no recent searches")
      
    }else {
      setRecentSearches([...gotSearches])
      }
     
    
   },[isSearch])
   const handleResearch = (item)=>{
    setSearchInput(item)
    setSearch((prev)=> !prev)
   }
    useEffect(()=> {
      setIsSearchChart(true)
        // ADD EXTRA PARAMETERS WILL !!!!!!!! 🌼🌼🌼🌼
      const fetchData = async (searchInput)=> {
        //console.log("searchinput,",searchInput)
        try {
            const data = await SearchBible(searchTranslation,searchInput)
        //console.log(data, "search result",searchTranslation, data?.results , Object.values(data?.results)[0])
        if (data!==undefined){
          setSearchData((prev)=> {return Object.values(data?.results)[0]} )
        }
        
        }catch(err){
            console.log(err)
        }
        
         setLoading(false);
      }
      fetchData(searchInput) 
    },[search])
    useEffect(()=>{
      if (searchData!==null){
         setFilteredData([...searchData])
      }
     
      return ()=> setFilteredData(null)
    },[searchData])
    useEffect(()=>{
        if (isSearch===false){
            setSearchInput("")
            setSearchData(null)
        }
    },[isSearch])

   useEffect(()=>{
    setLoading(false)
   },[])
    
   useEffect(()=>{
    if (searchInput.length<1){
      setSearchData(null)
    }
   },[searchInput])

    if (loading){
      return <>Loading....</>
    }
    const ClearLocalStorage = ()=>{
      try {
        localStorage.removeItem("recentSearches")
        setRecentSearches(null)
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className={`search ${isSearch? "open":""}`}>

        <form className='search-form' >
          <span className='search-back'onClick={()=>setIsSearch(false)}><IconArrowLeft/></span>
      <input type="text"
      placeholder='Search...'
      value={searchInput}
      name='search-input'
      className='search-input'
      onChange={(e)=>setSearchInput(e.target.value)}
      />
    <button type="submit" onClick={(e)=>handleSubmit(e)} className='search-button'><IconMagnify/></button>
    
    </form>
    <div className='search-results'>
    <span className='search-number'>{searchInput===""? "" : searchData? isFiltered? `Showing ${filteredData?.length}   of ${searchData?.length}`: `Found ${searchData.length} verses. Tap chart to filter` : "No word search results."}</span>
    {/* chart of results */}
    <div>

       {isSearchChart? searchData? 
    <SearchChart isFiltered={isFiltered} setIsFiltered={setIsFiltered} 
    searchData={searchData} setSearchData={setSearchData} setFilteredData={setFilteredData} filteredData={filteredData}/> :"" :""}
    </div>
    {searchData? "": <div className='recent-searches'>
    <span className='recent-span'>Recent searches:
    <abbr className='recent-clear' title="Clear search history" onClick={()=>ClearLocalStorage()}><IconDelete/></abbr>
    </span>
    
   
    {recentSearches?.map((item)=> (<span key={uuidv4()} className='recent-search-item' onClick={()=>handleResearch(item)}>{item}</span>))}
    </div>}
    {filteredData?.map((item,index)=> (<SearchResultItem key={uuidv4()} item={item} setIsSearch={setIsSearch}/>) )}
    </div>
   
    </div>
  )
}

export default Search