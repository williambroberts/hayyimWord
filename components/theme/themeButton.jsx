"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import IconMoon from '../icons/themeIcons/moon'
import IconSun from '../icons/themeIcons/sun'



const ThemeButton = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

 
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  const themeChange = ()=>{
    setTheme(theme==="light"?"dark":"light")
    let myHtml = document.querySelector('html')
    myHtml.style.opacity=0
    setTimeout(()=>{
      let myHtml = document.querySelector('html')
    myHtml.style.opacity=1
    },10)
  }
  return (
    <button className={`theme-button ${theme==="light"? "light":"dark"}`} onClick={()=>themeChange()}>
      {theme==="dark"?   <IconSun/>: <IconMoon/>}
      </button>
      
  )
}

export default ThemeButton

