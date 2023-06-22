import firebase_app from "../firebaseConfig";
import { getAuth,sendPasswordResetEmail } from "firebase/auth";
const auth=getAuth()
export  async function resetPassword() {
    let result =null,error=null
    try{
        result = await sendPasswordResetEmail(auth, email)
       } catch(err){
        error=err
       }
       return {result,error}
}