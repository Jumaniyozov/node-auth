import {Schema, model, Document} from "mongoose";
import {hash} from "bcryptjs";
import {BCRYPT_WORK_FACTOR} from "../config";

interface UserDocument extends Document {
    email: String,
    name: String,
    password: String
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

export const User = model('User', userSchema);
