import React, { useContext, useEffect } from 'react'
import IconDelete from '../icons/action/delete'
import IconCrossCircled from '../icons/action/cross'
import { BookContext } from '@/contexts/books'
import { doc, runTransaction } from 'firebase/firestore'
import { auth, firestore } from '@/firebase/firebaseConfig'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import { useNotification } from '@/contexts/notificationContext'
import NotificationPortal from '../notificationPortal'

const HighlightHamburger = ({handleClose,open,data}) => {
  const {setWordsHighlighted}=useContext(BookContext)
  const {user}=useContext(IsAUserLoggedInContext)
  const {setNotification,notification}=useNotification()
    function closeMenu(e){
        let highlightMenu = document.querySelector("[data-highlight-menu]")
        let Rect = highlightMenu.getBoundingClientRect()
        if (e.clientX <Rect.left || e.clientX>Rect.right ||
          e.clientY<Rect.top || e.clientY>Rect.bottom){
            console.log("👍🏻OK")
            handleClose()
            setWordsHighlighted([])
          }
    }
    useEffect(()=>{
        console.log(open)
        if (open){
           document.addEventListener("mousedown",closeMenu)
        }
           return()=>{
          document.removeEventListener("mousedown",closeMenu)
        }
    },[open])
  
    const handleHighlight=async (color) => {
      console.log("cliekd")
      if (auth.currentUser===null || auth.currentUser===undefined){
        setNotification({open:true,message:"Please sign in to highlight",
      time:3000,type:"alert"
      })
        return
      }
        //🍏run transaction
        let newData = {...data,color:color}
        if (newData.exactId.includes("NaN") || newData.ids.length===0){
          console.log("🧧🥩🍔🌽")
        }
        try {
          const useHighlightsRef = doc(firestore,"notes",user?.uid)
          await runTransaction(firestore, async (transaction) => {
            const docSnapshot = await transaction.get(useHighlightsRef);
           const highlights = [...docSnapshot.data().highlights]
            console.log(highlights,"pre delete notes")
         let updatedHighlights = [...highlights]
         
          updatedHighlights.push(newData)
          transaction.update(useHighlightsRef, { highlights: updatedHighlights })
          
        }).then(()=>{
          setWordsHighlighted([])
          handleClose()
        })
      
          
        } catch (error) {
          console.error('Error rehighlightig/highlighting : ', error);
        } 

    }
    function handleDeleteHighlight(){
      handleHighlight("")
    }
  return (
    <div 
    data-highlight-menu
    className={`highlight__menu ${open?"open":""}`}>
         <div className='highlight-colors'>
                    <span className='highlight-none' onClick={()=>handleDeleteHighlight()}><IconDelete/></span>
                    <span className='highlight-red' onClick={()=>handleHighlight("#ff78424b")}></span>
                    <span className='highlight-orange'onClick={()=>handleHighlight("#f7aa3572")}></span>
                    <span className='highlight-yellow'onClick={()=>handleHighlight("#FFF36D")}></span>
                    <span className='highlight-green' onClick={()=>handleHighlight("#d9f7bf50")}></span>
                    <span className='highlight-blue' onClick={()=>handleHighlight("#2edae30f")}></span>
                    <span className='highlight-purple'onClick={()=>handleHighlight("#c8bff7")}></span>
         
                    <span 
        className='cursor-pointer text-xl'
         onClick={handleClose}
         ><IconCrossCircled/></span>
         </div>
        {notification.open && <NotificationPortal/>}
    </div>
  )
}

export default HighlightHamburger