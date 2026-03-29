import 'dotenv/config'
import express from 'express'
import './config/db.js'
import bookRoutes from './routes/api/bookRoutes.js'
import userRoutes from './routes/api/userRoutes.js'

const app = express()

const port = process.env.PORT || 8081

app.use(express.json())

// make-believe frontend (login page)
app.get('/', (req, res) => res.send('<a href="/api/users/auth/github"><button>Login with GitHub</button></a>'))
 
// make-believe frontend (success page)
app.get('/success', (req, res) => res.send('<h1>Success!</h1><a href="/">Back</a>'))


app.use('/api/notes', bookRoutes);
app.use('/api/users', userRoutes)

app.listen(port, () => {
    console.log('Server is listening on port: localhost:', port)
})