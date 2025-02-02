class customError extends Error{
    constructor(statusCode , message , attribute=null ) {
        super(message);
        this.statusCode =statusCode;
        this.Isoperational = true
        this.attribute=attribute
        this.status = statusCode >= 500 ? 'error' : 'fail';
        Error.captureStackTrace(this , this.constructor)
    }
}


module.exports= customError;