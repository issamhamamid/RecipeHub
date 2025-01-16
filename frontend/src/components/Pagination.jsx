import {GrFormPrevious} from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export const Pagination = ({page}) => {
    const [params , setParams] = useSearchParams()
    const [count, setCount] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/recipes/count').then(response=>{
            setCount(response.data.data)
        })
    }, []);

    const generateArray =()=>{
        const totalNumbers = 7; // Total numbers in the array
        const middleCount = totalNumbers - 2; // 5 numbers between 1 and 30

        // Ensure the page value is central in the middle sequence
        let offset = Math.floor(middleCount / 2);
        let start = Math.max(2, page - offset); // Start near the page number
        let end = start + middleCount - 1;

        // Adjust if the end goes beyond 29
        if (end >= count) {
            start -= end - (count-1);
        }


        // Generate the middle sequence
        const middle = Array.from({ length: middleCount }, (_, i) => start + i);

        // Add 1 and 30 to the sequence
        return [1, ...middle, count];
    }

    const format = (array)=>{
        if (page > 4){
            array.splice(1, 0, <BsThreeDots key="left-dots" />);

        }

        if(page < count -3){
            array.splice(7, 0, <BsThreeDots key="right-dots" />);
        }
        return array
    }


    const addToParams = (key , value)=>{
        const sp = new URLSearchParams(params)
        sp.set(key , value)
        return sp.toString()
    }




    const paginationNumbers = format(
        generateArray().map((element) => {
            return element == page ? (
                <a key={element} className="page_number_current">
                    {element}
                </a>
            ) : (
                <a
                    key={element}
                    onClick={() => {
                        setParams(addToParams('page', element));
                    }}
                    className="page_number"
                >
                    {element}
                </a>
            );
        })
    );

    return (
        <div className='pagination'>
            <GrFormPrevious className='next'/>
            {paginationNumbers}
            <MdOutlineNavigateNext className='next'/>

        </div>
    )
}