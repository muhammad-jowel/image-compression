import jwt from 'jsonwebtoken';
import { JWT_EXPIRE_TIME, JWT_KEY } from '../config/config.js';


export const EncodeToken = (email) => {

    let key = JWT_KEY;
    let expire = JWT_EXPIRE_TIME;
    let payload = { email };
    return jwt.sign(payload, key, { expiresIn: expire });
};



export const DecodeToken = (token) => {
    try { 
        return jwt.verify(token,JWT_KEY)
    } catch (err) {
        return null;
    }
};