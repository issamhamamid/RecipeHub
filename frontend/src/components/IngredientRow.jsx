export const IngredientRow = ({name ,image_url ,  quantity}) => {
    return (
        <div className='ingredient'>
            <img className='ingredient-img'
                 src={image_url}
                 alt='ingredient image'/>
            <div className='ingredient-info'>
                <p className='ingredient-name'>{name}</p>
                <p className='ingredient-quantity'>{quantity}</p>

            </div>

        </div>
    )
}