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
import { SearchStrong } from '@/app/api/bible/searchStrong';
import 'intersection-observer';
const Search = ({setIsSearch,isSearch,setSearchData,searchData,filteredData,setFilteredData}) => {
    // const [searchInput,setSearchInput]=useState("")
    const [search,setSearch]=useState(false)
    const [loading, setLoading] = useState(true);
    const [isFiltered,setIsFiltered]=useState(false)
    const nums = ["1","2","3","4","5","6","7","8","9","0"]
    const {searchTranslation,setSearchTranslation,isSearchChart,setIsSearchChart,searchInput,setSearchInput,setStrongText,setReGetStrongs,reGetStrongs,
      isNote,setIsNote,setIsStrong,setTotalPages,totalPages,page,setPage,isStrong,strongText,setSearchFound,searchFound,reObserve,setReObserve,
      recentSearches,setRecentSearches}=useContext(BookContext)
    
     
      
    
      useEffect(()=>{
        if (!loading) {
          const parent = document.getElementById('search-results')
        console.log(parent)
        const lastChild = parent.lastElementChild
        console.log(lastChild,"lastChild")
        
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.target === lastChild && entry.isIntersecting) {
             
              console.log('Last child is visible',totalPages,page,isStrong,strongText,searchFound)
              //functionS!!!
             observer.unobserve(lastChild)
            }
          });
        });
        observer.observe(lastChild);
        }

      },[loading,reObserve])
 // console.log(recentSearches,"recent")
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
        console.log("searchinput,",searchInput,typeof(parseInt(searchInput[1])))
        try {
          let data = null
          console.log("hmm",parseInt(searchInput.slice(1)[0]), typeof(parseInt(searchInput.slice(1)[0])),NaN)
            if (!nums.includes(searchInput[1])){
              setIsStrong(false)
              data = await SearchBible(searchTranslation,searchInput)
               
            }else{
               setReObserve((prev)=>!prev)
               setReGetStrongs((prev)=>!prev)
              setStrongText(searchInput)
              
              return
            }
           
        //console.log(data, "search result",searchTranslation, data?.results , Object.values(data?.results)[0])
        if (data!==undefined){
          setSearchData((prev)=> {return Object.values(data?.results)[0]} )
          setReObserve((prev)=>!prev)
         
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
    <div className='search-results' id="search-results">
      
    <span className='search-number'>
      {searchInput===""? "" : searchData? isFiltered? `Showing ${filteredData?.length}   of ${isStrong? searchFound:searchData?.length} verses. `: `Found ${isStrong? searchFound: searchData?.length} verses. ${isSearchChart? "Tap chart to filter":""}` : "No word search results."}</span>
  
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