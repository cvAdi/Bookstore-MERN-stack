import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { mongoDBURL, PORT } from './config.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for parsing JSON request body
app.use(express.json());

// Middleware for CORS policy
app.use(
    cors({
        origin: 'https://bookstore-mern-stack-bp3l.vercel.app', // ✅ REMOVE the trailing '/'
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    })
);

// Custom CORS Headers (Fixes Preflight Issues)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://bookstore-mern-stack-bp3l.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// API Routes
app.use('/api/books', booksRoute);

// Connect to MongoDB
mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on port: ${PORT}`);
        });
        console.log('✅ Connected to MongoDB');
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error);
    });
