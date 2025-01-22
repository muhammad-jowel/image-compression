import jwt from 'jsonwebtoken';


export const EncodeToken = (email) => {

    let key = process.env.JWT_KEY;
    let expire = process.env.JWT_EXPIRE_TIME;
    let payload = { email };
    return jwt.sign(payload, key, { expiresIn: expire });
};



export const DecodeToken = (token) => {
    try { 
        return jwt.verify(token, process.env.JWT_KEY)
    } catch (err) {
        return null;
    }
};