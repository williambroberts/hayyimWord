import { useNotification } from '@/contexts/notificationContext'
import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
const NotificationPortal = () => {
    const {notification,setNotification
    
    }=useNotification()


    useEffect(()=>{
        setTimeout(()=>{
            setNotification((prev)=>({...prev,open:false}))
        },notification?.time)
    },[])
  return ReactDom.createPortal(
    <div 
    id="highlight__portal"
    data-theme="dark"
    className='flex flex-row
    px-2 py-2 h-min absolute whitespace-nowrap
    text-base text-[var(--t-2)] w-min
    bg-[var(--bg-2)] rounded-md 
    '>
        {notification?.message}


    </div>,document.getElementById("portal")
  )
}

export default NotificationPortal