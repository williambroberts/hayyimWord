"use client"
import React, {useState} from 'react'
import signUpWithEmailAndPassword from '@/firebase/auth/signUpWithEmail';
import { useRouter } from 'next/navigation'
import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";
import { firestore } from '@/firebase/firebaseConfig';
import Link from 'next/link'
import Title from '../setup/title';
import { Inter } from 'next/font/google'
const inter  = Inter({subsets:["latin"]})

const SignUpForm = () => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()
    const router = useRouter()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (confirmPassword !== password){
            alert("Passwords do not match")
            return
        }

        const resArr = await signUpWithEmailAndPassword(email,password)
        const {result, error} = resArr
        if (error){
            console.log(error)
            console.log("change here will error on sign up")
            return
        }else {
            console.log(result)
            try {
                setDoc(doc(firestore, 'notes', result.user.uid), {
                    notes: [],favourites: {"orange":[],"yellow":[],"green":[],"blue":[],"purple":[]},
                  });
               }catch (err){
                console.log(err,"err")
              }

            router.push("/")
            return
        }
    }
  return (
    <div className='auth-form-container'>
        <Title text={"Sign up"}/>
        <form onSubmit={(e)=>handleSubmit(e)} className='auth-form'>

        <label  htmlFor='sign-up-email' className='auth-label'>Email</label>
            <input type='email' name="sign-up-email" placeholder='Email' className='auth-input'
             required onChange={(e)=>setEmail(e.target.value)}/>
           <label  htmlFor='sign-up-password' className='auth-label'>Password</label>
            <input type='password' name="sign-up-password" className='auth-input'
             placeholder='Password'  required onChange={(e)=>setPassword(e.target.value)}/>
             <label  htmlFor='sign-up-confirm-password' className='auth-label'>Confirm password</label>
            <input type='password' name="sign-up-confirm-password" className='auth-input'
             placeholder='Password'  required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button type='submit' className='auth-button'><span className={inter.className}>Sign up</span></button>
        </form>
        <span className='auth-span'>
            Already have an account?
            <Link href={"/login"} className={`${inter.className} auth-link`}>Login</Link>
        </span>
    </div>
  )
}

export default SignUpForm