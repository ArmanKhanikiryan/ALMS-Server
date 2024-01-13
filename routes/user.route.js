import {Router} from "express";
import UserController from "../controllers/user.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
const userRoute = Router()

const userController = new UserController()

userRoute.patch('/password', tokenMiddleware, userController.changePassword.bind(userController))

export default userRoute;