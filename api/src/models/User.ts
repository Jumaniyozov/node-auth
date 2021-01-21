import {Schema, model, Document} from "mongoose";
import {compare, hash} from "bcryptjs";
import {BCRYPT_WORK_FACTOR} from "../config";

interface UserDocument extends Document {
    email: String,
    name: String,
    password: String,
    matchesPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: String,
    name: String,
    password: String
}, {
    timestamps: true
})

userSchema.pre<UserDocument>('save', async function () {
    if (this.isModified('password')) {
        // @ts-ignore
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
    }
})

userSchema.methods.matchesPassword = function (password: string) {
    // @ts-ignore
    return compare(password, this.password);
}

userSchema.set('toJSON', {
    // @ts-ignore
    transform: (doc, {__v, password, ...rest}, options) => rest
})

export const User = model('User', userSchema);
