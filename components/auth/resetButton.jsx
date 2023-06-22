"use client"
import React, { useContext, useState } from 'react'
import { resetPassword } from '@/firebase/auth/reset'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import ResetPortal from './resetPortal'
const ResetPasswordButton = () => {
    const {setOpenModal,openModal}=useContext(IsAUserLoggedInContext)
    const handleClick = ()=>{
      console.log("reset password clicked")
      //open modal
      if (openModal){
        return
      }
      setOpenModal((prev)=>true)
    }
  return (
    <button className='reset-password' onClick={handleClick}>
        Reset password
        {openModal && <ResetPortal/>}
    </button>
  )
}

export default ResetPasswordButton