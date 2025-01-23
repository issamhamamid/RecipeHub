module.exports.idAsyncHandler =  (func) =>{
    return (req , res,  next , value ) => {
        func(req , res , next , value).catch(err => {next(err)})
    }
}