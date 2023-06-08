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
import SettingsHamburger from './settingsHamburger';
import IconNotes from '../icons/note2';
import IconLogin from '../icons/pages/login';
import IconHighlight from '../icons/pages/highlights';
import IconCreate from '../icons/pages/signup';
import IconHome from '../icons/pages/home';
import IconSettingsSharp from '../icons/pages/settings';
import GetText from './getText';
import IconHistoryTwentyFour from '../icons/pages/history';
import HistoryHamburger from './historyHamburger';

const Hamburger = ({setIsHamburger,isHamburger}) => {
  const {user} = useContext(IsAUserLoggedInContext)
  const [numOfVersesInOpenChapter,SetNumOfVersesInOpenChapter]=useState(1)
 
  const {setOpenBookIndex,openBookIndex,
    openChapterIndex,setOpenChapterIndex,isNote,setIsNote,
    isChaptersMenuOpen,setIsChaptersMenuOpen,setIsHistory,
    isVersesMenuOpen,setIsVersesMenuOpen,isSettings,setIsSettings
    } = useContext(BookContext)
    
    useEffect(()=>{
 const versesObject = chaptersAndVerses[openBookIndex].chapter_verses
      const numOfVerses = Object.entries(versesObject).filter(([k,v])=> parseInt(k)===openChapterIndex+1)[0][1]
      //console.log("num of veres in new open chapter",numOfVerses)
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
      <span className='hamburger-title'>Hayyim Word חיים </span>
     
        <div className='hamburger-link-div'>
       
          <HamburgerItem link={"/"} text={"Home"} icon={<IconHome/>} setIsHamburger={setIsHamburger}/>
          
        {user!==null? <div  className='hamburger-user-wrapper'><LogOutButton/>  <span className='hamburger-user'>{user?.email}</span> </div>:""}
        {user!==null? <HamburgerItem link={"/notes"} text={"Notes"} icon={<IconNotes/>} setIsHamburger={setIsHamburger}/>
        :<HamburgerItem link={"/login"} text={"Login"} icon={<IconLogin/>} setIsHamburger={setIsHamburger}/> }
       {user!==null? <HamburgerItem link={"/highlights"} text={"Highlights"} icon={<IconHighlight/>} setIsHamburger={setIsHamburger}/>
        :<HamburgerItem link={"/signup"} text={"Sign up"} icon={<IconCreate/>} setIsHamburger={setIsHamburger}/> }
         
          <div className='settings-name' onClick={()=>setIsSettings(true)}> <IconSettingsSharp/> Settings</div>
          <div className='settings-name' onClick={()=>setIsHistory(true)}> <IconHistoryTwentyFour/> History</div>
        </div>
        <span className='hamburger-title'>Books of the bible</span>
        <hr className='hamburger-hr'/>
       {/* <div className='chapters-old'>
        <span className='testament-title'>Old Testament</span>
      {chaptersAndVerses.slice(0,39).map((item,index)=>(<BookItem key={uuidv4()} item={item}/>) )}
        </div>
     <div className='chapters-new'>
     <span className='testament-title'>New Testament</span>
      {chaptersAndVerses.slice(39).map((item,index)=>(<BookItem key={uuidv4()} item={item}/>) )}
        </div> */}
      <GetText setIsHamburger={setIsHamburger}/>  

      {/* <div className={`chapters-menu-blur ${isChaptersMenuOpen? "open": ""}`} onClick={()=>handleChaptersMenu()} 
      ></div>
      <ChaptersHamburger item={chaptersAndVerses[openBookIndex]} handleChaptersMenu={handleChaptersMenu}/>

      <div className={`chapters-menu-blur ${isVersesMenuOpen? "open": ""}`} onClick={()=>handleVersesMenu()} 
      ></div>
      <VersesHamburger setIsHamburger={setIsHamburger} handleVersesMenu={handleVersesMenu}
       numberOfVerses={numOfVersesInOpenChapter} book={chaptersAndVerses[openBookIndex]}/> */}
        <HistoryHamburger  setIsHamburger={setIsHamburger}/>
       <SettingsHamburger isSettings={isSettings} setIsSettings={setIsSettings}/>
    </div>
  )
}

export default Hamburger