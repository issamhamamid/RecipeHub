import { FiFilter } from "react-icons/fi";

import { RiSearchLine } from "react-icons/ri";
import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";



export const DiscoverHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [search, setSearch] = useState('');
    const [params , setParams] = useSearchParams()
    const firstRender = useRef(0);


    function handleChange(event) {

        event.preventDefault();
        setSearch(event.target.value)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 3) {
                setIsScrolled(true); // Change background when scroll is more than 50px
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup on component unmount
        };
    }, []);


    useEffect(() => {



            if(firstRender.current >2){
            const sp = new URLSearchParams(params)
            sp.set('search' , search)
            sp.set('page' , '1')
            setParams(sp)
        }

        else {

            firstRender.current =firstRender.current +1
        }
    }, [search]);


    return (
        <>
            <header className={isScrolled? 'discover-header-scroll' : 'discover-header'}>
                <div className='discover-header-content'>
                    <div className='filter'>
                        <FiFilter className='discover-filter-logo'/>
                        <p className='filters'>Filters</p>
                    </div>
                    <div className='search'>
                        <RiSearchLine className='discover-search-logo'/>
                        <input onChange={handleChange}  value={search} onClick={handleChange} placeholder="Search Recipes..." className='input-search'  />

                    </div>
                </div>
            </header>
        </>
    )
}