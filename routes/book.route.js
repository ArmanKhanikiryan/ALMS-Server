import {Router} from "express";
import BookController from "../controllers/book.controller.js";

const bookRoute = Router()
const bookController = new BookController();

bookRoute.get('/', bookController.getAll.bind(bookController))

export default bookRoute;