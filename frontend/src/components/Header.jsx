import { RxHamburgerMenu } from "react-icons/rx";
import {useState, useEffect} from "react";
import { IoMdClose } from "react-icons/io";

const Header =()=>{

    const [imageSrc, setImageSrc] = useState('/src/assets/logo-small.PNG');
    const [menu, setMenu] = useState(false)

    const [height_class, setHeight_class] = useState("normal")

    const updateImageSrc = () => {

        if (window.innerWidth >= 1050) {
            setImageSrc('/src/assets/logo.PNG');
            setMenu(false)
            setHeight_class("normal")
        }else {
            setImageSrc('/src/assets/logo-small.PNG');
        }
    };


    const toggleMenu = ()=>{
        setMenu(!menu)

        setHeight_class(height_class === "normal" ? "full" : "normal")
    }

    useEffect(() => {

        updateImageSrc(); // Initial check
        window.addEventListener('resize', updateImageSrc);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', updateImageSrc);
        };
    }, []);



    return(
        <header className= {"offline-header" +" " + height_class}>
            <div className="container-flex container">
                <img className='logo' src={imageSrc} alt="logo"/>
                <a href="#" className="header-links"> How it Works</a>
                <a href="#" className="header-links"> Browse Recipes</a>
                <a href="#" className="header-links"> Supported Diets</a>

                <div className="sign-up-section">
                    <button className="btn signup-btn">Sign Up</button>
                    <a href="#" className="header-links sign-in"> Already a member? Sign in</a>
                </div>
                <a
                    className="hamburger-menu"
                    onClick={toggleMenu}
                    aria-label="Open menu"
                >
                    {!menu ? <RxHamburgerMenu/> : <IoMdClose  />}
                </a>

            </div>

            {menu  && (
                <>
                    <a href="#" className="header-links-menu mt">How it Works</a>
                    <a href="#" className="header-links-menu">Browse Recipes</a>
                    <a href="#" className="header-links-menu">Supported Diets</a>
                    <div className="sign-up-section sign-up-section-menu">
                        <button className="btn signup-btn-menu" >Sign Up</button>

                        <a href="#" className="sign-in">Already a member? Sign in</a>
                    </div>
                </>
            )}


        </header>
    )
}

export default Header