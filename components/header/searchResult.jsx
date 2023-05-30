"use client"
import React, {useContext, useEffect,useState} from 'react'
import { getChapter } from '@/app/api/bible/getChapter'
import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
import { BookContext } from '@/contexts/books'
const SearchResultItem = ({item,setIsSearch}) => {
    const {setOpenBookIndex,openBookIndex,
      openChapterIndex,setOpenChapterIndex,
      isChaptersMenuOpen,setIsChaptersMenuOpen,
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
    
    if (isLoading){
      return null
    }
    const handleGoto =async ()=>{
        setIsSearch((prev)=>false)
        console.log(book,"here will",item)
        setOpenBookIndex(item.book-1)
        setStartVerse(item.verse)
        setOpenChapterIndex(item.chapter-1)
        const data = await getChapter(bollsTranslation,parseInt(item.book),parseInt(item.chapter))
        setTheText(data)
    }
  return (
    <div className='search-result-item' onClick={()=>handleGoto()}>
        <span className='search-result-item-title'>{book.name} {item.chapter}:{item.verse}
        <span className='search-result-icon'>&#8250;</span> 
        </span>
       {/* <span className='search-result-item-text'>{item.text}</span> */}
       {formattedStr===''? "": <div className="search-result-item-text" dangerouslySetInnerHTML={{ __html: formattedStr }}/>}
    </div>
  )
}

export default SearchResultItem