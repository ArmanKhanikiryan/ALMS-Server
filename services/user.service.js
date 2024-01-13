import jwt from "jsonwebtoken";
import {UserModel} from "../models/user.model.js";
import dotEnv from "dotenv";
import {genSalt, hash, compare} from "bcrypt";
dotEnv.config()

export default class UserService {
    async changePassword({userId, oldValue, newValue}){
        try {
            const user = await UserModel.findById(userId)
            const match = await compare(oldValue, user.password);
            if(match){
                const salt = await genSalt(10);
                user.password = await hash(newValue, salt);
                await user.save()
                return user
            }
            throw new Error('Invalid Password')
        }catch (e) {
            throw new Error(e.message)
        }
    }
}
