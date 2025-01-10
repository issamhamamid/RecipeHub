import {useState , useEffect , useRef} from "react";

const  useLocalState = (key)=>{
    const firstRender = useRef(0);
    const [value, setValue] = useState((key)=>{
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue !== null
            ? JSON.parse(localStorageValue)
            : ''
    });

    useEffect(() => {

        if(firstRender.current >1){
            localStorage.setItem(key, JSON.stringify(value));
        }

        else {
            firstRender.current =firstRender.current +1
        }
    }, [key, value]);

    return [value , setValue]

}


export {useLocalState}