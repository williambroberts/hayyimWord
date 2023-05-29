import firebase_app from "../firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function LogInWithEmailAndPassword(email, password) {
    let result = null
    let error = null
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        error = err;
    }

    return { result, error };
}
