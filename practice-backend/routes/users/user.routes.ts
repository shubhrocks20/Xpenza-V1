import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router()

userRouter.post('/manual', userController.register)
userRouter.post('/auth/google', userController.googleAuth)
// userRouter.post('/auth/github', userController.register)

export default userRouter