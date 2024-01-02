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
}