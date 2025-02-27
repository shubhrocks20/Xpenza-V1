import express from 'express'
import axios from 'axios'
import cors from 'cors'
const app = express()


app.use(cors())

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
app.listen(3011, () => {
    console.log(`Server Listening at 3011`)
})