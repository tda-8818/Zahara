import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file.
dotenv.config();

// Create a new Express application.
const app = express();

// Set the port for the server to listen on.
const port = process.env.PORT || 5000;

// Function to connect to the MongoDB database.
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from the environment variables.
        // The URI is what you just copied from your Atlas account.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log any errors that occur during the connection.
        console.error(`Error: ${error.message}`);
        // Exit the process with a failure code if the connection fails.
        process.exit(1);
    }
};

// Call the connectDB function to establish the database connection.
connectDB();

// A simple route to test that the server is working.
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server and listen for requests on the specified port.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
