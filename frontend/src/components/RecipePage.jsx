import {useScroll} from "../customHooks/useScroll.js";
import { FaRegStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { PieChart } from 'react-minimal-pie-chart';
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {IngredientRow} from "./IngredientRow.jsx";
import { IoArrowBackOutline } from "react-icons/io5";


export const RecipePage = () => {
    const isScrolled = useScroll(3)
    const params = useParams()
    const [recipe, setRecipe] = useState('');
    const [ingredients, setIngredients] = useState([])
    const location = useLocation()




    useEffect(() => {
        const recipeLink = `http://localhost:3000/recipes/food/${params.id}`
        const ingredientsLink = `http://localhost:3000/recipes/food/${params.id}/ingredients`
        axios.get(recipeLink).then(response =>{
            setRecipe(response.data.data.recipe)
        })

        axios.get(ingredientsLink).then(response =>{
            setIngredients(response.data.data)
        })
    }, []);

    const ingredientsUI = ingredients.map((ingredient)=>{
        return <IngredientRow key = {ingredient.id} {...ingredient} quantity={ingredient.RecipeIngredient.quantity}/>
    })

    return (
        <>
        <header className={isScrolled ? 'discover-header-scroll' : 'discover-header'}>
            <div className='discover-header-content'>
                <Link className={location.state?.from || location.state?.from === ''  ?  'back-link' : 'back-link invisible '} to={ location.state?.from === ''
                     ? 'http://localhost:5173/app/recipes' :  `http://localhost:5173/app/recipes?${location.state?.from}` } >

                    <IoArrowBackOutline className='back-icon'/>
                </Link>
                <h2 className='recipe-name'>{recipe.name}</h2>
            </div>
        </header>
    <div className='recipe-page discover'>

        <div className='recipe-details'>
            <div className='recipe-view'>
                <img className='recipe-img'
                     src={recipe.image_url}
                     alt='recipe image'/>
                <div className='recipe-interactions'>
                    <div className='interaction-btn'>

                        <IoMdAdd/>
                    </div>
                    <div className='interaction-btn'>
                        <FaRegStar/>
                    </div>
                    <div className='interaction-btn'>
                        <AiOutlineLike/>
                    </div>
                </div>
                <div className='nutritions-infos'>
                    <div className='pie-chart'>
                        <PieChart
                            data={[
                                {title: 'Fat', value: recipe.fat, color: '#11bdcd'},
                                {title: 'Protein', value: recipe.protein, color: '#a375ff'},
                                {title: 'Carbs', value: recipe.carbs, color: '#f1b604'},
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
                    <p className='one-serving'>For 1 serving</p>
                    <div className='info-row'>
                        <p>Calories</p>
                        <p>{recipe.calories}</p>
                    </div>
                    <div className='info-row'>
                        <p><span className="dot yellow"></span> Carbs</p>
                        <p> {recipe.carbs} g</p>
                    </div>
                    <div className='info-row'>
                        <p><span className="dot blue"></span> Fats</p>
                        <p>{recipe.fat} g</p>
                    </div>
                    <div className='info-row'>
                        <p><span className="dot purple"></span> Protein</p>
                        <p>{recipe.protein} g</p>
                    </div>


                </div>
            </div>

            <div className='recipe-cooking-details'>
                <p className='cook-prep'><strong className='strong'>Prep Time</strong> &nbsp; &nbsp; {recipe.prep_time} minutes</p>
                <p className='cook-prep second'><strong className='strong'>Cook time</strong> &nbsp; &nbsp; {recipe.cook_time} minutes
                </p>
                <h2 className='recipe-page-title'>Ingredients</h2>
                {ingredientsUI}

                <h2 className='recipe-page-title'>Directions</h2>
                {recipe.instructions}

            </div>


        </div>

    </div>
        </>
)
}