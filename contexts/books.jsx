"use client"
import React, { createContext,useState } from 'react'
import chaptersAndVerses from "../app/api/bible/chaptersAndverses.json"
export const BookContext = createContext()
const BookProvider = ({children}) => {
    const [openChapterIndex,setOpenChapterIndex]=useState(-1)
    const [openBookIndex,setOpenBookIndex]=useState(-1)
    const [isABookOpen,setIsABookOpen]=useState(false)
    const openBookArr = Array(66).fill(false)
    const [openBookList,setOpenBookList]=useState(openBookArr)

    const closeBookAccordions = () =>{
        setIsBooksOpen(openBookArr)
    }
  return (
   <BookContext.Provider value={{setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,
    isABookOpen,setIsABookOpen,openBookList,setOpenBookList
    }}>
    {children}
   </BookContext.Provider>
  )
}

export default BookProvider