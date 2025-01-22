import { registerService, loginService, readProfileService, updateProfileService } from '../service/UserService.js';


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