// This API will use Express framework
// const express = require('express'); //for JS
import express from 'express';

// Import the path module
// const path = require('path'); //for JS
import path from 'path';

// Create an Express application
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

/**
 * 1. The app.get() method is used to define a route handler for GET requests.
 * 2. The method takes two arguments: the route path and a callback function.
 * 3. The route path is a string that defines the URL path for the route handler.
 * 4. The callback function takes two arguments: req (request) and res (response).
 * 5. The req object contains information about the request, such as the URL, headers, and body.
 * 6. The res object is used to send a response back to the client.
 * 7. The res.status() method is used to set the HTTP status code for the response.
 * 8. The res.json() method is used to send a JSON response back to the client.
 * 
 */
app.get('/', (req, res) => {
    // Log a message to the console
    console.log('GET request received use Express framework');

    // Set the HTTP status code for the response
    res.status(200);

    // Send a JSON response back to the client
    res.json({message: 'Hello World use Express framework'});
})

app.get('/about', (req, res) => {
    // Log a message to the console
    console.log('GET request received to access About page use Express framework');

    // Set the HTTP status code for the response
    res.status(200);

    // Send a JSON response back to the client
    res.sendFile(path.resolve('./src/public/about.html'));
})

// Export the Express application
// module.exports = app; //for JS
export default app;