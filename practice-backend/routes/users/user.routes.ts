import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import upload from "../../middlewares/multer";

const userRouter = Router()
userRouter.post('/manual', userController.register)
userRouter.post('/login', userController.login)
userRouter.patch('/',[authMiddleware, upload.single('avatar')], userController.updateUser)
userRouter.post('/auth/google', userController.googleAuth)
userRouter.post('/auth/github', userController.githubAuth)
userRouter.get('/me', authMiddleware,userController.me)

export default userRouter