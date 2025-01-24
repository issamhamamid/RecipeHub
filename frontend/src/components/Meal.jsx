import {BsThreeDotsVertical} from "react-icons/bs";

export const Meal = () => {
    return (
        <div className='meal'>
            <div className='meal-header'>
                <h2 className='meal-title'>Breakfast</h2>
                <div className='interaction-btn dots-icon dark-hover'>

                    <BsThreeDotsVertical/>
                </div>

            </div>
            <p className='meal-calories'>2069 calories</p>
            <div className='meal-recipe'>
                <img className='meal-recipe-img'
                     src='https://images.eatthismuch.com/img/3262870_elm333_6cbadbd4-4043-4712-9140-21059fea363c.jpg'
                     alt='rcipe-img'
                />
                <div className='meal-info'>
                    <a className='meal-recipe-title'>
                        Ham and Egg Scramble
                    </a>
                    <p className='serving'>1 serving</p>

                </div>


            </div>
            <div className='meal-recipe'>
                <img className='meal-recipe-img'
                     src='https://images.eatthismuch.com/img/906440_elm333_4a08d66b-b82b-43d7-944d-0bd176e53b01.jpg'
                     alt='rcipe-img'
                />
                <div className='meal-info'>
                    <a className='meal-recipe-title'>
                        Ham and Egg Scramble
                    </a>
                    <p className='serving'>1 serving</p>

                </div>


            </div>
        </div>
    )
}