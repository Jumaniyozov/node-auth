import {Router, Request, Response} from 'express';
import {validate, loginSchema} from "../validation";
import {catchAsync} from "../middleware/errors";
import {User} from "../models";
import {Unauthorized} from "../errors";
import {logIn, logOut} from "../auth";
import {auth, guest} from "../middleware";

const router = Router();

router.post('/logout', auth,catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    await logOut(req, res);

    res.json({message: 'OK'});
}))

router.post('/login', guest,catchAsync(async (req: Request, res: Response) => {
    await validate(loginSchema, req.body);

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user || await !user.matchesPassword(password)){
        throw new Unauthorized('Incorrect email or password');
    }

    logIn(req, user.id)

    res.json({message: 'OK'});
}))

export default router;
