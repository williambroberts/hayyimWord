"use client"
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import React, { useContext, useEffect } from 'react'
import ReactDom from 'react-dom'

const NotificationPortal = ({}) => {
    
    const {openNotification,notification,setOpenNotification,notificationTime}=useContext(IsAUserLoggedInContext)
    useEffect(()=>{
        setTimeout(()=>{
            setOpenNotification((prev)=>false)
        },notificationTime)
    },[])
  return ReactDom.createPortal(
    <div className='notification'>
       Error: {notification}
    </div>,
    document.getElementById("portal")
  )
}

export default NotificationPortal