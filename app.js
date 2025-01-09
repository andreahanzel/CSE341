require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express'); // Import Express

const app = express(); // Create an Express app

const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
    res.send('Hello! Welcome to your first API!');
});

// GET route with query parameters
app.get('/greet', (req, res) => {
    const { name } = req.query; // Extract the 'name' parameter from the URL
    if (name) {
        res.send(`Hello, ${name}! Welcome to the API.`);
    } else {
        res.send('Hello! Please provide a name using the "name" query parameter.');
    }
});

// POST route to add an item
app.post('/add', (req, res) => {
    const { item } = req.body; // Extract the 'item' field from the request body
    if (item) {
        res.status(201).send(`Item "${item}" has been added successfully.`);
    } else {
        res.status(400).send('Please provide an "item" in the request body.');
    }
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
