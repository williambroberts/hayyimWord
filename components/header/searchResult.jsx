"use client"
import React, {useEffect,useState} from 'react'

import chaptersAndVerses from "../../app/api/bible/chaptersAndVerses.json"
const SearchResultItem = ({item,setIsSearch}) => {

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
    const handleGoto = ()=>{
        setIsSearch((prev)=>false)
        // search api boollls
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