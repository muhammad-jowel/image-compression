import { registerService, loginService, readProfileService, updateProfileService, deleteAccountService } from '../service/UserService.js';


// User Registration
export const Registration = async (req, res) => {
    let result = await registerService(req);
    return res.json(result);
};


// User Login
export const Login = async (req, res) => {
    let result = await loginService(req, res);
    return res.json(result);
};


// User Profile Read
export const ReadProfile = async (req, res) => {
    let result = await readProfileService(req);
    return res.json(result);
};


// User Update Profile
export const UpdateProfile = async (req, res) => {
    let result = await updateProfileService(req);
    return res.json(result);
}


// User Logout
export const Logout = async (req, res) => {
    const cookieOptions = {httpOnly: false, secure: true, sameSite: 'strict', maxAge: 0};
    res.cookie('token', '', cookieOptions)
    return res.status(200).json({status:"success"})
}


// Delete Account
export const DeleteAccount = async (req, res) => {
    let result = await deleteAccountService(req);
    return res.json(result);
}