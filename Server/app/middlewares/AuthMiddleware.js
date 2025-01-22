import { DecodeToken } from '../utility/TokenUtility.js';

export default (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        token = req.headers['token'];
    }
    let decoded = DecodeToken(token); 

    if (decoded === null) {
        return res.status(401).json({ status: 'Fail', message: 'Unauthorized' });
    } else {
        req.headers.email = decoded.email; 
        next(); 
    }
};