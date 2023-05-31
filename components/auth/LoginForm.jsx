"use client"
import React,{useState} from 'react'

import { useRouter } from 'next/navigation' 
import Link from 'next/link'
import Title from '../setup/title'
import { Inter } from 'next/font/google'
import LogInWithEmailAndPassword from '@/firebase/auth/LogInWithEmail'
const inter  = Inter({subsets:["latin"]})
const LoginForm = () => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const router = useRouter()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const resArr = await LogInWithEmailAndPassword(email,password)
        const {result, error} = resArr
        if (error){
            console.log(error)
            console.log("change here will error on login")
            return
        }else {
            console.log(result,result.user.uid)
            router.push("/")
            return
        }
    }
  return (
    <div className='auth-form-container'>
        <Title text={"Hayyim Word"}/>
        <form onSubmit={(e)=>handleSubmit(e)} className='auth-form'>

            <label  htmlFor='login-email' className='auth-label'>Email</label>
            <input type='email' name="login-email" placeholder='Email' className='auth-input'
            required onChange={(e)=>setEmail(e.target.value)}/>
            <label  htmlFor='login-password' className='auth-label'>Password</label>
            <input type='password' name="login-password" className='auth-input'
            placeholder='Password'  required onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className='auth-button'><span className={inter.className}>Login</span></button>
        </form>
        <span className='auth-span'>
           Don&apos;t have an account?
            <Link href={"/signup"} className='auth-link'>Sign up</Link>
        </span>
    </div>
  )
}

export default LoginForm