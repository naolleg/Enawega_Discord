import { Router } from "express";
import userController from "./usercontroller.js";
import errorHandler from "../../midleware/error.js";
const userRouter = Router();

userRouter.post('/signup',errorHandler(userController.signup));
userRouter.get('/getAll',errorHandler(userController.getAll));
userRouter.get('/getAllAvatar',errorHandler(userController.getAllAvatar));
userRouter.post('/login',errorHandler(userController.login));
userRouter.put('/change-password/:id',errorHandler(userController.changePassword));
userRouter.put('/reset-password',errorHandler(userController.resetPassword));
userRouter.post('/otpverify',(userController.otpVerification));
userRouter.put('/newpassword',errorHandler(userController.newPassword));

export default userRouter;
    