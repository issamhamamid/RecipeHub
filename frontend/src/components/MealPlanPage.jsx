import { BsArrowRepeat } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import {Meal} from "./Meal.jsx";
import {PieChart} from "react-minimal-pie-chart";

export const MealPlanPage = () => {
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
            <Meal/>
            <Meal/>
            <Meal/>
            </div>
            <div className='nutrition'>
                <h2 className='plan-title'>Nutrition</h2>
                <div className='planner-pie-chart'>
                    <PieChart
                        data={[
                            {title: 'Fat', value: 10, color: '#11bdcd'},
                            {title: 'Protein', value: 10, color: '#a375ff'},
                            {title: 'Carbs', value: 10, color: '#f1b604'},
                        ]}
                        animate={true}
                        label={({dataEntry}) => {

                            return dataEntry.percentage > 30 ? (`${dataEntry.title}: ${dataEntry.percentage.toFixed(1)}%`) : null


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
                            <p>1000</p>
                        </div>
                        <div className='info-row'>
                            <p className='nut-info'><span className="dot purple"></span> Protein</p>
                            <p>10g</p>
                        </div>
                        <div className='info-row'>
                            <p className='nut-info'><span className="dot yellow"></span> Carbs</p>
                            <p> 10g</p>
                        </div>
                        <div className='info-row'>
                            <p className='nut-info'><span className="dot blue"></span> Fats</p>
                            <p>10g</p>
                        </div>

                    </div>


                    <div className='desired'>

                        <p>2064</p>
                        <p>200g</p>
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