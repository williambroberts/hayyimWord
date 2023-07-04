"use client"
import React, {useContext, useEffect,useState} from 'react'
import { getChapter } from '@/app/api/bible/getChapter'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { BookContext } from '@/contexts/books'
import { useRouter } from 'next/navigation'
import getText from '@/app/api/bible/getText'
import { usePathname } from 'next/navigation'
const SearchResultItem = ({item,setIsSearch}) => {
  const router = useRouter()
  const pathname = usePathname()
    const {setOpenBookIndex,openBookIndex,
      openChapterIndex,setOpenChapterIndex,strongData,isStrong,
      isChaptersMenuOpen,setIsChaptersMenuOpen,setScrollChangeNeeded,displayTitle,setDisplayTitle,
      isVersesMenuOpen,setIsVersesMenuOpen,bollsTranslation,setBollsTranslation,
      startVerse,setStartVerse,theText,setTheText
      } = useContext(BookContext)
    const book = chaptersAndVerses.filter((obj)=> obj.id===item.book)[0]
    const [formattedStr, setFormattedStr] = useState('');
    const [isLoading,setisLoading]=useState(true)
    useEffect(() => {
      const verseText = item.text
      const div = document.createElement('div');
      div.innerHTML = verseText;

      div.querySelectorAll('b').forEach((mark) => {
        const span = document.createElement('span');
        //span.style.fontWeight =600;
        span.classList.add("search-result-highlight")
        span.textContent = mark.textContent;
        mark.replaceWith(span);
      });

      setFormattedStr(div.innerHTML);
      setisLoading(false)
    }, []);
    
    useEffect(()=>{
      if (isStrong){
        let verseText = formattedStr.slice()
        console.log(verseText)
        //get engSTRONG WORD AND BOLD
      }
    },[])

    if (isLoading){
      return null
    }
    const handleGoto =async ()=>{
        setIsSearch((prev)=>false)
        console.log(book,"here will",item)
        setOpenBookIndex(item.book-1)
        setStartVerse(item.verse)
        setOpenChapterIndex(item.chapter-1)
       
        let reference = chaptersAndVerses[item.book-1].shortname+parseInt(item.chapter)
        let data = await getText("kjv_strongs",reference)
         
          setTheText(data.results.kjv_strongs)
        
          setDisplayTitle([openBookIndex,openChapterIndex])
       
       
        setScrollChangeNeeded((prev)=>!prev)
        setDisplayTitle([item.book-1,item.chapter-1])

        if (pathname!=="/"){
          router.push("/")
        }
    }
  return (
    <div className='search-result-item' onClick={()=>handleGoto()}>
        <span className='search-result-item-title'>{book?.name} {item?.chapter}:{item?.verse}
        <span className='search-result-icon'>&#8250;</span> 
        </span>
       {/* <span className='search-result-item-text'>{item.text}</span> */}
       {formattedStr===''? "": <div className="search-result-item-text" dangerouslySetInnerHTML={{ __html: formattedStr }}/>}
    </div>
  )
}

export default SearchResultItem