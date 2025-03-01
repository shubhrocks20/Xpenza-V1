import axios from "axios";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { prisma } from "../../prisma";
import { jwtHelper } from "../../shared/jwtHelper";
import { AuthRequest } from "../../middlewares/authMiddleware";
export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;
      res.json(req.body);
    } catch (err) {
      return next(createHttpError(500, "Internal Server Error"));
    }
  },
  async googleAuth(req: Request, res: Response, next: NextFunction) {
    const { access_token } = req.query;

    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      console.log(data);

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
      const local_access_token = jwtHelper.generateToken({
        email: data.email,
        id: data.sub,
      });
      res.cookie("access_token", local_access_token, {
        httpOnly: false,
        secure: false,
        sameSite: false,
      });

      res.json({ success: true, message: "User successful login" });
    } catch (err) {
      return next(createHttpError(500, "Google authentication failed"));
    }
  },
  async githubAuth(req: Request, res: Response, next: NextFunction) {
    const { code } = req.query;

    try {
      console.log("GitHub OAuth Started ✅");

      // 1. Exchange code for an access token
      const { data: tokenResponse } = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: `${code}`,
        },
        {
          headers: { Accept: "application/json" },
        }
      );

      const accessToken = tokenResponse.access_token;

      // 2. Fetch user data from GitHub API
      const { data: githubUser } = await axios.get(
        "https://api.github.com/user",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("GitHub User Data:", githubUser);

      // 3. Check if the user exists in the database
      let user = await prisma.user.findUnique({
        where: { providerId: githubUser.id.toString() }, // Ensure it's a string
      });

      // 4. If the user doesn't exist, create a new record
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: githubUser.email || "", // GitHub may not provide an email
            username: githubUser.name || githubUser.login,
            avatar: githubUser.avatar_url,
            authProvider: "GITHUB",
            providerId: githubUser.id.toString(),
          },
        });
      }

      // 5. Generate JWT token
      const local_access_token = jwtHelper.generateToken({
        email: user.email,
        id: user.providerId,
      });

      // 6. Set token as a cookie (Modify settings based on frontend needs)
      res.cookie("access_token", local_access_token, {
        httpOnly: false,
        secure: false,
        sameSite: false,
      });

      res.json({ success: true, message: "User successfully logged in" });
    } catch (err) {
      console.error("GitHub Auth Error:", err);
      return next(createHttpError(500, "GitHub authentication failed"));
    }
  },
  async me(req: Request, res: Response, next: NextFunction) {
    const _req = req as AuthRequest;
    try {
      const user = await prisma.user.findUnique({
        where: { providerId: _req.userId },
      });

      if (!user) {
        return next(createHttpError(404, "No user found"));
      }
      res.status(200).json({
        message: "Success",
        user,
      });
    } catch (err) {
      return next(createHttpError(500, "Internal Server Error"));
    }
  },
  
};
