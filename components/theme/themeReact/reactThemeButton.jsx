"use client"
import React,{useContext,useState} from 'react'
import { ReactThemeContext } from './reactThemeProvider'
import IconMoon from '../../icons/themeIcons/moon'
import IconSun from '../../icons/themeIcons/sun'
const ReactThemeButton = () => {
    const {theme,setTheme} = useContext(ReactThemeContext)

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
        <button className={`react-theme-button ${theme==="light"? "light":"dark"}`} onClick={()=>themeChange()}>
          {theme==="dark"?   <IconSun/>: <IconMoon/>}
          </button>
          
      )
}

export default ReactThemeButton