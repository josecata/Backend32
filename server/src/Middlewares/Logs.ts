import { logger } from '../server/logs'
import { NextFunction, Request, Response } from 'express'

export const logRoute = (req: Request, res: Response, next: NextFunction) => {
	const { originalUrl, method } = req
	logger.info(`Route: ${originalUrl}, Method: ${method}`)
	next()
}


export const logInvalid = (req: Request, res: Response, next: NextFunction)=>{
    const {originalUrl, method} = req
    logger.warn(`Route: ${originalUrl}, method: ${method}. Rute don't exist`)
    next()
}