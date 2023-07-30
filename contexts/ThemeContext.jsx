"use client"
import { useLocalStorage } from '@/hooks/hooks';
import React, { createContext,useContext,useState } from 'react'

const ThemeContext = createContext(undefined)
const ThemeProvider = ({children}) => {
    const [theme,setTheme]=useLocalStorage("theme","light")
    const [color,setColor]=useLocalStorage("color","blue")
    
    const handleColor=(value=theme)=>{
        if(value){
            setColor(value)
        }

    }
    
    const ThemeValues = {
        color:color,handleColor:handleColor,
        theme:theme,setTheme:setTheme
    }
    
  return (
   <ThemeContext.Provider value={ThemeValues}>
{children}
   </ThemeContext.Provider>
  )
}

export default ThemeProvider
export const useTheme=()=>{
    let TC = useContext(ThemeContext)
    if (!TC){
        throw new Error("You must use theme inside its provider")
    }
    return TC;
}