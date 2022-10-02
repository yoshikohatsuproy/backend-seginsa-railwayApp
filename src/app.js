import express from 'express'
import {pool} from './db.js'
import cors from 'cors'
import morgan from 'morgan'

import { port } from './config.js'

import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/user.routes.js";
import marcaRoutes from "./routes/marca.routes.js";

const app = express()

app.get('/', async  (req, res) => {
    const [rows] = await pool.query('select 1 + 1 as result')
    res.send(rows)
})

 //Midlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/api',authRoutes)
app.use('/api',usuarioRoutes)
app.use('/api',marcaRoutes)
app.listen( port )
console.log('Server on port', port )