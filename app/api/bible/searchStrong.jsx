export async function SearchStrong(bible="kjv_strongs",search="",whole_words=true,page_all=false,highlight=true) {
    
    // const fetch = require('node-fetch');
    console.log(search,"searchStrong",bible,whole_words,page_all,highlight)
    if (search===''){
      console.log("leaving",search)
      return undefined
    }
    //add extra search paramers will🦧🦧🦧🦧PAGNATION
    
    const url = `https://api.biblesupersearch.com/api?bible=${"kjv_strongs"}&search=${search}&whole_words=${whole_words}&data_format=minimal&page_all=${page_all}&highlight=${highlight}`
    const options = {
      method: 'GET',
      
      
    };
    // if a strongs number change url 
   
      //console.log("searching...fetching")
    //console.log(url)
     const res = await fetch(url,options);
    //console.log(res,"res")
     if (!res.ok) {
       
       throw new Error('Failed to fetch data');
     }
     
     return res.json();
   }