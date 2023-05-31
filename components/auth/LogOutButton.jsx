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
    <span onClick={()=>handleLogOut()} className='logout-button'>Logout</span>
  )
}

export default LogOutButton