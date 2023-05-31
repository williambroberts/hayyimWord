"use client"
import { SearchBible } from '@/app/api/bible/searchBible'
import React, { useState,useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import SearchResultItem from './searchResult';
import IconArrowLeft from '../icons/navigation/arrowLeft';
import IconMagnify from '../icons/action/mag';
import { BookContext } from '@/contexts/books';
const Search = ({setIsSearch,isSearch}) => {
    const [searchInput,setSearchInput]=useState("")
    const [search,setSearch]=useState(false)
    const [loading, setLoading] = useState(true);
    const [searchData,setSearchData]=useState(null)
    const {searchTranslation,setSearchTranslation}=useContext(BookContext)
   
   const handleSubmit = (e)=>{
    e.preventDefault()
    setSearch((prev)=> !prev)
    console.log("submitted")
   }

    useEffect(()=> {
        // ADD EXTRA PARAMETERS WILL !!!!!!!! 🌼🌼🌼🌼
      const fetchData = async (searchInput)=> {
        console.log("searchinput,",searchInput)
        try {
            const data = await SearchBible(searchTranslation,searchInput)
        console.log(data, "search result")
        
        setSearchData((prev)=> {return data?.results?.net} )
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
        }
    },[isSearch])

   useEffect(()=>{
    setLoading(false)
   },[])
    


    if (loading){
      return <>Loading....</>
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
    {searchData?.map((item,index)=> (<SearchResultItem key={uuidv4()} item={item} setIsSearch={setIsSearch}/>) )}
    </div>
   
    </div>
  )
}

export default Search