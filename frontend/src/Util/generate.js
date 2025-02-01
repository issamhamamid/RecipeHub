import axios from "axios";
import clearPlan from "./clearPlan.js";

const generate = async (prev , formData , jwt  , link , fields , setUpdate , update , dialogRef , mealPlan)=>{





    let recipe_ids = [];
    const jsonObj = {}
    const data = {}

    fields.forEach((field)=>{
        jsonObj[field] = formData.get(field)
        data[field] = formData.get(field)
    })



    try{

        if(mealPlan.mealplans.length > 0){
           await clearPlan(jwt)
        }

        const response = await axios.post(link , jsonObj , {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        } )
        if(response.status===201 || response.status ===200){
            response.data.data.meals.forEach(item => {
                item.recipes.forEach(recipe => {
                    recipe_ids.push(recipe.id);
                });
            });
        }



        const mealObj = {
            "name" : "meal",
            "total_protein" : response.data.data.total_protein,
            "total_calories" : response.data.data.total_calories,
            "total_carbs" : response.data.data.total_carbs,
            "total_fat" : response.data.data.total_fat,
            "recipes" : recipe_ids,
            "desired_protein" : data.protein ,
            "desired_calories" :data.calories

        }

        await axios.post('http://localhost:3000/users/mealplan' , mealObj , {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        } )

        setUpdate(!update)




    }
    catch (err){


        data.error = err.response?.data?.message
    }

    dialogRef.current?.close()
    return data
}

export default generate