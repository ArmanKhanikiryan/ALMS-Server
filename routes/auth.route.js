import {Router} from "express";
import AuthController from "../controllers/auth.controller.js";
const authRoute = Router()

const authController = new AuthController()

authRoute.post('/registration', authController.register.bind(authController))
authRoute.post('/login', authController.login.bind(authController))
authRoute.get('/ver', (req, res) => {
    res.json({message: 'Darava Hke'})
})
export default authRoute;