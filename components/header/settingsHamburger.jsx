import React, { useContext } from 'react'
import IconArrowLeft from '../icons/navigation/arrowLeft'
import { useTheme } from 'next-themes'
import { BookContext } from '@/contexts/books'
import FlexRow from '../setup/flexRow'
import IconMagnifyPlusOutline from '../icons/action/magnify'
import IconMagnifyMinusOutline from '../icons/action/magnifysmall'
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
           {/* font-size */}
           {/* theme */}
           {/* transltaion search */}
           {/* translation bolls */}
    </div>
  )
}

export default SettingsHamburger