// import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect,GithubAuthProvider,FacebookAuthProvider,getRedirectResult } from 'firebase/auth'
import firebase_app from '../firebaseConfig'
const auth = getAuth(firebase_app)

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    let result = null
    let error =null
    try {
    // result = await signInWithPopup(auth, provider);
      
    signInWithRedirect(auth, provider)
    result = await getRedirectResult(auth)
    }catch(err){
        error = err
    }
  
    return {result,error}
  };

  export const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    let result = null
    let error =null
    try {
     result = await signInWithPopup(auth, provider);
    }catch(err){
        error = err
    }
    
    //signInWithRedirect(auth, provider)
    return {result,error}
  };
  export const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    let result = null
    let error =null
    try {
     result = await signInWithPopup(auth, provider);
    }catch(err){
        error = err
    }
    
    //signInWithRedirect(auth, provider)
    return {result,error}
  };
