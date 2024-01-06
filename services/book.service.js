import {BookModel} from "../models/book.model.js";
import dotEnv from "dotenv";
import {UserModel} from "../models/user.model.js";
import {Types} from "mongoose";
dotEnv.config()

export default class BookService{
    async getAll(skip, limit, keyword) {
        try {
            let query = {};
            if (keyword) {
                const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                query = {
                    $or: [
                        { category: { $regex: new RegExp(escapedKeyword, 'i') } },
                        { name: { $regex: new RegExp(escapedKeyword, 'i') } }
                    ]
                };
            }
            const totalBooks = await BookModel.countDocuments(query);
            const totalPages = Math.ceil(totalBooks / limit);
            const books = await BookModel.find(query).skip(skip).limit(parseInt(limit)).exec();
            return { books, totalPages };
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async checkBook(userId, bookId){
        try {
            const book = await BookModel.findById(bookId)
            if(book.loan_time === 0) return true
            const currentTimestamp = Date.now();
            if(book.loan_time - currentTimestamp > 0){
                return false
            }
            book.loan_time = 0;
            book.availability = true
            await book.save()
            return true
        }catch (e) {
            throw new Error(e.message);
        }
    }
    async loanBook(userId, bookId, time){
        try {
            const currentTimestamp = Date.now();
            const loanPeriodMs = time * 60 * 1000;
            const resultTime = currentTimestamp + loanPeriodMs;
            await BookModel.findByIdAndUpdate(bookId, { loan_time: resultTime, availability: false })
            const updatedBook = await BookModel.findById(bookId)
            const user = await UserModel.findById(userId)
            const existingBookIndex = user.books.findIndex((b) => b._id.toString() === bookId);
            if (existingBookIndex !== -1) {
                return 'You already loan this book!'
            } else {
                user.books.push(updatedBook);
            }
            await user.save();
            return updatedBook
        }catch (e){
            throw new Error(e.message);
        }
    }
    async getLoans(id){
        try {
            const user = await UserModel.findById(id)
            const removedBookIds = []
            user.books = user.books.filter(elem => {
                if((elem.loan_time - Date.now() > 0)){
                    return true
                }
                removedBookIds.push(elem._id)
                return false
            })
            for (const removedBookId of removedBookIds) {
                const book = await BookModel.findById(removedBookId)
                if (book) {
                    book.availability = true;
                    book.loan_time = 0;
                    await book.save();
                }
            }
            await user.save()
            return user.books
        }catch (e) {
            throw new Error(e.message)
        }
    }

    async returnBook(userId, bookId){
        try {
            const user = await UserModel.findById(userId)
            user.books = user.books.filter(elem => elem._id.toString() !== bookId)
            await BookModel.findByIdAndUpdate(bookId, {loan_time: 0, availability: true})
            await user.save()
            return user.books
        }catch (e){
            throw new Error(e.message)
        }
    }

    async deleteBook(bookId, userId){
        try {
            const user = await UserModel.findById(userId)
            if(user.role !== 'admin'){
                console.log('Not admin')
                throw new Error('Permission Denied!')
            }
            const bookObjectId = Types.ObjectId(bookId);
            const userWithBook = await UserModel.findOne({ books: { $in: [bookObjectId] } }).populate('books');
            console.log(userWithBook, "MY USER")
            // const usersWithBook = await UserModel.find({
            //     books: { $in: [bookId] }
            // });
            //
            // if (usersWithBook) {
            //     console.log('User found:', usersWithBook);
            // } else {
            //     console.log('No user found with the specified book ID.');
            // }
            // const deleted = await BookModel.findByIdAndDelete(bookId)
            // if(deleted){
            //
            // }
            // const usersWithBook = await UserModel.find({ books: bookId });
            // const updatePromises = usersWithBook.map(async (user) => {
            //     user.books = user.books.filter((book) => book.toString() !== bookId);
            //     await user.save();
            // });
            // await Promise.all(updatePromises);
            return 'deleted'
        }catch (e){
            console.log(e.message)
            throw new Error(e.message)
        }
    }
}