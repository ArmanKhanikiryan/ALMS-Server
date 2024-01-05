import {Router} from "express";
import BookController from "../controllers/book.controller.js";

const bookRoute = Router()
const bookController = new BookController();

bookRoute.get('/', bookController.getAll.bind(bookController))
bookRoute.get('/check/:id', bookController.checkBook.bind(bookController))
bookRoute.post('/loan', bookController.loanBook.bind(bookController))
export default bookRoute;