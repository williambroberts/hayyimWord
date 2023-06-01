"use client"
import logOut from '@/firebase/auth/Logout'
import React from 'react'
import { useRouter } from 'next/navigation'
import IconLogout from '../icons/action/logout'
const LogOutButton = () => {
        const router = useRouter()
        const handleLogOut = ()=>{
            router.push("/")
            logOut()

        }
  return (
    <span onClick={()=>handleLogOut()} className='logout-button'><IconLogout/> Logout</span>
  )
}

export default LogOutButton