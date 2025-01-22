import {Link, useSearchParams} from "react-router-dom";

export const RecipeRow = ({id ,name , image_url , calories , carbs , fat , protein}) => {
    const [params] = useSearchParams()



    return (
        <div className='recipe'>
            <Link className='recipe-link' to={`${id}`} state={{from : params.toString()}}>
                <div className='recipe-main'>
                    <img className='recipe-thumbnail'
                         src={image_url}
                         alt='recipe image'/>
                    <a className='recipe-title'>{name}</a>

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