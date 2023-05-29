"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
const HamburgerItem = ({icon,link,text,setIsHamburger}) => {
  const pathname=usePathname()
  
  return (
    <Link href={link} onClick={()=>setIsHamburger(false)} className='hamburger-item'>
        <span className='hamburger-item-icon'>{icon}</span>
        <span className='hamburger-item-text'>{text}</span>
    </Link>
  )
}

export default HamburgerItem