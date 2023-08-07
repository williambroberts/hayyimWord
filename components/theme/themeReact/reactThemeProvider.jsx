"use client"
import { useLocalStorage } from '@/hooks/hooks'
import React, { createContext, useContext, useState } from 'react'
export const ReactThemeContext = createContext()

const ReactThemeProvider = ({children}) => {
    const [theme,setTheme]=useLocalStorage("theme","light")
    const [themeColor,setThemeColor]=useLocalStorage("color","blue")
    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
      }
  return (
   <ReactThemeContext.Provider value={{
    setThemeColor,themeColor,
    switchTheme,theme,setTheme}}>
    {children}
   </ReactThemeContext.Provider>
  )
}

export default ReactThemeProvider


export const useReactThemeContext = ()=>{
  let RTC = useContext(ReactThemeContext)
  if (!RTC){
    throw new Error("Must use RTC inside its provider")
  }
  return RTC
}