import express from 'express'
import { NextFunction , Response, Request} from "express";
import axios from 'axios'
import cors from 'cors'
import userRouter from './routes/users/user.routes'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/users', userRouter)

app.get('/auth/github', async (req, res) => {
    const {code} = req.query
    console.log('code is: ', code)
    try{
        let response = await axios.post("https://github.com/login/oauth/access_token", {
            client_id: 'Ov23limeWzoYfpK44Jp3',
            client_secret: 'd5ed6cbbbbb78e96cce749537dfbd9fec8c43890',
            code: `${code}`,
          }, {
            headers: { Accept: "application/json" },
          })
          
        res.json({data: response.data})
    } catch(err){
        console.log(err)
         res.json({error: 'Internal server error'})
    }
})
const PORT = process.env.PORT || 8080
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next);
});
app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`)
})