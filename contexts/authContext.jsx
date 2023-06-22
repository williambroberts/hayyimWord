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
    const [openModal,setOpenModal]=useState(false)
    const [isLoading,setisLoading]=useState(true)
    const [openNotification,setOpenNotification]=useState(false)
    const [notification,setNotification]=useState("")
    const [notificationTime,setNotificationTime]=useState(2000)
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
        //remember to clear useEffect when close route?
         return ()=> isUser()
    },[])

    
    useEffect(()=>{
        const handleNotification = ()=>{
              if (notification===""){
                return
              }
              setOpenNotification((prev)=>true)
              setTimeout(()=>{
                setNotification((prev)=>"")
              },notificationTime)
        }
        handleNotification()

    },[notification])

  return (
   <IsAUserLoggedInContext.Provider value={{user,setUser,openNotification,setOpenNotification,notificationTime,
   setOpenModal,openModal,setNotification,notification}}>
        {isLoading? <span>Loading...</span>: children }
   </IsAUserLoggedInContext.Provider>
  )
}

export default IsAUserLoggedInProvider