export async function SearchBible(bible="net",search="",whole_words=true,page_all=true,highlight=true) {
    
    // const fetch = require('node-fetch');
    console.log(search,"golden",bible,whole_words,page_all,highlight)
    if (search===''){
      console.log("leaving",search)
      return undefined
    }
    //add extra search paramers will🦧🦧🦧🦧
    
    const url = `https://api.biblesupersearch.com/api?bible=${bible}&search=${search}&whole_words=${whole_words}&data_format=minimal&page_all=true&highlight=${highlight}`
    const options = {
      method: 'GET',
      
      
    };
      console.log("searching...fetching")
    console.log(url)
     const res = await fetch(url,options);
    console.log(res,"res")
     if (!res.ok) {
       
       throw new Error('Failed to fetch data');
     }
     
     return res.json();
   }