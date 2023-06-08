export default async function getStrong(word){
    console.log("fetching strong",word)
    if (word===null){
        return
    }
    if (word===undefined){
        return
    }
    
    const url = `https://bolls.life/dictionary-definition/BDBT/${word}/`
    const options ={
        method:"GET",
    }
    const res = await fetch(url,options)
    console.log(res.status,res.ok,url)
    if (!res.ok){
        throw new Error("failed to fetch strongs...")
    }
    return res.json()
}