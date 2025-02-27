// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET as string;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// export const jwtHelper = {
//   generateToken(payload: object, expiresIn: string = JWT_EXPIRES_IN): string {
//     return jwt.sign(payload,  , { expiresIn });
//   },

//   verifyToken(token: string): any {
//     try {
//       return jwt.verify(token, JWT_SECRET);
//     } catch (error) {
//       return null; // Token is invalid or expired
//     }
//   }
// };
