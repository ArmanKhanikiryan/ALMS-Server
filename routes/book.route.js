import {Router} from "express";
import BookController from "../controllers/book.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const bookRoute = Router()
const bookController = new BookController();

bookRoute.get('/', tokenMiddleware, bookController.getAll.bind(bookController))
bookRoute.get('/check/:id', tokenMiddleware, bookController.checkBook.bind(bookController))
bookRoute.post('/loan', tokenMiddleware, bookController.loanBook.bind(bookController))
bookRoute.get('/loans/:id', tokenMiddleware, bookController.getLoans.bind(bookController))
bookRoute.post('/return', tokenMiddleware, bookController.returnBook.bind(bookController))
bookRoute.delete('/:id', tokenMiddleware, bookController.deleteBook.bind(bookController))

export default bookRoute;