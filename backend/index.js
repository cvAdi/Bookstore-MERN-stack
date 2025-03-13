import express, { request, response } from 'express';
import { mongoDBURL, PORT } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing requesting body
app.use(express.json());

//middleware for cors policy
//option 1 default(*)
//app.use(cors());

//option2 specific
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders :['content-type'],
    })
)

app.use('/books', booksRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`Apps is running to port : ${PORT}`);
        })
        console.log('App connected to Database');
    })
    .catch((error) => {
        console.log(error);
    })