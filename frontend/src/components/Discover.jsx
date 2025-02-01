import {RecipeRow} from "./RecipeRow.jsx";
import axios from "axios";
import {Pagination} from "./Pagination.jsx";
import {useSearchParams} from "react-router-dom";
import {DiscoverHeader} from "./DiscoverHeader.jsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Loading} from "./Loading.jsx";



export const Discover = () => {

    const [params , setParams] = useSearchParams()
    const page = params.get('page') || 1
    const [string, setString] = useState(params.toString());


    const getRecipes = async (string)=>{
        const link = string.length > 0 ? `http://localhost:3000/recipes?${string}` :
            `http://localhost:3000/recipes?page=1`
        return axios.get(link)


    }



    const recipesQuery = useQuery({
        queryKey : ["recipes" , string],
        queryFn : ()=>getRecipes(string).then(response=>{return {recipes : response.data.data.rows , count : response.data.data.count}})
        ,
        placeholderData: keepPreviousData

    })



    const recipes = recipesQuery?.data?.recipes.map((recipe)=>{

        return <RecipeRow key={recipe.id} {...recipe} />;
    })


    return (
        <div>
        <DiscoverHeader setString = {setString}/>
            { recipesQuery.status === "pending" ? <Loading/> : <div className='discover'>
                <div className='header'>

                    <div className='header-main'>
                        <p className='header-element'>Calories</p>
                        <p className='header-element none '>Carbs</p>
                        <p className='header-element none'>Fat</p>
                        <p className='header-element none'>Protein</p>
                    </div>
                </div>

                {recipes}


                <Pagination setString={setString} params={params} setParams={setParams} page={page}
                            count={Math.ceil(recipesQuery.data.count / 17)}/>


            </div>}
        </div>
    )
}