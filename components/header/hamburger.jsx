"use client"
import React, { useContext, useEffect, useState } from 'react'
import FlexCol from '../setup/flexCol'
import { v4 as uuidv4 } from 'uuid';
import HamburgerItem from './hamburgerItem'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import LogOutButton from '../auth/LogOutButton'
import BookItem from './BookItem';
import { BookContext } from '@/contexts/books';
import ChaptersHamburger from './chaptersHamburger';
import VersesHamburger from './versesHamburger';

const Hamburger = ({setIsHamburger,isHamburger}) => {
  const {user} = useContext(IsAUserLoggedInContext)
  const [numOfVersesInOpenChapter,SetNumOfVersesInOpenChapter]=useState(1)
  const {setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,
    isChaptersMenuOpen,setIsChaptersMenuOpen,
    isVersesMenuOpen,setIsVersesMenuOpen,
    } = useContext(BookContext)

    useEffect(()=>{
 const versesObject = chaptersAndVerses[openBookIndex].chapter_verses
      const numOfVerses = Object.entries(versesObject).filter(([k,v])=> parseInt(k)===openChapterIndex+1)[0][1]
      console.log("num of veres in new open chapter",numOfVerses)
      SetNumOfVersesInOpenChapter(numOfVerses)
    },[openChapterIndex])
 
  const handleChaptersMenu = ()=>{
    setIsChaptersMenuOpen(false)
    
  }
  const handleVersesMenu = ()=>{
    setIsVersesMenuOpen(false)
  }
  return (
    <div className={`hamburger ${isHamburger? "open":""} `}>
        <div className='hamburger-link-div'>
       
          <HamburgerItem link={"/"} text={"Home"} icon={""} setIsHamburger={setIsHamburger}/>
          
        {user!==null?<LogOutButton/>:""}
        {user!==null? <HamburgerItem link={"/notes"} text={"Notes"} icon={""} setIsHamburger={setIsHamburger}/>
        :<HamburgerItem link={"/login"} text={"Login"} icon={""} setIsHamburger={setIsHamburger}/> }
       {user!==null? <HamburgerItem link={"/favourites"} text={"Favourites"} icon={""} setIsHamburger={setIsHamburger}/>
        :<HamburgerItem link={"/signup"} text={"Sign up"} icon={""} setIsHamburger={setIsHamburger}/> }
         
          
        </div>
     
       <div className='chapters-old'>
      {chaptersAndVerses.slice(0,39).map((item,index)=>(<BookItem key={uuidv4()} item={item}/>) )}
        </div>
     <div className='chapters-new'>
      {chaptersAndVerses.slice(39).map((item,index)=>(<BookItem key={uuidv4()} item={item}/>) )}
        </div>
      

      <div className={`chapters-menu-blur ${isChaptersMenuOpen? "open": ""}`} onClick={()=>handleChaptersMenu()} 
      ></div>
      <ChaptersHamburger item={chaptersAndVerses[openBookIndex]}/>

      <div className={`chapters-menu-blur ${isVersesMenuOpen? "open": ""}`} onClick={()=>handleVersesMenu()} 
      ></div>
      <VersesHamburger setIsHamburger={setIsHamburger}
       numberOfVerses={numOfVersesInOpenChapter} book={chaptersAndVerses[openBookIndex]}/>
    </div>
  )
}

export default Hamburger