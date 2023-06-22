"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation' 
import Link from 'next/link'
import Title from '../setup/title'
import { Inter } from 'next/font/google'
import LogInWithEmailAndPassword from '@/firebase/auth/LogInWithEmail'
import { signInWithGoogle,signInWithFacebook,signInWithGithub } from '@/firebase/auth/signUpWithProvider';
import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot,runTransaction } from "firebase/firestore";
import { firestore } from '@/firebase/firebaseConfig';
import IconGoogle from '../icons/social/google';

import ResetPasswordButton from './resetButton'
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
    const handleGoogleSignIn =async () =>{
        const {result,error} = await signInWithGoogle()
        console.log(result)
        if (error){
         console.log(error)
         //console.log("change here will error on sign up")
         return
     }else {
       const userNoteDoc = doc(firestore, 'notes', result?.user?.uid);
       try {
         await runTransaction(firestore, async (transaction) => {
           const docSnapshot = await transaction.get(userNoteDoc);
          
         
       console.log("here will,",docSnapshot.exists(), docSnapshot.data())
       if (!docSnapshot.exists()){
        
         try {
           await setDoc(doc(firestore, 'notes', result?.user.uid), {
            notes: [],"highlights": [],
             });
          }catch (err){
           console.log(err,"err")
         } 
         console.log("user notes doc added")
       }else {
         console.log("user has a document already")
       }
     })
   } catch(err){
     console.log(err,"err adding new user doc")
   }

        

         router.push("/")
         
   }
 }
    const handleGithubSignIn =async () =>{
        const {result,error}= await signInWithGithub()
        if (error){
            console.log(error)
            return
        }else {
            console.log(result)
            try {
                setDoc(doc(firestore, 'notes', result.user.uid), {
                    notes: [],"highlights": [],
                  });
               }catch (err){
                console.log(err,"err")
              }

            router.push("/")
        }
        
    }
    const handleFacebookSignIn =async () =>{
        const {result,error}= await signInWithFacebook()
        if (error){
            console.log(error)
            return
        }else {
            console.log(result)
            try {
                setDoc(doc(firestore, 'notes', result.user.uid), {
                    notes: [],"highlights": [],
                  });
               }catch (err){
                console.log(err,"err")
              }

            router.push("/")
        }
        
    }
  return (
    <div className='auth-form-container'>
        <Title text={"Hayyim Word"}/>
        <form onSubmit={(e)=>handleSubmit(e)} className='auth-form'>

            <label  htmlFor='login-email' className='auth-label'>Email <span className='auth-demo'>demo: hayyim@email.com</span></label>
            <input type='email' name="login-email" placeholder='Email' className='auth-input'
            required onChange={(e)=>setEmail(e.target.value)}/>
            <label  htmlFor='login-password' className='auth-label'>Password <span className='auth-demo'>demo: hayyim</span></label>
            <input type='password' name="login-password" className='auth-input'
            placeholder='Password'  required onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className='auth-button'><span className={inter.className}>Login</span></button>
        </form>
        <span onClick={()=>handleGoogleSignIn()} className='google-signin'><IconGoogle/> Sign in with google</span>
        {/* <span onClick={()=>handleGithubSignIn()} className='google-signin'><IconGithub/> Sign in with Github</span> */}
        {/* <span onClick={()=>handleFacebookSignIn()} className='google-signin'><IconFacebook/> Sign in with Facebook</span> */}
        <span className='auth-span'>
           Don&apos;t have an account?
            <Link href={"/signup"} className='auth-link'>Sign up</Link>
        </span>
        <div className='reset-password-container'>Need to reset your password? <ResetPasswordButton/></div>
    </div>
  )
}

export default LoginForm