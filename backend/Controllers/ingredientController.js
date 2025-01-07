const responseHandler = require("../Util/responseHandler");
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");
const Apifeatures = require('../Util/Apifeatures')
const Ingredient = require("../models/Ingredient");
const Recipe = require("../models/Recipe");



module.exports.getIngredintById = asyncHandler(async (req , res , next) => {
    if(Number(req.params.id)){
        const data = await Ingredient.findByPk(req.params.id)
        responseHandler(req , res , 200 ,data);
    }
    else{
        throw new customError(400 , "Please provide a valid ingredient ID")
    }

})