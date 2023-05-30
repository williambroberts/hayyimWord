"use client"
import React,{createContext,useContext,useEffect,useState} from 'react'
import { IsAUserLoggedInContext } from './authContext'
export const  DataContext = createContext()
const DataProvider = ({children}) => {
    const [firebaseFavs,setFirebaseFavs]=useState(null)
    const [firebaseNotes,setFirebaseNotes]=useState(null)
    const {user}=useContext(IsAUserLoggedInContext)
    useEffect(()=>{
        if (user!==null){
            try{
            const liveFavs = onSnapshot(doc(firestore, "favorites", `${user?.uid}`), (doc) => {
                        setFirebaseFavs(doc.data()?.favourites)
                  
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
    <DataContext.Provider value={{firebaseFavs,setFirebaseFavs,firebaseNotes,setFirebaseNotes}}>
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider