

export const Discover = () => {
    return (
        <div className='discover'>
            <div className='header'>

                <div className='dbeb'>
                    <p className='header-element'>Calories</p>
                    <p className='header-element'>Carbs</p>
                    <p className='header-element'>Fat</p>
                    <p className='header-element'>Protein</p>
                </div>
            </div>
            <div className='recipe'>
                <div className='recipe-main'>
                    <img className='recipe-thumbnail'
                         src='https://images.eatthismuch.com/img/36640_elm333_3445f15a-841d-4f23-9353-e269b504d115.jpg'
                         alt='recipe image'/>
                    <a className='recipe-title'>Easy Hard-Boiled Eggs</a>

                </div>
                <div className='recipe-nutrients'>
                    <p>72 Calories</p>
                    <p>4g</p>
                    <p>57g</p>
                    <p>75g</p>
                </div>
            </div>

        </div>
    )
}