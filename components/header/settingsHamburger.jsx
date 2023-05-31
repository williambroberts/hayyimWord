import React, { useContext } from 'react'
import IconArrowLeft from '../icons/navigation/arrowLeft'
import { useTheme } from 'next-themes'
import { BookContext } from '@/contexts/books'
import FlexRow from '../setup/flexRow'
import IconMagnifyPlusOutline from '../icons/action/magnify'
import IconMagnifyMinusOutline from '../icons/action/magnifysmall'
import BollsTranslations from "../../app/api/bible/translationsBolls.json"
import SearchTranslations from "../../app/api/bible/translationsSearch.json"
import LogOutButton from '../auth/LogOutButton'
const SettingsHamburger = ({isSettings,setIsSettings}) => {
    const { theme, setTheme } = useTheme()

    const {globalFontSize,setGlobalFontSize,
        bollsTranslation,setBollsTranslation,searchTranslation,setSearchTranslation} = useContext(BookContext)
  return (
    <div className={`settings ${isSettings? "open" : ""}`}>
        <nav className='settings-header'>
            <span className='settings-back' onClick={()=>setIsSettings(false)}><IconArrowLeft/></span>
           <span className='settings-title'>Settings</span>
           </nav>
           <p style={{fontSize:`${globalFontSize}px`}}>And the serpent hath been subtile above every beast of the field which Jehovah God hath made, and he saith unto the woman, Is it true that God hath said, Ye do not eat of every tree of the garden?</p>
            <div className='font-size-container'>
               
                <label htmlFor='font-size-input' className='font-size-input-name'>Font Size:</label>
                <span className='font-size-span'>{globalFontSize}(px)</span>
                <span className='font-size-mag'><IconMagnifyMinusOutline/></span>
                <input type='range' max="24" min="12" 
                className='font-size-input'
                name="font-size-input" value={globalFontSize} onChange={(e)=>setGlobalFontSize(e.target.value)}/>
                <span className='font-size-mag'><IconMagnifyPlusOutline/></span>
            </div>
            <div className='color-theme-container'>
                <span>Color Theme</span>
                <FlexRow gap={"1rem"}>
                    <span className={`theme-button-light ${theme==="light"? "checked-light":""}`} onClick={()=>setTheme("light")}>Light</span>
                    <span className={`theme-button-dark  ${theme==="dark"? "checked-dark":""}`} onClick={()=>setTheme("dark")}>Dark</span>
                </FlexRow>

            </div>
           <div className='translation-container'>
            <label htmlFor='bolls-select'>Text translation</label>
                <select className='translation-select' name='bolls-select' onChange={(e)=>setBollsTranslation(e.target.value)}>
                    {BollsTranslations.map((item)=> (<option value={item} className='translation-option'>{item}</option>) )}
                </select>
           </div>
           <div className='translation-container'>
            <label htmlFor='search-select'>Search translation</label>
                <select className='translation-select' name='search-select' onChange={(e)=>setSearchTranslation(e.target.value)}>
                    {SearchTranslations.map((item)=> (<option value={item[0]} className='translation-option'>{item[1].shortname}</option>) )}
                </select>
           </div>
           
    </div>
  )
}

export default SettingsHamburger