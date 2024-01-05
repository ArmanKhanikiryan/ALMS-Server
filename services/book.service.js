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

    async checkBook(id){
        try {
            const book = await BookModel.findById(id)
            if(book.loan_time === 0) return true

            const currentTimestamp = Date.now();
            if(book.loan_time - currentTimestamp > 0){
                return false
            }
            await BookModel.findByIdAndUpdate(id, { loan_time: 0, availability: true })
            return true
        }catch (e) {
            throw new Error(e.message);
        }
    }
    async loanBook(id, time){
        try {
            const currentTimestamp = Date.now();
            const loanPeriodMs = time * 60 * 1000;
            const resultTime = currentTimestamp + loanPeriodMs;
            const a = await BookModel.findByIdAndUpdate(id, { loan_time: resultTime, availability: false })
            const b = await BookModel.findById(id)
            console.log(b)
            return a
        }catch (e){
            throw new Error(e.message);
        }
    }
}