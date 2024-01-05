import BookService from "../services/book.service.js";

export default class BookController{
    constructor() {
        this.BookService = new BookService()
    }
    async getAll(req, res){
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;
            const bookData = await this.BookService.getAll(skip, limit)
            res.status(200).json({data: bookData})
        }catch (e){
            res.status(400).json({message: 'Error in getting books'})
        }
    }
    async checkBook(req, res){
        try {
            const {id} = req.params
            const data = await this.BookService.checkBook(id)
            res.status(200).json({bookAvailability: data})
        }catch (e) {
            res.status(400).json({message: 'Error in checking book availability'})
        }
    }
    async loanBook(req, res){
        const {id, time} = req.body
        try {
            const data = await this.BookService.loanBook(id, time)
            res.status(200).json({message: `Loan completed for ${time} minutes`, book: data})
        }catch (e) {
            res.status(400).json({message: 'Error in loaning book'})
        }
    }
}
