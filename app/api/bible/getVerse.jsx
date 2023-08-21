export default async function getVerse(bible="kjv",reference="",whole_words=true,page_all=true,highlight=true) {
    //console.log(reference,"verse ref")
    if (reference===""){
        return
    }
    if (reference===null | reference===undefined){
        return
    }
    const url = `https://api.biblesupersearch.com/api?bible=${bible}&reference=${reference}&whole_words=${whole_words}&data_format=minimal&page_all=true&highlight=${highlight}&markup=raw`
    const options = {
      method: 'GET',
      
      
    };
      //console.log("refereceing...fetching")
    //console.log(url)
     const res = await fetch(url,options);
   // console.log(res,"res")
     if (!res.ok) {
       console.log(res)
       //throw new Error('Failed to fetch data');
     }
     
     return res.json();
   }
