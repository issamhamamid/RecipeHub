import {useEffect, useState} from "react";


const useScroll = (scrollSize)=>{
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > scrollSize) {
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

    return isScrolled
}


export{useScroll}