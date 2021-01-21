import {Request} from "express";

export const logIn = (req: Request, userId: string) => {
    // @ts-ignore
    req.session!.userId = userId;
}

// @ts-ignore
export const isLoggedIn = (req: Request) => !!req.session.userId;
