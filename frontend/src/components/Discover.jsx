import {RecipeRow} from "./RecipeRow.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


export const Discover = () => {

    const [recipesArray, setRecipesArray] = useState([]);

    useEffect(() => {

            axios.get('http://localhost:3000/recipes?page=2')
                .then(response =>{
                    setRecipesArray(response.data.data)

                })


    }, []);

    const recipes = recipesArray.map((recipe)=>{
        return <RecipeRow key={recipe.id} {...recipe} />;
    })

    return (
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


        </div>
    )
}