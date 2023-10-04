import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from "cookie-parser";
import path from 'path';

dotenv.config(); // Load environment variables from a .env file

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("CONNECTED to MongoDB");
    }).catch((err) => {
        console.log(err);
    });

const __dirname = path.resolve();

const app = express(); // Create an Express application

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json()); // Middleware to parse JSON requests

app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server listening to PORT: 3000");
});

// Define route handlers
app.use("/api/user", userRoutes); // Use user routes for /api/user
app.use("/api/auth", authRoutes); // Use authentication routes for /api/auth

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Get the status code from the error, default to 500
    const message = err.message || "Internal Server Error"; // Get the error message, default to "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});