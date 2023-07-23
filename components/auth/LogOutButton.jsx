"use client"
import logOut from '@/firebase/auth/Logout'
import React from 'react'
import { useRouter } from 'next/navigation'
import IconLogout from '../icons/action/logout'
import { usePathname } from 'next/navigation'
const LogOutButton = () => {
  const pathname = usePathname()
        const router = useRouter()
        const handleLogOut = ()=>{
            router.push("/")
            logOut()
            if (pathname==="/"){
              window.location.reload(true)
            }


        }
  return (
    <span onClick={()=>handleLogOut()} className='logout-button'><IconLogout/> Logout</span>
  )
}

export default LogOutButton