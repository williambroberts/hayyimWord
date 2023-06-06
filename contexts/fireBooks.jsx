"use client"
import React, { createContext, useEffect, useState } from 'react'
export const firebooksContext = createContext()
import { doc,onSnapshot,getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';
const FireBooksProvider = ({children}) => {
    const [book,setBook]=useState(null)
    
    const handleGetBook = async (collection,document)=>{
        let docRef = doc(firestore, collection, document);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            console.log(docSnap.data(),collection,document)
            setBook(docSnap.data())
        }else {
            console.log("no such document")
        }

    }
  return (
    <firebooksContext.Provider value={{book,handleGetBook}}>
        {children}
    </firebooksContext.Provider>
  )
}

export default FireBooksProvider