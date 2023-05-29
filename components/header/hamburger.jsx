"use client"
import React, { useContext } from 'react'
import FlexCol from '../setup/flexCol'
import HamburgerItem from './hamburgerItem'

import { IsAUserLoggedInContext } from '@/contexts/authContext'
import LogOutButton from '../auth/LogOutButton'

const Hamburger = ({setIsHamburger,isHamburger}) => {
  const {user} = useContext(IsAUserLoggedInContext)
  return (
    <div className={`hamburger ${isHamburger? "open":""} `}>
        <FlexCol width={"100%"} gap={"0.5rem"} align={"flex-start"}>
       
          <HamburgerItem link={"/"} text={"Home"} icon={""} setIsHamburger={setIsHamburger}/>
          
        {user!==null?<LogOutButton/>:""}
          <HamburgerItem link={"/login"} text={"Login"} icon={""} setIsHamburger={setIsHamburger}/>
          <HamburgerItem link={"/signup"} text={"Sign up"} icon={""} setIsHamburger={setIsHamburger}/>
        </FlexCol>
    </div>
  )
}

export default Hamburger