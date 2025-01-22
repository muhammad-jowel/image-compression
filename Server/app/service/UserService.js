import mongoose from "mongoose";
import md5 from "md5";
import UserModel from "../model/UserModel.js";
import { EncodeToken } from "../utility/TokenUtility.js";
const ObjectID = mongoose.Types.ObjectId;


// User Registration
export const registerService = async (req, res) => {
    try {
        let reqBody = req.body;
        let password = md5(reqBody.password);
        reqBody.password = password;
        let data = await UserModel.create(reqBody);
        return { status: 'Success', message: "User registered successfully", data: data };
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};


// User Login
export const loginService = async (req, res) => {
    try {
        let email = req.body.email;
        let password = md5(req.body.password);
        let data = await UserModel.aggregate([
            {$match : { email: email, password: password }},
            {$project : {_id: 1, email: 1}}
        ]);

        if (data.length > 0) {
            let token = EncodeToken(data[0].email);

            let options = {
                maxAge : 30 * 24 * 60 * 60 * 1000,
                httpOnly : true,
                sameSite : 'none',
                secure : true,
            };

            res.cookie('token', token, options);
            return { status: 'Success', message: "User logged in successfully", token : token};
        } else {
            return { status: 'Fail', message: "Invalid email or password"};
        }
        
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};


// User profile Read
export const readProfileService = async (req, res) => {
    try {
        let email = req.headers.email;
        let MatchStage = {
            $match: {
                email,
            }
        };

        let project = {
            $project: {
                email: 1,
                firstName: 1,
                lastName: 1,
                img: 1,
                phone: 1,
            }
        }

        let data = await UserModel.aggregate([MatchStage, project]);
        return {status: 'Success', data: data[0]}
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};



// User Profile Update
export const updateProfileService = async (req, res) => {
    try {
        let email = req.headers.email;
        let reqBody = req.body;
        let data = await UserModel.updateOne({ email }, reqBody);
        return { status: 'Success', message: "User profile updated successfully", data : data};
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};

