"use client"
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { resetPassword } from '@/firebase/auth/reset'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import ReactDom from 'react-dom'
const ResetPortal = () => {
    const {setOpenModal,setNotifcation}=useContext(IsAUserLoggedInContext)

    const [email,setEmail]=useState("")
    const handleBack = ()=>{
        setOpenModal((prev)=>false)
        //window.navigator
    }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            let {result,error} = await resetPassword(email)
            if (error){
                setNotifcation((prev)=>error.code)
            }
        }catch(err){
            console.log(err)
        }
        setOpenModal((prev)=>false)
    }
  return ReactDom.createPortal(
    <div className='reset-portal'>
        <button className='reset-portal-back' onClick={handleBack}>Back</button>
        <form onSubmit={handleSubmit} className='auth-form'>
            <input type='text' value={email} required placeholder='Enter email address'
             name='reset-email' onChange={(e)=>setEmail(e.target.value)}
             className='auth-input'
             />
             <button className='auth-button'>Send password reset email</button>
        </form>
    </div>, 
     document.getElementById('portal')
  )
}

export default ResetPortal