import {BsThreeDotsVertical} from "react-icons/bs";
import {Link} from "react-router-dom";

export const Meal = ({meal}) => {
    return (
        <div className='meal'>
            <div className='meal-header'>
                <h2 className='meal-title'>Breakfast</h2>
                <div className='interaction-btn dots-icon dark-hover'>

                    <BsThreeDotsVertical/>
                </div>

            </div>
            <p className='meal-calories'>{meal.total_calories} Calories</p>
            {meal.recipes.map((recipe)=>{
                return (
                    <Link className='meal-recipe-link' state={{from : 'app'}} key={recipe.id} to={`recipes/${recipe.id}`}>
                        <div  className='meal-recipe'>
                            <img className='meal-recipe-img'
                                 src={recipe.image_url}
                                 alt='rcipe-img'
                            />
                            <div className='meal-info'>
                                <a className='meal-recipe-title'>
                                    {recipe.name}
                                </a>
                                <p className='serving'>1 serving</p>

                            </div>


                        </div>
                    </Link>
                )
            })}

        </div>
    )
}