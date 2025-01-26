const User = require('../models/User')
const MealPlan = require('../models/MealPlan')
const Recipe = require('../models/Recipe')
const MealPlanRecipe = require('../models/MealPlanRecipe')
const responseHandler = require('../Util/responseHandler')
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");
const {syncHandler} = require("../Util/syncHandler");
const axios = require('axios');
const getTodaysMealPlan = require("../Util/getMealPlaRecipes");



module.exports.GetAllUsers = async (req , res) => {
 const allUsers = await User.findAll()
 responseHandler(req , res , 200 , allUsers);
}


module.exports.getUserById = asyncHandler(async (req , res , next) => {
 const id = Number(req.params.id);
 const user = await User.findByPk(id)
 if(user){
  responseHandler(req , res , 200 , user);
 }
 else {
  throw new customError(404 , "NOT FOUND")

 }
})


module.exports.updateUser = asyncHandler(async (req, res , next) => {


 const { username, email } = req.body;

 const updatedUser = await User.update(
     { username, email },
     {
      where: {
       username : req.user.username
      },

     }
 );


 responseHandler(req , res , 200 , "");
});


module.exports.userProfile =  (req , res) =>{

 const userinfo = {
  username : req.user.username,
  email : req.user.email
 }
 responseHandler(req , res , 200 , {
   userinfo
 })
}


module.exports.saveMealPlan = asyncHandler(async (req , res , next)=>{

 const mealplan = await MealPlan.create({
  name : req.body.name ,
  user_id : req.user.id,
  total_calories : req.body.total_calories,
  total_protein : req.body.total_protein,
  total_carbs: req.body.total_carbs,
  total_fat: req.body.total_fat,
  desired_calories : req.body.desired_calories,
  desired_protein : req.body.desired_protein,

 })

 for (const recipeId of req.body.recipes) {
   await MealPlanRecipe.create({
    meal_type : "Breakfast" ,
    RecipeId : recipeId ,
    MealPlanId : mealplan.id
   })
 }

 responseHandler(req , res , 201 , "")

})


module.exports.showMealPlans = asyncHandler(async (req, res, next) => {
 const mealPlans = await req.user.getMealPlans();  // Get meal plans associated with the user
 const data = await getTodaysMealPlan(mealPlans)

 // Send the response with the data
 return responseHandler(req, res, 200, data);
});


module.exports.getTodaysMealPlan = asyncHandler(async (req , res , next)=>{
 const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

 const mealPlan = await req.user.getMealPlans({
  where: {
   date: today, // Filter by today's date
  },
 });

 const data = await getTodaysMealPlan(mealPlan)
 return responseHandler(req, res, 200, data);

})

module.exports.removeMealPlan = asyncHandler(async (req , res ,next)=>{
 const mealplan = await MealPlan.findOne({
  name : req.body.name
 })
 await mealplan.destroy()
 responseHandler(req , res , 200 , "")
})


module.exports.generateMealPlan = asyncHandler(async (req , res ,next)=>{
 try{
  const response = await axios.post('http://localhost:5000', req.body);
  responseHandler(req , res , 200 , response.data)
 }
 catch (err){
  responseHandler(req , res , 400 ,err.response.data)
 }


})

