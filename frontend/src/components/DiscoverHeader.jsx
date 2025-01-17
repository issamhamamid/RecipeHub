import { FiFilter } from "react-icons/fi";

import { RiSearchLine } from "react-icons/ri";
import {useEffect, useState} from "react";


export const DiscoverHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
                        <input placeholder="Search Recipes..." className='input-search'  />

                    </div>
                </div>
            </header>
        </>
    )
}