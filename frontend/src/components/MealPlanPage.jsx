import { BsArrowRepeat } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import {Meal} from "./Meal.jsx";
import {PieChart} from "react-minimal-pie-chart";

export const MealPlanPage = ({mealPlan , desired}) => {
    return (
        <div className='meal-plan-page'>
            <div className='meals'>
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
                {mealPlan.meals.map((meal)=>{
                        return <Meal key = {meal.total_calories}  meal={meal} />
                })}

            </div>
            <div className='nutrition'>
                <h2 className='plan-title'>Nutrition</h2>
                <div className='planner-pie-chart'>
                    <PieChart
                        data={[
                            {title: 'Fat', value: mealPlan.total_fat, color: '#11bdcd'},
                            {title: 'Protein', value: mealPlan.total_protein, color: '#a375ff'},
                            {title: 'Carbs', value: mealPlan.total_carbs, color: '#f1b604'},
                        ]}
                        animate={true}
                        label={({dataEntry}) => {

                            return dataEntry.percentage > 20 ? (`${dataEntry.title}: ${dataEntry.percentage.toFixed(1)}%`) : null


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

                        <p>{desired.calories}g</p>
                        <p className='protein-des'>{desired.protein}g</p>
                    </div>

                </div>

            </div>
            <div className='bascketball'>
                <img className='bascketball-img'
                     src='https://www.eatthismuch.com/app/_app/immutable/assets/orange-sport.4f_Ytl6c.webp'
                     alt='carrot'/>
            </div>


        </div>
    )
}