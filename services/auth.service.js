import {UserModel} from "../models/user.model.js";
import {genSalt, hash, compare} from "bcrypt";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
dotEnv.config()

export default class AuthService {
    async login({email, password}){
        try {
            const user = await UserModel.findOne({
                email
            })
            const isValid = await compare(password, user.password)
            if(!isValid){
                throw new Error('Invalid username or password')
            }
            const token = jwt.sign({user}, process.env.SECRET_JWT, {expiresIn: '1d'})
            return {user, token}
        }catch (e){
            throw new Error(e.message)
        }
    }
    async register({name, role,email,password}){
        try {
            const token = jwt.sign({name, role,email,password}, process.env.SECRET_JWT, {expiresIn: '1d'})
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            const newUser = await UserModel.create({
                name,
                role,
                email,
                password: hashedPassword
            })
            const user = newUser._doc
            return {user, token}
        }catch (e) {
            throw new Error(e)
        }
    }
}
