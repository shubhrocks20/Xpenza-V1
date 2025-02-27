import { NextFunction , Response, Request} from "express";
import { HttpError } from "http-errors";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500
    let error : {message : string, stack: string} = {message: '', stack: ''}

    if(err.statusCode) statusCode = err.statusCode
    if(err.message) error.message = err.message
    if(err.stack) error.stack = err.stack
    return res.status(statusCode).json({success: 'fail', error: error})
}