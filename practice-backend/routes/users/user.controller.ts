import axios from "axios"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import { prisma } from "../../prisma"
import { jwtHelper } from "../../shared/jwtHelper"
import { AuthRequest } from "../../middlewares/authMiddleware"
export const userController = {
    async register(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password, username} = req.body
            res.json(req.body)
        } catch(err){
            return next(createHttpError(500, 'Internal Server Error'))
        }
    },
    async googleAuth(req: Request, res: Response, next: NextFunction) {
        const { access_token } = req.query;

        try {
            
            const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${access_token}` },
            });
            console.log(data)

            
            let user = await prisma.user.findUnique({
                where: { providerId: data.sub },
            });

            if (!user) {
              
                user = await prisma.user.create({
                    data: {
                        email: data.email,
                        username: data.name || null,
                        avatar: data.picture,
                        authProvider: "GOOGLE",
                        providerId: data.sub,
                    },
                });
            }
            const local_access_token = jwtHelper.generateToken({email: data.email, id: data.sub})
            res.cookie('access_token', local_access_token, {
                httpOnly: false,
                secure: false,
                sameSite: false
               
            })
            
            res.json({ success: true, message: 'User successful login' });
        } catch (err) {
            return next(createHttpError(500, "Google authentication failed"));
        }
    },
    async githubAuth(req: Request, res: Response, next: NextFunction) {
        
    },
    async me(req: Request, res: Response, next: NextFunction){
        const _req = req as AuthRequest
        try{
            const user = await prisma.user.findUnique({where: {email: _req.email}}) 

            if(!user) {
                return next(createHttpError(404, 'No user found'))
            }
             res.status(200).json({
                message: 'Success',
                user
            })
        } catch(err){
            return next(createHttpError(500, 'Internal Server Error'))
        }
    }

}
