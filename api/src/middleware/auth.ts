import {Express, NextFunction, Request, Response} from "express";
import {isLoggedIn, logOut} from '../auth';
import {BadRequest, Unauthorized} from "../errors";
import {SESSION_ABSOLUTE_TIMEOUT} from "../config";

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if(isLoggedIn(req)){
        return next(new BadRequest('You are already logged in'));
    }

    next();
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if(!isLoggedIn(req)){
        return next(new Unauthorized('You must be logged in'))
    }

    next();
}


export const active = async (req: Request, res: Response, next: NextFunction) => {
    if(isLoggedIn(req)) {
        const now = Date.now()
        // @ts-ignore
        const {createdAt} = req.session as Express.session

        if(now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
            // @ts-ignore
            await logOut(req, res)

            return next()
        }
    }
}
