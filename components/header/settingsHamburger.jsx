import React, { useContext, useEffect, useState } from 'react'
import IconArrowLeft from '../icons/navigation/arrowLeft'

import { BookContext } from '@/contexts/books'
import FlexRow from '../setup/flexRow'
import { v4 as uuidv4 } from 'uuid'
import IconMagnifyPlusOutline from '../icons/action/magnify'
import IconMagnifyMinusOutline from '../icons/action/magnifysmall'
import BollsTranslations from "../../app/api/bible/translationsBolls.json"
import SearchTranslations from "../../app/api/bible/translationsSearch.json"
import LogOutButton from '../auth/LogOutButton'
import IconPlusCircle from '../icons/action/plus'
import IconMinusCircle from '../icons/action/minus'
import { IsAUserLoggedInContext } from '@/contexts/authContext'
import ResetPasswordButton from '../auth/resetButton'
import { ReactThemeContext, useReactThemeContext } from '../theme/themeReact/reactThemeProvider'
import IconSettingsSharp from '../icons/pages/settings'
const SettingsHamburger = ({isSettings,setIsSettings}) => {
    const {theme,setTheme,setThemeColor,themeColor}=useReactThemeContext()
    const {user}=useContext(IsAUserLoggedInContext)
    const {globalFontSize,setGlobalFontSize,setGlobalLineHeight,globalLineHeight,
        bollsTranslation,setBollsTranslation,searchTranslation,setSearchTranslation} = useContext(BookContext)
        const roundedLineHeight = globalLineHeight.toFixed(1)
        const [isReset,setIsReset]=useState(false)
        const handleReset = ()=>{
            setIsReset(true)
            setTheme("light")
            setThemeColor("default")
            setGlobalFontSize(16)
            setGlobalLineHeight(1.5)
            
        }
        useEffect(()=>{
            if (isReset){
                setTimeout(() => {
                    setIsReset(false)
                }, 300);
            }
        },[isReset])
        useEffect(()=>{
            console.log(searchTranslation,"s trans")
        },[searchTranslation])
        const handlePlus = ()=>{
            console.log("mag",globalFontSize)
            if (globalFontSize===24){
                setGlobalFontSize(24)
                let myButton = document.querySelector(".font-size-mag")
                myButton.style.color = "var(--red)"
                setTimeout(()=>{
                    myButton.style.color = "var(--theme)"
                },1000)
                return
            }else{
                setGlobalFontSize((prev)=>prev+1)
            }
        }

        const handleMinus = ()=>{
            if (globalFontSize===12){
                let myButton = document.querySelector(".font-size-minus")
                myButton.style.color = "var(--red)"
                setTimeout(()=>{
                    myButton.style.color = "var(--theme)"
                },1000)
                return
            }else{
                setGlobalFontSize((prev)=>prev-1)
            }
        }
        const handlePlusLineHeight = ()=>{
            if (globalLineHeight>=2.5){
                setGlobalLineHeight(2.5)
                let myButton = document.querySelector(".line-height-plus")
                myButton.style.color = "var(--red)"
                setTimeout(()=>{
                    myButton.style.color = "var(--theme)"
                },1000)
                return
            }else{
                setGlobalLineHeight((prev)=>parseFloat(prev+.1))
            }
            console.log(globalLineHeight,"line heihgt")
        }
        const handleMinusLineHeight = ()=>{
            if (globalLineHeight<=1){
                setGlobalLineHeight(1)
                let myButton = document.querySelector(".line-height-minus")
                myButton.style.color = "var(--red)"
                setTimeout(()=>{
                    myButton.style.color = "var(--theme)"
                },1000)
                return
            }else{
                setGlobalLineHeight((prev)=>parseFloat(prev-.1))
            }
            console.log(globalLineHeight,"line heihgt")
        }
  return (
    <div 
    data-theme={theme}
    className={`settings ${isSettings? "open" : ""}`}>
        <nav className='settings-header'>
            <span className='settings-back' onClick={()=>setIsSettings(false)}><IconArrowLeft/></span>
           <span className='settings-title'>Settings</span>
           </nav>
           <p style={{fontSize:`${globalFontSize}px`,lineHeight:`${roundedLineHeight}rem`}}><span className="settings-verse">1</span> And the serpent hath been subtile above every beast of the field which Jehovah God hath made, and he saith unto the woman, Is it true that God hath said, Ye do not eat of every tree of the garden?</p>
            <div className='font-size-container'>
               
                <label htmlFor='font-size-input' className='font-size-input-name'>Font size:</label>
                <span className='font-size-span'>{globalFontSize.toFixed(1)}(px)</span>
                <button className='font-size-minus' onClick={()=>handleMinus()}><IconMagnifyMinusOutline/></button>
                {/* <input type='range' max="24" min="12" 
                className='font-size-input'
                name="font-size-input" value={globalFontSize} onChange={(e)=>setGlobalFontSize(e.target.value)}/> */}
                <button className='font-size-mag'  onClick={()=>handlePlus()}><IconMagnifyPlusOutline/></button>
            </div>
            <div className='font-size-container'>
               
               <label htmlFor='font-size-input' className='font-size-input-name'>Line height:</label>
               <span className='font-size-span'>{roundedLineHeight}(rem)</span>
               <button className='line-height-minus' onClick={()=>handleMinusLineHeight()}><IconMinusCircle/></button>
              
               <button className='line-height-plus'  onClick={()=>handlePlusLineHeight()}><IconPlusCircle/></button>
           </div>
            <div 
            aria-label="theme settings"
            className='color-theme-container'>
                <div className='w-full'>Theme</div>
                <FlexRow gap={"1rem"}>
                    <span className={`theme-button-light ${theme==="light"? "checked-light":""}`} onClick={()=>setTheme("light")}>Light</span>
                    <span className={`theme-button-dark  ${theme==="dark"? "checked-dark":""}`} onClick={()=>setTheme("dark")}>Dark</span>
                    <span className={`theme-button-sepia  ${theme==="sepia"? "checked-light":""}`} onClick={()=>setTheme("sepia")}>Sepia</span>
                    <span className={`theme-button-sand  ${theme==="sand"? "checked-light":""}`} onClick={()=>setTheme("sand")}>Sand</span>
                </FlexRow>

            </div>

          <div className='flex flex-col
           bg-[#2b2b2b] 
          w-full gap-2 px-3 py-2'>
            <span className='text-white'>Color Theme</span>
                <div className='grid 
               items-center
                grid-cols-8 w-full gap-1 parent'>
                    <button
                     className={`color__button red ${themeColor==="red"?"selected":""}`}
                    onClick={()=>setThemeColor("red")}
                    ></button>
                    <button
                    className={`color__button orange ${themeColor==="orange"?"selected":""}`}
                    onClick={()=>setThemeColor("orange")}
                    ></button>
                    <button
                     className={`color__button yellow ${themeColor==="yellow"?"selected":""}`}
                    onClick={()=>setThemeColor("yellow")}
                    ></button>
                    <button
                     className={`color__button green ${themeColor==="green"?"selected":""}`}
                    onClick={()=>setThemeColor("green")}
                    ></button>
                
                    <button
                    className={`color__button blue ${themeColor==="blue"?"selected":""}`}
                    onClick={()=>setThemeColor("blue")}
                    ></button>
                    <button
                     className={`color__button purple ${themeColor==="purple"?"selected":""}`}
                    onClick={()=>setThemeColor("purple")}
                    ></button>
                    <button
                    className={`color__button grey ${themeColor==="grey"?"selected":""}`}
                    onClick={()=>setThemeColor("grey")}
                    ></button>
                    <button
                     className={`color__button default ${themeColor==="default"?"selected":""}`}
                    onClick={()=>setThemeColor("default")}
                    ></button>
                </div>
          </div>
            <div className='reset__settings'>
            Reset {isReset?<div><IconSettingsSharp/></div>:<button
                onClick={()=>handleReset()}
                aria-label='reset all'
                > <IconSettingsSharp/></button>} 
            </div>
           {user===null?"":
           <div className='reset-password-container'>
            Need to reset your password? <ResetPasswordButton/></div>
           }
    </div>
  )
}

export default SettingsHamburger