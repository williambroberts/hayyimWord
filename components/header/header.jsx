"use client"
import React, {useEffect,useState,useContext} from 'react'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import ThemeButton from '../theme/themeButton'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { usePathname } from 'next/navigation'
import Hamburger from './hamburger'
import Search from './search'
import { BookContext } from '@/contexts/books'
import IconMagnify from '../icons/action/mag'
const Header = () => {
  const pathname = usePathname()
  const {setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,
    isChaptersMenuOpen,setIsChaptersMenuOpen,
    isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
    startVerse,setStartVerse,theText,setTheText,displayTitle,setDisplayTitle,isSettings,setIsSettings
    } = useContext(BookContext)
    const {user}=useContext(IsAUserLoggedInContext)
  const [isHamburger,setIsHamburger]=useState(false)
  const [isSearch,setIsSearch]=useState(false)
  const handleMenu = ()=>{
    setIsHamburger(false)
    setIsSearch(false)
    setIsSettings(false)
  }
 const handleOpenToChapter = ()=>{
  setIsChaptersMenuOpen(true)
  setIsHamburger(true)
  
 }
  return (
  <header className='header'>
    <nav className='header-nav'>
    <span className='header-menu' onClick={()=>setIsHamburger((prev)=>true)}>☰</span>  

   {pathname==="/"? <span className='header-book' onClick={()=>handleOpenToChapter()}
    >{chaptersAndVerses[displayTitle[0]].name} {displayTitle[1]+1}</span> : <span className='header-book'> {`${pathname.slice(1,2).toUpperCase+pathname.slice(2).toLowerCase}`}</span>}

    <span className='header-theme'><ThemeButton/></span>
    <span className='header-search' onClick={()=>setIsSearch((prev)=>true)}><IconMagnify/></span>
    </nav>
    <div className={`hamburger-blur ${isHamburger? 'open':''} ${isSearch? "open":""}`} onClick={()=>handleMenu()}></div>
    
    <Hamburger isHamburger={isHamburger}
    setIsHamburger={setIsHamburger}
    />
    <Search isSearch={isSearch} setIsSearch={setIsSearch}/>
  </header>
  )
}

export default Header