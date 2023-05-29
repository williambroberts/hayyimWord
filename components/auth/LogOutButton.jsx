"use client"
import logOut from '@/firebase/auth/Logout'
import React from 'react'
import { useRouter } from 'next/navigation'
const LogOutButton = () => {
        const router = useRouter()
        const handleLogOut = ()=>{
            router.push("/")
            logOut()

        }
  return (
    <button onClick={()=>handleLogOut()} className='logout-button'>Log out</button>
  )
}

export default LogOutButton