import { RxHamburgerMenu } from "react-icons/rx";
import {useState , useEffect} from "react";

const Header =()=>{


    const [imageSrc, setImageSrc] = useState('/src/assets/logo-small.PNG');

    const updateImageSrc = () => {

        if (window.innerWidth >= 1050) {
            setImageSrc('/src/assets/logo.PNG');
        }else {
            setImageSrc('/src/assets/logo-small.PNG');
        }
    };

    useEffect(() => {
    console.log('rendered')

        updateImageSrc(); // Initial check
        window.addEventListener('resize', updateImageSrc);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', updateImageSrc);
        };
    }, []);

    return(
        <header className="offline-header">
            <div className="container container-flex">
                <img className='logo' src={imageSrc} alt="logo"/>
                <a href="#" className="header-links"> How it Works</a>
                <a href="#" className="header-links"> Browse Recipes</a>
                <a href="#" className="header-links"> Supported Diets</a>

            <div className="sign-up-section">
                <button className="btn signup-btn">Sign Up</button>
                <a href="#" className="header-links sign-in"> Already a member? Sign in</a>
            </div>
            <RxHamburgerMenu className="hamburger-menu"/>

            </div>
        </header>
    )
}

export default Header