"use client"
import React, {useEffect,useState,useContext} from 'react'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import ThemeButton from '../theme/themeButton'
import Hamburger from './hamburger'
import Search from './search'
const Header = () => {
    const {user}=useContext(IsAUserLoggedInContext)
  const [isHamburger,setIsHamburger]=useState(false)
  const [isSearch,setIsSearch]=useState(false)
  const handleMenu = ()=>{
    setIsHamburger(false)
    setIsSearch(false)
  }
 
  return (
  <header className='header'>
    <nav className='header-nav'>
    <span className='header-menu' onClick={()=>setIsHamburger((prev)=>true)}>☰</span>    
    <span className='header-theme'><ThemeButton/></span>
    <span className='header-search' onClick={()=>setIsSearch((prev)=>true)}>S</span>
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