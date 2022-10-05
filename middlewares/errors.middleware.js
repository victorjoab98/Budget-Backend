//Middleware to generic errors
const errorMiddleware = (error, req, res, next) => {
    console.log("/////// SHOWING ERROR HERE: ");
    console.log( error );

    if(error.show === true ){
      res.status(error.codeStatus).json({
        title: error.name,
        statusCode: error.codeStatus,
        message: error.message
      })
    }else{
      res.status(500).json({
        statusCode: 500,
        message: 'Error interno del servidor.' 
      })
    }
}


module.exports = { errorMiddleware }