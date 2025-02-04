import {Link} from "react-router-dom";
import { FiClock } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

export const RecipeGrid = ({id ,name , image_url , calories , cook_time , prep_time}) => {
    const totalTime = parseInt(cook_time) + parseInt(prep_time)

    return (
        <Link className='grid-recipe-link' to={`/app/recipes/${id}`} state={{params : '' , from : 'app/favorites'}}>
            <div  className='recipe-grid-item'>
                <img className='grid-img'
                     src={image_url}
                     alt='recipe-img'/>
                <a className='grid-link grid-item' to={`/recipes/${id}`}>{name}</a>
                <div className='grid-time grid-item'>
                    <  AiOutlineFire className='fire'/>
                    <p className=' grid-calories'>{calories} Calories</p>

                </div>
                <div className=' mb grid-time grid-item'>
                    <  FiClock className='clock'/>
                    <p>{totalTime} minutes</p>
                </div>
            </div>
        </Link>
    )
}