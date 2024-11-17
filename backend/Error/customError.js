class customError extends Error{
    constructor(statusCode , message ) {
        super(message);
        this.statusCode =statusCode;
        this.Isoperational = true
        this.status = statusCode >= 500 ? 'error' : 'fail';
        Error.captureStackTrace(this , this.constructor)
    }
}


module.exports= customError;