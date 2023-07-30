"use client"
import React from 'react'
import { useTheme } from './ThemeContext'

const ContextConsumer = ({children}) => {
    const {theme,color}=useTheme()
  return (
    <section
    data-color={color}
    data-theme={theme}
    >
        {children}
    </section>
  )
}

export default ContextConsumer