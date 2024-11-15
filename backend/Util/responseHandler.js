module.exports = (req , res , status , data)=>{
    res.status(status).json({
        "status":status.toString().startsWith("2")  ? "success" : "failed",
        "data" : data
    });
}