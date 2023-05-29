"use client"
import React, {useEffect,useState,useContext} from 'react'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import ThemeButton from '../theme/themeButton'
import Hamburger from './hamburger'
const Header = () => {
    const {user}=useContext(IsAUserLoggedInContext)
  const [isHamburger,setIsHamburger]=useState(false)
  return (
  <header className='header'>
    <nav className='header-nav'>
    <span className='header-menu' onClick={()=>setIsHamburger((prev)=>true)}>☰</span>    
    <span className='header-theme'><ThemeButton/></span>
    
    </nav>
    <div className={`hamburger-blur ${isHamburger? 'open':''}`} onClick={()=>setIsHamburger((prev)=>!prev)}></div>
    
    <Hamburger isHamburger={isHamburger}
    setIsHamburger={setIsHamburger}
    />
  </header>
  )
}

export default Header