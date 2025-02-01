import { FiFilter } from "react-icons/fi";

import { RiSearchLine } from "react-icons/ri";
import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useScroll} from "../customHooks/useScroll.js";



export const DiscoverHeader = ({setString}) => {

    const [search, setSearch] = useState('');
    const [params , setParams] = useSearchParams()
    const firstRender = useRef(0);


    function handleChange(event) {

        event.preventDefault();
        setSearch(event.target.value)
    }

    const isScrolled = useScroll(3)


    useEffect(() => {



            if(firstRender.current >2){
            const sp = new URLSearchParams(params)
            sp.set('search' , search)
            sp.set('page' , '1')
            setParams(sp)
            setString(sp.toString())
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