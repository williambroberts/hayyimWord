"use client"
import React from 'react'
import { useReactThemeContext } from '@/components/theme/themeReact/reactThemeProvider'

const ContextConsumer = ({children}) => {
    const {theme,color}=useReactThemeContext()
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