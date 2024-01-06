import {model, Schema} from "mongoose";
import {BookSchema} from "./book.model.js";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    books: [BookSchema]
});

export const UserModel = model('User', UserSchema)



