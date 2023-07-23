"use client"
import React, { createContext, useContext } from 'react'


const NotificationContext = createContext({})
const NotificationProvider = ({children}) => {
    const [notification,setNotification]=React.useState({open:false,time:3000,message:"",type:""})
    const NotificationValues = {
        notification,setNotification

    }
  return (
    <NotificationContext.Provider value={NotificationValues}>
        {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider


export function useNotification(){
    const NC = useContext(NotificationContext)
    if (!NC){
        throw new Error("NotificationContext must be used inside its provider")
    }
    return NC
}