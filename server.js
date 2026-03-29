import 'dotenv/config'
import express from 'express'
import './config/db.js'

const app = express()

const port = process.env.PORT || 8081

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Hello world')
})

app.listen(port, () => {
    console.log('Server is listening on port: localhost:', port)
})