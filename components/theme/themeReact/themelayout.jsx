"use client"
import React, { useContext } from 'react'
import { ReactThemeContext } from './reactThemeProvider'

const ThemeLayout = ({children}) => {
    const {theme}=useContext(ReactThemeContext)
  return (
    <div data-theme={theme}>
        {children}
    </div>
  )
}

export default ThemeLayout