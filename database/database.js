import mongoose from "mongoose";
export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Successfully Connected to DataBase')
    }catch (e) {
        throw new Error(e.message)
    }
}