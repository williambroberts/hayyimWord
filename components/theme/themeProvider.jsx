"use client"
//disableTransitionOnChange is for css animations disabled on theme change
import React from 'react'
import { ThemeProvider } from 'next-themes'
const ProviderForTheme = ({children}) => {
  return (
    <ThemeProvider disableTransitionOnChange>
        {children}
    </ThemeProvider>
  )
}

export default ProviderForTheme