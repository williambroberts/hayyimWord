import { useEffect } from "react"

export function useLocalStorage(key,initialValue){
    const [value,setValue]=useState(()=>{
        let JSONvalue = localStorage.getItem(key)
        if (JSONvalue===null) {return null}
        return JSON.parse(JSONvalue)
    })

    useEffect(()=>{
        localStorage.setItem(key,value)
    },[key,value])

    return [value,setValue]
}