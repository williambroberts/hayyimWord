import { useEffect,useState } from "react"

export function useLocalStorage(key,initialValue){
    const [value,setValue]=useState(()=>{
        let JSONvalue = localStorage.getItem(key)
        console.log(JSONvalue,typeof(JSONvalue))
        if (JSONvalue===null) {return initialValue}
        return JSON.parse(JSONvalue)
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])

    return [value,setValue]
}