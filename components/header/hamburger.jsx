"use client"
import React, { useContext } from 'react'
import FlexCol from '../setup/flexCol'
import { v4 as uuidv4 } from 'uuid';
import HamburgerItem from './hamburgerItem'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import LogOutButton from '../auth/LogOutButton'
import BookItem from './BookItem';

const Hamburger = ({setIsHamburger,isHamburger}) => {
  const {user} = useContext(IsAUserLoggedInContext)
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
      <div className='chapter-grid'>
        <div className='chapters-old'>
      {chaptersAndVerses.slice(0,40).map((item,index)=>(<BookItem key={uuidv4()} item={item}/>) )}
        </div>
        <div className='chapters-new'>
      {chaptersAndVerses.slice(40).map((item,index)=>(<BookItem key={uuidv4()} item={item}/>) )}
        </div>
      </div>


    </div>
  )
}

export default Hamburger