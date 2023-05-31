"use client"
import React,{createContext,useContext,useEffect,useState} from 'react'
import { IsAUserLoggedInContext } from './authContext'
import { doc,onSnapshot } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';
export const  DataContext = createContext()
const DataProvider = ({children}) => {
    const [firebaseHighlights,setfirebaseHighlights]=useState(null)
    const [firebaseNotes,setFirebaseNotes]=useState(null)
    const {user}=useContext(IsAUserLoggedInContext)
    useEffect(()=>{
        console.log("try snapshot")
        if (user!==null){
            try{
            const liveHighlights = onSnapshot(doc(firestore, "notes", `${user?.uid}`), (doc) => {
                        setfirebaseHighlights(doc.data()?.highlights)
                        console.log("doc.data()",doc.data())
                    })
        }catch(err){
            console.log(err)
        }
        try{
            const liveNotes = onSnapshot(doc(firestore, "notes", `${user?.uid}`), (doc) => {
                        setFirebaseNotes(doc.data()?.notes)
                  
                    })
        }catch(err){
            console.log(err)
        }
        }
        
        
    },[user?.uid])
  return (
    <DataContext.Provider value={{firebaseHighlights,setfirebaseHighlights,firebaseNotes,setFirebaseNotes}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider