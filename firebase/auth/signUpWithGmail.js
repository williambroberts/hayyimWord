// import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { getAuth,GoogleAuthProvider,signInWithPopup,signInWithRedirect } from 'firebase/auth'
import firebase_app from '../firebaseConfig'
const auth = getAuth(firebase_app)

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
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

