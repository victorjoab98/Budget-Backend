const validatorMiddleware = (validator, property) => {
    return (req, res, next) => {
        const data = req[property];
        const {error} = validator.validate( data, { abortEarly: false });
        if( error ){
            const { details } = error;
            return res.status(400).json({
                statusCode: 400,
                error: "Bad Request",
                message:getErrorMessages(details) 
            })
        }
        next();
    }
}

const getErrorMessages = ( details)=>{
    const message = details.map( ({ message }) => message).join(',');
    return message;
}

module.exports = validatorMiddleware;