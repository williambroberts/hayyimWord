"use client"
import React, {useContext, useState} from 'react'
import signUpWithEmailAndPassword from '@/firebase/auth/signUpWithEmail';
import { useRouter } from 'next/navigation'
import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot,runTransaction } from "firebase/firestore";
import { firestore } from '@/firebase/firebaseConfig';
import Link from 'next/link'
import Title from '../setup/title';
import { Inter } from 'next/font/google'
import { signInWithGoogle,signInWithFacebook,signInWithGithub } from '@/firebase/auth/signUpWithProvider';
import IconGoogle from '../icons/social/google';
import ResetPasswordButton from './resetButton';
import { IsAUserLoggedInContext } from '@/contexts/authContext';
import NotificationPortal from './notificationPortal';

const inter  = Inter({subsets:["latin"]})

const SignUpForm = () => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()
    const router = useRouter()
    const {notification,setNotification,setOpenNotification,openNotification}=useContext(IsAUserLoggedInContext)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (confirmPassword !== password){
          setNotification((prev)=>"Passwords do not match")
            //alert("Passwords do not match")
            return
        }

        const resArr = await signUpWithEmailAndPassword(email,password)
        const {result, error} = resArr
        if (error){
            console.log(error)
            setNotification((prev)=>error.code)
           // alert("Failed to sign up. Please try again.")
            console.log("change here will error on sign up")
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
            return
        }
    }
    const handleGoogleSignIn =async () =>{
        const {result,error} = await signInWithGoogle()
        console.log(result)
        if (error){
         console.log(error)
         setNotification((prev)=>error.code)
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

        <label  htmlFor='sign-up-email' className='auth-label'>Email</label>
            <input type='email' name="sign-up-email" placeholder='E-mail address' className='auth-input'
             required onChange={(e)=>setEmail(e.target.value)}/>
           <label  htmlFor='sign-up-password' className='auth-label'>Password</label>
            <input type='password' name="sign-up-password" className='auth-input'
             placeholder='Password'  required onChange={(e)=>setPassword(e.target.value)}/>
             <label  htmlFor='sign-up-confirm-password' className='auth-label'>Confirm password</label>
            <input type='password' name="sign-up-confirm-password" className='auth-input'
             placeholder='Confirm password'  required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button type='submit' className='auth-button'><span className={inter.className}>Sign up</span></button>
        </form>

        <span onClick={()=>handleGoogleSignIn()} className='google-signin'><IconGoogle/> Sign in with Google</span>
        {/* <span onClick={()=>handleGithubSignIn()} className='google-signin'><IconGithub/> Sign in with Github</span> */}
        {/* <span onClick={()=>handleFacebookSignIn()} className='google-signin'><IconFacebook/> Sign in with Facebook</span> */}
        <span className='auth-span'>
            Already have an account?
            <Link href={"/login"} className={`${inter.className} auth-link`}>Login</Link>
        </span>
        <div className='reset-password-container'>Need to reset your password? <ResetPasswordButton/></div>
        {openNotification && <NotificationPortal notification={notification}/>}
    </div>
  )
}

export default SignUpForm