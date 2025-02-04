import {useScroll} from "../customHooks/useScroll.js";
import {RecipeGrid} from "./RecipeGrid.jsx";
import {useUser} from "../customHooks/useUser.js";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Loading} from "./Loading.jsx";


export const Favorites = () => {

    const isScrolled = useScroll(3)
    const {jwt} = useUser()

    const getFavRecipes = async ()=>{
        return axios.get('http://localhost:3000/favorites' , {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        })

    }
    const {data , isLoading} = useQuery({
        queryKey : ["favRecipes"],
        queryFn : ()=>getFavRecipes().then(response=>{return response.data.data})


    })


    if(isLoading) return  <Loading/>
    return (
        <>
            <header className={isScrolled ? 'discover-header-scroll' : 'discover-header'}>
                <div className='discover-header-content'>
                    <h2 className='planner-title'>Favorites</h2>
                </div>
            </header>

            <div className='discover favorites'>

                {data.map((recipe)=>{
                    return <RecipeGrid key = {recipe.id} {...recipe}/>
                })}


            </div>
        </>
    )
}