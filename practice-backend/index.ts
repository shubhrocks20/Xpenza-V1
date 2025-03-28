import express from "express";
import { NextFunction, Response, Request } from "express";
import axios from "axios";
import cors from "cors";
import userRouter from "./routes/users/user.routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import billsRouter  from "./routes/bills/bills.routes";
const app = express();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URI}`,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use(`/api/v1/bills`, billsRouter);

// app.get('/auth/github', async (req, res) => {
//     const {code} = req.query
//     console.log('code is: ', code)
//     try{
//         let response = await axios.post("https://github.com/login/oauth/access_token", {
//             client_id: 'Ov23limeWzoYfpK44Jp3',
//             client_secret: 'd5ed6cbbbbb78e96cce749537dfbd9fec8c43890',
//             code: `${code}`,
//           }, {
//             headers: { Accept: "application/json" },
//           })

//         res.json({data: response.data})
//     } catch(err){
//         console.log(err)
//          res.json({error: 'Internal server error'})
//     }
// })
const PORT = process.env.PORT || 8080;
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});
app.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
});
