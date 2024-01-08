import UserService from "../services/user.service.js";

export default class UserController {
    constructor() {
        this.UserService = new UserService()
    }
    async changePassword(req, res){
        try {
            const {userId, oldValue, newValue} = req.body
            const updatedData = await this.UserService.changePassword({userId, oldValue, newValue})
            res.status(200).json({message: 'Password changed!', updatedData})
        }catch (e) {
            console.log('Here')
            res.status(500).json({message: 'Error in user password change' })
        }
    }
    async changeName(req, res){
        try{


        }catch (e) {
            res.status(500).json({message: 'Error in user name change'})
        }
    }

    async changeEmail(req, res){
        try{


        }catch (e) {
            res.status(500).json({message: 'Error in user email change'})
        }
    }
}