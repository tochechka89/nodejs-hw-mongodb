import createHttpError from "http-errors";

export const errorHandler = (err, req, res, next) => {
    
    if (err instanceof createHttpError.HttpError) {
        res.status(err.status).json({
            status: err.status,
            message: err.message,
            data: err.data || null, 
        });
    } else {
       
        res.status(500).json({
            status: 500,
            message: "Something went wrong",
            data: null,
        });
    }
};

export default errorHandler;