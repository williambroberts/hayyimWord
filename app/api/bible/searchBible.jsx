export async function getSearch(bible,search,whole_words=true,page_all=true,highlight=true) {
    
    // const fetch = require('node-fetch');
    console.log(search,"golden")
    if (search===''){
      console.log("leaving",search)
      return undefined
    }
    const url = `https://api.biblesupersearch.com/api
    ?bible=${bible}&search=${search}&whole_words=${whole_words}&page_all=${page_all}
    &highlight=${highlight}`;
    const options = {
      method: 'GET',
      
      
    };
      console.log("searching...fetching")
    console.log(url)
    //  const res = await fetch(url,options);
    
    //  if (!res.ok) {
       
    //    throw new Error('Failed to fetch data');
    //  }
     
    //  return res.json();
   }