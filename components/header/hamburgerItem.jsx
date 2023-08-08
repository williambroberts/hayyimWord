"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useReactThemeContext } from '../theme/themeReact/reactThemeProvider'
const HamburgerItem = ({icon,link,text,setIsHamburger}) => {
  const pathname=usePathname()
  const {themeColor}=useReactThemeContext()
  return (
    <Link href={link} onClick={()=>setIsHamburger(false)} className='hamburger-item'>
        <span className={`hamburger-item-icon ${themeColor}`}>{icon}</span>
        <span className={`hamburger-item-text ${themeColor}`}>{text}</span>
    </Link>
  )
}

export default HamburgerItem