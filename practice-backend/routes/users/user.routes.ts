import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const userRouter = Router()
userRouter.post('/manual', userController.register)
userRouter.post('/auth/google', userController.googleAuth)
userRouter.post('/auth/github', userController.githubAuth)
userRouter.get('/me', authMiddleware,userController.me)

export default userRouter