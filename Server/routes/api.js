import express from 'express';
const router = express.Router();

import * as UserController from '../app/controllers/UserController.js';
import AuthMiddleware from '../app/middlewares/AuthMiddleware.js';


// User Router
router.post('/Registration', UserController.Registration);
router.post('/Login', UserController.Login);
router.get('/Read-Profile', AuthMiddleware, UserController.ReadProfile);
router.post('/Update-Profile', AuthMiddleware, UserController.UpdateProfile);


export default router;