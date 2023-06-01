"use client"
import { SearchBible } from '@/app/api/bible/searchBible'
import React, { useState,useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import SearchResultItem from './searchResult';
import IconArrowLeft from '../icons/navigation/arrowLeft';
import IconMagnify from '../icons/action/mag';
import { BookContext } from '@/contexts/books';
import IconDelete from '../icons/action/delete';
const Search = ({setIsSearch,isSearch,setSearchData,searchData}) => {
    const [searchInput,setSearchInput]=useState("")
    const [search,setSearch]=useState(false)
    const [loading, setLoading] = useState(true);
   
    const {searchTranslation,setSearchTranslation}=useContext(BookContext)
    const [recentSearches,setRecentSearches]=useState(null)

   const handleSubmit = (e)=>{
    e.preventDefault()
    setSearch((prev)=> !prev)
    console.log("submitted")
    let gotSearchesRaw = localStorage.getItem("recentSearches")
    let gotSearches = JSON.parse(gotSearchesRaw)
    if (gotSearches===null){
      console.log("no recent searches")
      localStorage.setItem("recentSearches",JSON.stringify([searchInput]))
      setRecentSearches([searchInput])
    }else {
      if (!gotSearches.includes(searchInput)){
         console.log(gotSearches,"recent searches",typeof(gotSearches))
      gotSearches.push(searchInput)
      localStorage.setItem("recentSearches",JSON.stringify(gotSearches))
      setRecentSearches(gotSearches)
      }
     
    }
   }
   const handleResearch = (item)=>{
    setSearchInput(item)
    setSearch((prev)=> !prev)
   }
    useEffect(()=> {
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
    <span className='search-number'>{searchInput===""? "word search" : searchData? `Found ${searchData.length} verses.` : "No word search results."}</span>
    {/* chart of results */}
    {searchData? "": <div className='recent-searches'>
    <span className='recent-span'>Recent searches:
    <abbr className='recent-clear' title="Clear search history" onClick={()=>ClearLocalStorage()}><IconDelete/></abbr>
    </span>
    {recentSearches?.map((item)=> (<span key={uuidv4()} className='recent-search-item' onClick={()=>handleResearch(item)}>{item}</span>))}
    </div>}
    {searchData?.map((item,index)=> (<SearchResultItem key={uuidv4()} item={item} setIsSearch={setIsSearch}/>) )}
    </div>
   
    </div>
  )
}

export default Search