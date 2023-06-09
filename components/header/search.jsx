"use client"
import { SearchBible } from '@/app/api/bible/searchBible'
import React, { useState,useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import SearchResultItem from './searchResult';
import IconArrowLeft from '../icons/navigation/arrowLeft';
import IconMagnify from '../icons/action/mag';
import { BookContext } from '@/contexts/books';
import IconDelete from '../icons/action/delete';
import shortNames from "../../app/api/bible/shortnames.json"
import SearchChart from './serachChart';
import { SearchStrong } from '@/app/api/bible/searchStrong';
import getText from '@/app/api/bible/getText';
import 'intersection-observer';
import { SearchStrongPagnation } from '@/app/api/bible/searchStrongPagnation';
import { usePathname } from 'next/navigation';
const Search = ({setIsSearch,isSearch,setSearchData,searchData,filteredData,setFilteredData}) => {
    // const [searchInput,setSearchInput]=useState("")
    const pathname = usePathname()
    const [search,setSearch]=useState(false)
    const [loading, setLoading] = useState(true);
    const [isFiltered,setIsFiltered]=useState(false)
    const nums = ["1","2","3","4","5","6","7","8","9","0"]
    const {searchTranslation,setSearchTranslation,isSearchChart,setIsSearchChart,searchInput,setSearchInput,setStrongText,setReGetStrongs,reGetStrongs,
      isNote,setIsNote,setIsStrong,setTotalPages,totalPages,page,setPage,isStrong,strongText,setSearchFound,searchFound,reObserve,setReObserve,
      recentSearches,setRecentSearches,setOpenBookIndex,openBookIndex,setOpenChapterIndex,setDisplayTitle,setTheText,
      openChapterIndex,setScrollChangeNeeded,setStartVerse,setIsChaptersMenuOpen,setIsVersesMenuOpen,
    }=useContext(BookContext)
    
     
      
    
      useEffect(()=>{
        if (!loading) {
          let parent = document.getElementById('get-more-data')
        console.log(parent)
        if (parent!==null){
            const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.target === parent && entry.isIntersecting) {
             
              console.log('Last child is visible',totalPages,page,isStrong,strongText,searchFound)
              //functionS!!!
             observer.unobserve(parent)
            }
          });
        });
        observer.observe(parent);
        }
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

   const fetchText =async (reference)=>{
    console.log(reference,"fetchnig refenerce text")
    let newrefernce=reference.split(":")[0]
   let data = await getText("kjv_strongs",newrefernce)
   
  
    let bookNo=null
    let b=reference
    if(nums.includes(reference[0])){
     b = reference.slice(1)
      bookNo=reference[0]
    }
     let book=b.match(/[a-zA-Z]+/g)[0]
  
  let cAndV = b.slice(b.search(/\d/)).split(":")
  let c = cAndV[0]
    let v= cAndV[1]
  
  
  
    let exactBook=null
    if (bookNo===null){
      exactBook=book
    }else {
      exactBook=bookNo+book
    }
    //console.log(bookNo,c,v,book,exactBook,"all ref details bookNo,c,v,book,exactBook")
    let newStartVerse=1
      if (v!==undefined){
        newStartVerse=parseInt(v)
      }
      setStartVerse(newStartVerse)
      //set chapter
      console.log(bookNo,c,v,book,exactBook,"all ref details bookNo,c,v,book,exactBook",newStartVerse)
      let newOpenChapterIndex=null
      if (!c===undefined){
        newOpenChapterIndex=parseInt(c)-1
      }else{
       newOpenChapterIndex=0
      }
      //set book index
      let newopenBookIndex=0
      for (let i=0; i<shortNames.length;i++){
        if (shortNames[i].toLowerCase().includes(exactBook.toLowerCase())){
         
          newopenBookIndex=i
        }
      }

    
      setOpenBookIndex(newopenBookIndex)
      setOpenChapterIndex(newOpenChapterIndex)
    setStartVerse()
    setIsSearch(false)
    setScrollChangeNeeded((prev)=>!prev)
    setIsChaptersMenuOpen(false)
     setIsVersesMenuOpen(false)
     setDisplayTitle([newopenBookIndex,newOpenChapterIndex])

     
  setTheText(data.results.kjv_strongs)
   console.log(data.results.kjv_strongs)
   
if (pathname!=="/"){
  router.push("/")
   }
    
}  

    useEffect(()=> {
      setIsSearchChart(true)  
        // ADD EXTRA PARAMETERS WILL !!!!!!!! 🌼🌼🌼🌼
      const fetchData = async (searchInput)=> {
        console.log("searchinput,",searchInput,typeof(parseInt(searchInput[1])))
        try {
          let data = null
          console.log("hmm",parseInt(searchInput.slice(1)[0]), typeof(parseInt(searchInput.slice(1)[0])),NaN)
            if (!nums.includes(searchInput[1]) && nums.includes(searchInput[searchInput.length-1])){
             //eg john3 mark1:12 1chron 1:12
             setIsStrong(false)
             console.log("ref search")
             fetchText(searchInput)
             return
            }else if(nums.includes(searchInput[0])&& searchInput.length>2){
                //eg 1ki or 1John 
                setIsStrong(false)
                console.log("ref search")
                let newSearchInput=searchInput+1
                fetchText(newSearchInput)
                return
            
            } else if (nums.includes(searchInput[1])){
              //eg H123 or G1234
              setReObserve((prev)=>!prev)
              setReGetStrongs((prev)=>!prev)
             setStrongText(searchInput)
             console.log("strong search")
             return
            }else{
              setIsStrong(false)
              data = await SearchBible(searchTranslation,searchInput)
              console.log("normal search")
            }
           
        //console.log(data, "search result",searchTranslation, data?.results , Object.values(data?.results)[0])
        if (data!==undefined){
          setSearchData((prev)=> {return Object.values(data?.results)[0]} )
          setReObserve((prev)=>!prev)
         
        }
        
        }catch(err){
            console.log(err)
        }
        
       
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
    const fetchData = async (searchInputVar,newpage)=> {
      
      try {
         
          const data = await SearchStrongPagnation(searchTranslation,searchInputVar,true,false,true,newpage)
      //console.log(data, "search result",searchTranslation, data?.results , Object.values(data?.results)[0])
      if (data!==undefined){
        setSearchData((prev)=> {return Object.values(data?.results)[0]} )
        setSearchFound(data.paging.total)
        setTotalPages(data.paging.last_page)
        console.log(data.paging.total,data.paging.last_page)
        setPage((prev)=>newpage)
        setReObserve((prev)=>prev)
        setIsStrong(true)
       
        
      }
      
      }catch(err){
          console.log(err)
      }
      
      
    }
    const getNextPageStrong = ()=>{
      
      if (page<totalPages && isStrong){
        fetchData(searchInput,page+1)
        console.log("total",totalPages,page+1,"page")
      }else {
        console.log(isStrong,totalPages,page,"no")
      }
      
    }
    const getPrevPageStrong = ()=>{
      if (page>1 && isStrong){
        fetchData(searchInput,page-1)
        console.log("total",totalPages,page+1,"page")
      }else {
        console.log(isStrong,totalPages,page,"no")
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

       {searchData? 
    <SearchChart isFiltered={isFiltered} setIsFiltered={setIsFiltered} 
    searchData={searchData} setSearchData={setSearchData} setFilteredData={setFilteredData} filteredData={filteredData}/> :"" }
    </div>
    {isStrong &&totalPages>1&&page>1? <span className='get-more-data' onClick={()=>getPrevPageStrong()}>View previous verses</span>:""}
    {searchData? "": <div className='recent-searches'>
    <span className='recent-span'>Recent searches:
    <abbr className='recent-clear' title="Clear search history" onClick={()=>ClearLocalStorage()}><IconDelete/></abbr>
    </span>
    
  
    {recentSearches?.map((item)=> (<span key={uuidv4()} className='recent-search-item' onClick={()=>handleResearch(item)}>{item}</span>))}
    </div>}
    {filteredData?.map((item,index)=> (<SearchResultItem key={uuidv4()} item={item} setIsSearch={setIsSearch}/>) )}
    { filteredData? isStrong&&totalPages>1? <span id="get-more-data" className="get-more-data" onClick={()=>getNextPageStrong()}>View more verses</span> :"" :""}
    </div>
   
    </div>
  )
}

export default Search