import {BookModel} from "../models/book.model.js";
import dotEnv from "dotenv";
dotEnv.config()

export default class BookService{
    async getAll(skip, limit) {
        try {
            const totalBooks = await BookModel.countDocuments();
            const totalPages = Math.ceil(totalBooks / limit);
            const books = await BookModel.find().skip(skip).limit(parseInt(limit)).exec();
            return { books,totalPages };
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
