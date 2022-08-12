import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth,userPasswordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', newUserValidator, userController.newUser);

//route to get all registered users
router.get('',userController.getAllUsers);

//route to check login credentials
router.post('/login',userController.getLogin);

//router for forget password
router.post('/forgetPwd',userController.forgetPassword);

//router to reset password
router.put('/resetPwd',userPasswordAuth,userController.resetPassword);

export default router;