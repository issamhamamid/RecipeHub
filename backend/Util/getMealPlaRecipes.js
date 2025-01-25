const MealPlanRecipe = require("../models/MealPlanRecipe");

const getTodaysMealPlan = async (mealPlans) =>{
    const data = {};
    data['mealplans'] = []
    if(!mealPlans){
        return {}
    }

    // Use Promise.all to fetch all recipes concurrently
    const recipePromises = mealPlans.map(async (mealPlan) => {



            data['mealplans'].push({'name' : mealPlan.name , 'recipes' : await mealPlan.getMealPlanRecipes({
                    through: {
                        model: MealPlanRecipe, // Specify the junction model (MealPlanRecipe)
                        attributes: []         // Do not include any attributes from the junction table
                    }
                }) , date : mealPlan.date , total_protein : mealPlan.total_protein , total_calories : mealPlan.total_calories , total_carbs : mealPlan.total_carbs})


    });

    // Wait for all promises to resolve
    await Promise.all(recipePromises);

    return data
}


module.exports = getTodaysMealPlan;