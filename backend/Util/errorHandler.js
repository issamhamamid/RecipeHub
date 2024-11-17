
const dev_error = ( res , err)=>{
    res.status(err.statusCode).json({
        "status" : err.status,
        "message" : err.message,
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

module.exports.errorHandler = (err , req , res, next )=>{
    err.statusCode = err.statusCode || 500;
    err.status =err.status || 'error'
    if (process.env.NODE_ENV === 'development'){
        dev_error(res , err)
    }

    else {
        prod_err(res , err)
    }
}