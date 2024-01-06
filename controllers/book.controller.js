import BookService from "../services/book.service.js";

export default class BookController{
    constructor() {
        this.BookService = new BookService()
    }
    async getAll(req, res){
        try {
            const { page = 1, limit = 10, keyword = 1 } = req.query;
            const skip = (page - 1) * limit;
            const bookData = await this.BookService.getAll(skip, limit, keyword)
            res.status(200).json({data: bookData})
        }catch (e){
            res.status(400).json({message: 'Error in getting books'})
        }
    }
    async checkBook(req, res){
        try {
            const bookId = req.params.id;
            const userId = req.query.user_id;
            const data = await this.BookService.checkBook(userId, bookId)
            res.status(200).json({bookAvailability: data})
        }catch (e) {
            res.status(400).json({message: 'Error in checking book availability'})
        }
    }
    async loanBook(req, res){
        try {
            const { userId, bookId, time } = req.body
            const data = await this.BookService.loanBook(userId, bookId, time)
            res.status(200).json({message: `Loan completed for ${time} minutes`, data: data})
        }catch (e) {
            res.status(400).json({message: 'Error in loaning book'})
        }
    }
    async getLoans(req, res){
        try {
            const {id} = req.params
            const data = await this.BookService.getLoans(id);
            res.status(200).json({bookData:data})
        }catch (e) {
            res.status(400).json({message: 'Error in getting user books'})
        }
    }

    async returnBook(req, res){
        try {
            const {userId, bookId} = req.body
            const data = await this.BookService.returnBook(userId, bookId);
            res.status(200).json({bookData:data})
        }catch (e){
            res.status(400).json({message: 'Error in returning book'})
        }
    }

    async deleteBook(req, res){
        try {
            const bookId = req.params.id;
            const userId = req.query.user_id;
            const message = await this.BookService.deleteBook(bookId, userId)
            res.status(200).json({message: message})
        }catch (e) {
            res.status(400).json({message: 'Error in deleting book'})
        }
    }
}
