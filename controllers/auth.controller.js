import AuthService from "../services/auth.service.js";

export default class AuthController {
    constructor() {
        this.AuthService = new AuthService()
    }
    async login(req, res){
        try {
            const {email, password} = req.body;
            const {user, token} = await this.AuthService.login({email,password})
            res.status(200).json({user, token, message: 'Logged'})
        }catch (e) {
            console.log('Error Occurred')
            res.status(401).json({message: e.message})
        }
    }
    async register(req, res){
        try{
            const {name, role, email, password} = req.body
            const user = await this.AuthService.register({name, role,email,password})
            res.status(201).json({user, message: 'Created'})
        }catch (e) {
            res.status(400).json({message: 'Error in user registration'})
        }
    }
}