import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { mongoDBURL, PORT, FRONTEND_URL } from './config.js';
import booksRoute from './routes/booksRoute.js';


// Middleware for parsing JSON request body


const app = express();

app.use(cors());
// Middleware for CORS policy
// app.use(
//     cors({
//       origin: FRONTEND_URL, // Allow only your frontend domain
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       allowedHeaders: ['Content-Type'],
//       credentials: true, // Allow cookies (if needed)
//     })
//   );

// Custom CORS Headers (Fixes Preflight Issues)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://bookstore-mern-stack-bp3l.vercel.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

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
