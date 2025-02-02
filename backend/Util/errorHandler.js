const customError  = require('../Error/customError')


const dev_error = ( res , err)=>{
    res.status(err.statusCode).json({
        "status" : err.status,
        "message" : err.message,
        "attribute" : err.attribute || 'no attribute',
        "error" : err

    })
}

const prod_err = (res , err)=>{
    if (err.IsOperational){
        res.status(err.statusCode).json({
            "status" : err.status,
            "message" : err.message

        })
    }
    else {
        res.status(err.statusCode).json({
            "status" : err.status,
            "message" : "internal server error"

        })
    }
}

const validation_error = (err)=>{
    return  new customError(400 , err.errors[0].message , err.errors[0].path )
}

module.exports.errorHandler = (err , req , res, next )=>{
    if(err.name === "SequelizeUniqueConstraintError"){
        err = validation_error(err)

    }
    err.statusCode = err.statusCode || 500;
    err.status =err.status || 'error'
    if (process.env.NODE_ENV === 'development'){

        dev_error(res , err)

    }


    else {
        prod_err(res , err)
    }
}