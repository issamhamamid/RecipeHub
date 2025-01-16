import {GrFormPrevious} from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineNavigateNext } from "react-icons/md";


export const Pagination = ({page}) => {

    const generateArray =()=>{
        const totalNumbers = 7; // Total numbers in the array
        const middleCount = totalNumbers - 2; // 5 numbers between 1 and 30

        // Ensure the page value is central in the middle sequence
        let offset = Math.floor(middleCount / 2);
        let start = Math.max(2, page - offset); // Start near the page number
        let end = start + middleCount - 1;

        // Adjust if the end goes beyond 29
        if (end >= 30) {
            start -= end - 29;
        }


        // Generate the middle sequence
        const middle = Array.from({ length: middleCount }, (_, i) => start + i);

        // Add 1 and 30 to the sequence
        return [1, ...middle, 30];
    }

    const format = (array)=>{
        if (page > 4){
            array.splice(1, 0, <BsThreeDots />);

        }

        if(page < 27){
            array.splice(7, 0, <BsThreeDots />);
        }
        return array
    }

    const paginationNumbers = format(generateArray().map((element)=> {
        return element ===page ? <a key={element} className='page_number_current'>{element}</a> : <a key={element} className='page_number'>{element}</a>
    }))


    return (
        <div className='pagination'>
            <GrFormPrevious className='next'/>
            {paginationNumbers}
            <MdOutlineNavigateNext className='next'/>

        </div>
    )
}