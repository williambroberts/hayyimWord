import firebase_app, {firestore} from "../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

//import { addDoc, collection, setDoc, deleteDoc, doc, query, onSnapshot } from "firebase/firestore";

const auth = getAuth(firebase_app);


export default async function signUpWithEmailAndPassword(email, password) {
    let result = null
    let  error = null
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
       
       
       
       
    } catch (err) {
        error = err;
    }

    return { result, error };
}