"use client"
import React, { createContext, useEffect,useState } from 'react'
import { doc,onSnapshot } from 'firebase/firestore';
import {
    onAuthStateChanged,
    getAuth,   
} from 'firebase/auth';
import firebase_app, {firestore} from '@/firebase/firebaseConfig';

export const IsAUserLoggedInContext = createContext()
const auth = getAuth(firebase_app)
const IsAUserLoggedInProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [isLoading,setisLoading]=useState(true)
   
    useEffect(()=>{
        const isUser = onAuthStateChanged(auth, (person)=>{
            if (person){
                setUser(person)
                console.log(person,person.email,person.uid)
            }else{
                setUser(null)
            }
            setisLoading(false)
           
           
        })
        
         return ()=> isUser()
    },[])

    


  return (
   <IsAUserLoggedInContext.Provider value={{user,setUser}}>
        {isLoading? <span>Loading...</span>: children }
   </IsAUserLoggedInContext.Provider>
  )
}

export default IsAUserLoggedInProvider