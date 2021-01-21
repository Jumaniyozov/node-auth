import {Request} from "express";
import {SESSION_NAME} from './config';

export const logIn = (req: Request, userId: string) => {
    // @ts-ignore
    req.session!.userId = userId;
}

// @ts-ignore
export const isLoggedIn = (req: Request) => !!req.session.userId;


export const logOut = (req: Request, res: Response) => {
    return  new Promise<void>((resolve, reject) => {
        req.session!.destroy((err: Error) => {
            if(err) reject(err)

            // @ts-ignore
            res.clearCookie(SESSION_NAME)

            resolve()
        })
    })
}
