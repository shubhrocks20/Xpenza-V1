import axios from "axios"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import { prisma } from "../../prisma"
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
            console.log('User created!', user)

           
            res.json({ success: true, user });
        } catch (err) {
            return next(createHttpError(500, "Google authentication failed"));
        }
    }
}
