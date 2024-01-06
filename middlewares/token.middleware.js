import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
dotEnv.config()
export default function tokenMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        console.log("not");
        return res.status(401).json({ message: 'Authentication token is not provided' });
    }
    jwt.verify(token, process.env.SECRET_JWT, (err, data) => {
        if (err) {
            res.status(403).json({ message: 'Invalid token' });
            return
        }
        req.user = data;
        next();
    });
}