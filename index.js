import dotEnv from 'dotenv'
import express from "express";
import cors from 'cors'
import authRoute from "./routes/auth.route.js";
import connectDB from "./database/database.js";
import bookRoute from "./routes/book.route.js";

const app = express()
dotEnv.config()
connectDB()

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoute)
app.use('/api/book', bookRoute)



app.get('/', (req, res) => {
    res.send('Hello Hayko')
})


app.listen(9999, () => {
    console.log('Running 9999')
})


