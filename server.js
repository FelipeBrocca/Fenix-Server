import express from 'express';
import { PORT } from './database/config/config.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { corsOptions } from './database/config/corsOptions.js';
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import { connectDB } from './database/database.js';

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './public/images'
}))


import mainRoutes from './routes/root.js'
import playersRoutes from './routes/playersRoutes.js'

app.use('/', mainRoutes)
app.use('/players-hockey', playersRoutes)
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.send('404 Not Found!')
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
