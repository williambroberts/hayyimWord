"use client"
import React, {useEffect,useState,useContext} from 'react'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { usePathname } from 'next/navigation'
import Hamburger from './hamburger'
import Search from './search'
import { BookContext } from '@/contexts/books'
import IconMagnify from '../icons/action/mag'
import ReactThemeButton from '../theme/themeReact/reactThemeButton'
import IconBxMenuAltLeft from '../icons/menu2'
import { useReactThemeContext } from '../theme/themeReact/reactThemeProvider'
const Header = () => {
  const pathname = usePathname()
 // console.log(pathname,"pathname")
  const {setOpenBookIndex,openBookIndex,searchData,setSearchData,isSearch,setIsSearch,
    openChapterIndex,setOpenChapterIndex,strongText,
    isChaptersMenuOpen,setIsChaptersMenuOpen,isNote,setIsNote,isStrong,setIsStrong,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
    startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,isSettings,setIsSettings
    ,isChapter,setIsChapter,isVerse,setIsVerse,
    } = useContext(BookContext)
    const {user}=useContext(IsAUserLoggedInContext)
  const [isHamburger,setIsHamburger]=useState(false)
  const {themeColor}=useReactThemeContext()
  const [filteredData,setFilteredData]=useState(null)
  const handleMenu = ()=>{
    setIsHamburger(false)
    setIsSearch(false)
    setIsSettings(false)
    if (isStrong && strongText!==null){
      console.log(strongText,isStrong)
      setIsNote(true)
      setIsStrong((prev)=>true)
      const myElem = document.querySelector(".note-dict")
      if (myElem===null){
        return
      }else{
        myElem.classList.add("open")
      }
      
    }
    console.log(isNote,isStrong,"handleMEnu",strongText)
  }

 
 const handleOpenToChapter = ()=>{
  setIsHamburger(true)
  setIsChapter(true)
  
 }
 useEffect(()=>{
  let myHtml = document.querySelector("html")
  if (isSearch){
    setIsNote(false)
    myHtml.style.overflowY="hidden"
  }else{
    myHtml.style.overflowY="scroll"
  }

 },[isSearch])
 useEffect(()=>{

  let myHtml = document.querySelector("html")
  if (isHamburger){
    setIsNote(false)
    myHtml.style.overflowY="hidden"
  }else{
    myHtml.style.overflowY="scroll"
    setIsChaptersMenuOpen(false)
    setIsVersesMenuOpen(false)
  }

 },[isHamburger])
  return (
  <header className='header'>
    <nav className='header-nav'>
    <span className='header-menu' onClick={()=>setIsHamburger((prev)=>true)}><IconBxMenuAltLeft/></span>  

   {pathname==="/"? <span className={`header-book ${themeColor}Text`} onClick={()=>handleOpenToChapter()}
    >{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span> : <span className='header-book'> {pathname.slice(1,2).toUpperCase()}{pathname.slice(2).toLowerCase()}</span>}

    <span className='header-theme'><ReactThemeButton/></span>
   
   
   {pathname==="/"? <span className='header-search'
    onClick={()=>setIsSearch((prev)=>true)}>
      <IconMagnify/></span> : <span></span>
}
    </nav>
    <div className={`hamburger-blur ${isHamburger? 'open':''} ${isSearch? "open":""}`} onClick={()=>handleMenu()}></div>
    
    <Hamburger isHamburger={isHamburger}
    setIsHamburger={setIsHamburger}
    />
    <Search searchData={searchData} setSearchData={setSearchData} setFilteredData={setFilteredData} filteredData={filteredData}
    isSearch={isSearch} setIsSearch={setIsSearch}/>
  </header>
  )
}

export default Header