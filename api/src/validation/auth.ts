import Joi from '@hapi/joi';
import {BCRYPT_MAX_BYTES} from "../config";

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(128).trim().required(),
    email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
    password: Joi.string().min(8).max(BCRYPT_MAX_BYTES, 'utf8').required(), //TODO max
    passwordConfirmation: Joi.valid(Joi.ref('password')).required(),
})

export {registerSchema};
