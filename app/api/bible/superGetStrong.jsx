export async function superGetStrong(word) {
    
 
    console.log(word,"getStrongSuper")
    if (word===''){
      console.log("leaving",search)
      return undefined
    }
    //add extra search paramers will🦧🦧🦧🦧
    
    const url = `https://api.biblesupersearch.com/api/strongs?strongs=${word}`
    const options = {
      method: 'GET',
      
      
    };
    
    console.log(url)
     const res = await fetch(url,options);
    console.log(res,"res")
     if (!res.ok) {
       
       throw new Error('Failed to fetch data');
     }
     
     return res.json();
   }