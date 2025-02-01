import { BsArrowRepeat } from "react-icons/bs";
import {Meal} from "./Meal.jsx";
import {PieChart} from "react-minimal-pie-chart";
import { MdOutlineDelete } from "react-icons/md";
import clearPlan from "../Util/clearPlan.js";
import {useUser} from "../customHooks/useUser.js";
import {useRef, useState} from "react";
import {Modal} from "./Modal.jsx";
import {ModalTitle} from "./ModalTitle.jsx";
import {ModalMainText} from "./ModalMainText.jsx";



export const MealPlanPage = ({mealPlan , ref , update ,setUpdate}) => {
    const {jwt} = useUser()
    const clearRef = useRef(null)
    const [isPending, setIsPending] = useState(false);

    const meals = mealPlan.recipes.reduce((result, _, index, array) => {
        if (index % 2 === 0) { // Check if the index is even
            const pair = array.slice(index, index + 2); // Get the pair of recipes
            const total_calories = pair.reduce((sum, recipe) => sum + recipe.calories, 0); // Calculate total calories
            const total_fat = pair.reduce((sum, recipe) => sum + recipe.fat, 0); // Calculate total fat
            const total_carbs = pair.reduce((sum, recipe) => sum + recipe.carbs, 0); // Calculate total carbs


            result.push({
                recipes: pair,
                total_calories,
                total_fat,
                total_carbs
            }); // Push the pair and the totals into the result
        }
        return result;
    }, []);



    const clearDay =async  ()=>{
        setIsPending(true)
        await clearPlan(jwt)
        setUpdate(!update)
        setIsPending(false)
    }


    return (
        <div className='meal-plan-page'>
            
            <div className='meals'>
            <div className='plan-infos'>
                <h2 className='plan-title'>Meals</h2>
                <p className='plan-calories'>{mealPlan.total_calories} Calories</p>
                <div onClick={()=>{ref.current.showModal()}} className='interaction-btn plan-generate-icon tool-tip' data-tooltip = 'Regenerate Day'>

                    <BsArrowRepeat/>
                </div>
                <div onClick={()=>{clearRef.current.showModal()}} className='interaction-btn dots-icon tool-tip ' data-tooltip = 'Clear Day'>

                    <MdOutlineDelete/>
                </div>

            </div>
                {meals.map((meal , index)=>{
                        return <Meal meal_num = {index} key = {meal.total_calories}  meal={meal} />
                })}

            </div>
            <div className='nutrition'>
                <h2 className='plan-title'>Nutrition</h2>
                <div className='planner-pie-chart'>
                    <PieChart
                        data={[
                            {title: 'Protein', value:mealPlan.total_protein, color: '#a375ff'},
                            {title: 'Carbs', value: mealPlan.total_carbs, color: '#f1b604'},
                            {title: 'Fat', value: mealPlan.total_fat, color: '#11bdcd'},
                        ]}
                        animate={true}
                        label={({dataEntry}) => {

                            return dataEntry.percentage > 28 ? (`${dataEntry.title}: ${dataEntry.percentage.toFixed(1)}%`) : null


                        }}
                        labelStyle={{
                            fill: 'white',
                            fontSize: '6px',
                            textAnchor: 'middle',
                            fontWeight: '600'
                        }}
                    />

                </div>


                <div className='info-row'>

                    <p className='totals'>Totals</p>
                    <p className='target'>Target</p>
                </div>
                <div className='nutrition-info'>

                    <div className='actual'>

                        <div className='info-row'>
                            <p className='nut-info'>Calories</p>
                            <p>{mealPlan.total_calories}</p>
                        </div>
                        <div className='info-row'>
                            <p className='nut-info'><span className="dot purple"></span> Protein</p>
                            <p>{mealPlan.total_protein}g</p>
                        </div>
                        <div className='info-row'>
                            <p className='nut-info'><span className="dot yellow"></span> Carbs</p>
                            <p>{mealPlan.total_carbs}g</p>
                        </div>
                        <div className='info-row'>
                            <p className='nut-info'><span className="dot blue"></span> Fats</p>
                            <p>{mealPlan.total_fat}g</p>
                        </div>

                    </div>


                    <div className='desired'>

                        <p>{mealPlan.desired_calories}g</p>
                        <p className='protein-des'>{mealPlan.desired_protein}g</p>
                    </div>

                </div>

            </div>
            <div className='bascketball'>
                <img className='bascketball-img'
                     src='https://www.eatthismuch.com/app/_app/immutable/assets/orange-sport.4f_Ytl6c.webp'
                     alt='carrot'/>
            </div>

            <Modal isPending={isPending} onConfirm={clearDay} dialogRef={clearRef} confirmationText='Clear' showButtons={true} className='modal with-keyframes'>
                <ModalTitle>Clear Today&#39;s Meal Plan?</ModalTitle>
                <ModalMainText>This will permanently remove this plan. However, you can always create a new one later if you'd like.</ModalMainText>
            </Modal>
        </div>
    )
}