import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes.js'; // assuming you are exporting a router
import cors from "cors";

const app = express();

// Middleware setup
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5174', // Allow your frontend
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));

// Apply routes (routes already have the `/api` path in the file)
app.use('/api', routes); // No need to call routes(app) separately

// Start the server
app.listen(3000, () => { // Changed to 5000 to match the log message
    console.log("Server is running on port 3000");
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connected to the Database");
});

db.on("error", (error) => {
    console.error("Connection Failed:", error);
});
