export async function getChapter(translation,book,chapter) {
   
    console.log(book,chapter)
    if (book===undefined || book===NaN){
      return 
    }
    if (chapter===undefined){
      chapter = 1
    }

    console.log(book,chapter)
    const url = `https://bolls.life/get-text/${translation}/${book}/${chapter}/`;
    const options = {
      method: 'GET',
      
      
    };
      console.log("here fetching chapter")
    console.log(url)
     const res = await fetch(url,options);
    
     if (!res.ok) {
       
       throw new Error('Failed to fetch data');
     }
     
     return res.json();
   
   }
 
