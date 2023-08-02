"use client"
import { useLocalStorage } from '@/hooks/hooks'
import React, { createContext, useState } from 'react'
export const ReactThemeContext = createContext()

const ReactThemeProvider = ({children}) => {
    const [theme,setTheme]=useLocalStorage("theme","light")
    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
      }
  return (
   <ReactThemeContext.Provider value={{switchTheme,theme,setTheme}}>
    {children}
   </ReactThemeContext.Provider>
  )
}

export default ReactThemeProvider