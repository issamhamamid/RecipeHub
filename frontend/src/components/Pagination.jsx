import {GrFormPrevious} from "react-icons/gr";
import {BsThreeDots} from "react-icons/bs";
import {MdOutlineNavigateNext} from "react-icons/md";


export const Pagination = ({page , count , params , setParams , setString }) => {


    const addToParams = (key , value)=>{
        const sp = new URLSearchParams(params)
        sp.set(key , value)
        return sp.toString()
    }

    const handleClick = (element) => {

        setParams(addToParams('page', element))
        setString(addToParams('page', element))

    };


    if(parseInt(count)===0){
        return null
    }



    const generateArray =()=>{


    // If count is 7 or less, return an array from 1 to count
            if (count <= 7) {
                return Array.from({ length: count }, (_, i) => i + 1);
            }

            const totalNumbers = 7; // This value can be adjusted
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
            array.splice(1, 0, <BsThreeDots key={`left-dots-${page}`} />);


        }

        if(page < count -3){
            array.splice(6, 0, <BsThreeDots key={`right-dots-${page}`}/>);

        }
        return array
    }








    const paginationNumbers = format(
        generateArray().map((element) => {
            return element == page ? (
                <a key={String(element)} className="page_number_current">
                    {element}
                </a>
            ) : (
                <a
                    key={String(element)}
                    onClick={ () => {
                         handleClick(element)
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