const express = require('express');
const userController = require('../Controllers/userController');
const passport = require('passport');
const userRouter = express.Router();
const authController = require('../Controllers/authController')

userRouter.route('/')
.get( passport.authenticate('jwt', { session: false }) , authController.forAdmins ,  userController.GetAllUsers)



userRouter.route('/profile')
    .get( passport.authenticate('jwt', { session: false }) , userController.userProfile )
    .patch(passport.authenticate('jwt', { session: false }) , userController.updateUser)



userRouter.route('/mealplan')
    .post(passport.authenticate('jwt', { session: false }) , userController.saveMealPlan)
    .get(passport.authenticate('jwt', { session: false }) , userController.showMealPlans)
    .delete(passport.authenticate('jwt', { session: false }) , userController.removeMealPlan)

userRouter.route('/generate_meal_plan')
    .post(passport.authenticate('jwt', { session: false }) , userController.generateMealPlan)

module.exports = userRouter;