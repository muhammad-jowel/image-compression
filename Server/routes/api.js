import express from 'express';
const router = express.Router();

import * as UserController from '../app/controllers/UserController.js';
import * as FileController from '../app/controllers/FileController.js';
import AuthMiddleware from '../app/middlewares/AuthMiddleware.js';


// User Router
router.post('/Registration', UserController.Registration);
router.post('/Login', UserController.Login);
router.get('/Read-Profile', AuthMiddleware, UserController.ReadProfile);
router.post('/Update-Profile', AuthMiddleware, UserController.UpdateProfile);


// File Upload Router
router.post('/Upload-Single-File', FileController.uploadSingleFile);
router.post('/Upload-Multiple-Files', FileController.uploadMultipleFiles);
router.get('/Read-File/:fileName', FileController.readFile);
router.delete('/Delete-Single-File/:fileName', FileController.deleteSingleFile);


export default router;