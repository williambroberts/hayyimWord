import React from 'react'
import { resetPassword } from '@/firebase/auth/reset'
const ResetPasswordButton = () => {
    const handleClick = ()=>{
        resetPassword()
    }
  return (
    <button className='reset-password' onClick={handleClick}>
        Reset password
    </button>
  )
}

export default ResetPasswordButton