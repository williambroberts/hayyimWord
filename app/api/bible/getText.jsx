export default async function getText(bible="kjv_strongs",reference="",whole_words=true,page_all=true,highlight=true) {
    
    // const fetch = require('node-fetch');
    console.log(reference,"golden",bible,whole_words,page_all,highlight)
    
    if (reference===''){
      console.log("leaving",search)
      return undefined
    }
    //add extra search paramers will🦧🦧🦧🦧
    
    const url = `https://api.biblesupersearch.com/api?bible=${bible}&reference=${reference}&whole_words=${whole_words}&data_format=minimal&page_all=true&highlight=${highlight}&markup=raw`
    const options = {
      method: 'GET',
      
      
    };
      console.log("refereceing...fetching")
    console.log(url)
     const res = await fetch(url,options);
   // console.log(res,"res")
     if (!res.ok) {
       
       throw new Error('Failed to fetch data');
     }
     
     return res.json();
   }