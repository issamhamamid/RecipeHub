
import {useScroll} from "../customHooks/useScroll.js";
import { BsArrowRepeat } from "react-icons/bs";
import {MealPlanPage} from "./MealPlanPage.jsx";
import {useState} from "react";


export const MealPlanner = () => {

    const [temp, setTemp] = useState(false);

    const isScrolled = useScroll(3)
    return (
        <>
            <header className={isScrolled ? 'discover-header-scroll' : 'discover-header'}>
                <div className='discover-header-content'>
                    <h2 className='planner-title'>Meal Planner</h2>
                </div>
            </header>
            <div className='discover'>

                {temp ?  <MealPlanPage/> : <div className='meal-planner-main'>

                    <img className='meal-planner-img'
                         src='https://www.eatthismuch.com/app/_app/immutable/assets/orange-painting.BDLMeH1h.png'
                         alt='orange'/>
                    <h2 className='meal-planner-slogan'>What are we eating today?</h2>
                    <div className='meal-planner-btn'>
                        <button onClick={() => {
                            setTemp(!temp)
                        }} className='generate-btn'><BsArrowRepeat className='generate-icon'/> Generate
                        </button>
                        <button className='manually filter'>Plan Manually</button>
                    </div>

                </div>}


            </div>


        </>
    )
}