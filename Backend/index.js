import express from 'express';
import connectdb from './database/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routers/auth.router.js';
import BlogRoutes from './routers/blog.router.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

const app = express();
dotenv.config();  // Load environment variables

const port = process.env.PORT || 3000;  // Use port from environment variables or default to 3000

// CORS configuration (without specific frontend URL)
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(morgan('dev'));  // Logging HTTP requests
app.use(cors(corsOptions));  // Enable CORS with the above options
app.use(cookieParser());  // Cookie parsing middleware
app.use(express.json());  // Parse incoming JSON data

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", BlogRoutes);

// Start the server and connect to the database
app.listen(port, () => {
  connectdb();  // Connect to the database
  console.log(`Server is running on port ${port}`);
});
