import {RecipeRow} from "./RecipeRow.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {Pagination} from "./Pagination.jsx";
import {useSearchParams} from "react-router-dom";
import {DiscoverHeader} from "./DiscoverHeader.jsx";


export const Discover = () => {

    const [recipesArray, setRecipesArray] = useState([]);
    const [params] = useSearchParams()
    const page = params.get('page') || 1
    const [count, setCount] = useState(null);



    useEffect(() => {

        const link = params.size > 0 ? `http://localhost:3000/recipes?${params.toString()}` :
            `http://localhost:3000/recipes?page=1`
        axios.get(link)
                .then(response =>{
                    setRecipesArray(response.data.data.rows)
                    setCount(response.data.data.count)
                })


    }, [params]);

    const recipes = recipesArray.map((recipe)=>{
        return <RecipeRow key={recipe.id} {...recipe} />;
    })

    return (
        <div>
        <DiscoverHeader/>
        <div className='discover'>
            <div className='header'>

                <div className='header-main'>
                    <p className='header-element'>Calories</p>
                    <p className='header-element none '>Carbs</p>
                    <p className='header-element none'>Fat</p>
                    <p className='header-element none'>Protein</p>
                </div>
            </div>

            {recipes}


            <Pagination page={page} count={Math.ceil(count/17)}/>


        </div>
        </div>
    )
}