import {Router} from 'express';
import {User} from "../models";
import {catchAsync} from "../middleware/errors";
import {auth} from "../middleware";

const router = Router();

router.get('/home', auth, catchAsync(async (req, res) => {
    // @ts-ignore
    const user = await User.findById(req.session.userId)
    // @ts-ignore
    res.json(user);
}))


export default router;
