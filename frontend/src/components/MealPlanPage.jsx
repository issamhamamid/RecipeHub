import { BsArrowRepeat } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import {Meal} from "./Meal.jsx";

export const MealPlanPage = () => {
    return (
        <div className='meal-plan-page'>
            <div className='plan-infos'>
                <h2 className='plan-title'>Meals</h2>
                <p className='plan-calories'>2069 calories</p>
                <div className='interaction-btn plan-generate-icon'>

                    <BsArrowRepeat/>
                </div>
                <div className='interaction-btn dots-icon'>

                    <BsThreeDotsVertical/>
                </div>

            </div>
            <Meal/>
            <Meal/>
            <Meal/>
            <h2 className='plan-title'>Nutrition</h2>


        </div>
    )
}