import {Link, useSearchParams} from "react-router-dom";

export const RecipeRow = ({id ,name , image_url , calories , carbs , fat , protein}) => {
    const [params] = useSearchParams()



    return (
        <div className='recipe'>
            <Link className='recipe-link' to={`${id}`} state={{params : params.toString() , from : 'app/recipes'}}>
                <div className='recipe-main'>
                    <img className='recipe-thumbnail'
                         src={image_url}
                         alt='recipe image'/>
                    <p className='recipe-title'>{name}</p>

                </div>
            </Link>
            <div className='recipe-nutrients'>
                <div className='nutrient'>
                    <p> {calories + ' Calories'} </p>
                </div>
                <div className='nutrient none'>
                    <p>{carbs + 'g'}<span className="dot yellow"></span></p>
                </div>
                <div className='nutrient none'>
                    <p>{fat +'g'} <span className="dot blue"></span></p>
                </div>
                <div className='nutrient none'>
                    <p>{protein+'g'} <span className="dot purple"></span></p>
                </div>
            </div>
        </div>
    )
}