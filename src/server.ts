// This API will use Express framework
// const express = require('express'); //for JS
import express from 'express';

// Import the path module
// const path = require('path'); //for JS
import path from 'path';

import router from './router'; // Import the router module
import morgan from 'morgan'; // Import the morgan module
import cors from 'cors'; // Import the cors module, cors is a middleware that can be used to enable CORS with various options. CORS is cross origin research sharing, it's a security feature that restricts what resources a web page can request from another domain. Basically it's a thing, browser super skeptic, they're terrified of making requests to other domains. So if you're making a request from one domain to another domain, the browser will block it.

// Create an Express application
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

app.use(cors()); // Enable CORS for all requests
app.use(morgan('dev')); // Log HTTP requests to the console
app.use(express.json()); // Parse JSON request bodies, this allows us to access the request body as a JavaScript object. Allow the client to send JSON data in the request body.
app.use(express.urlencoded({extended: true})); // Parse URL-encoded request bodies, this allows us to access the request body as a JavaScript object. Allow the client to send form data in the request body. Allows a client to send query parameters in the request body. If you don't use this, you can't access the query parameters in the request body and the request data will read as a string.

// Custom middleware function
app.use((req, res, next) => {
    // Log a message to the console
    console.log('Request received use Express framework');
    req.yourCustomProperty = 'Never do it by yoursel'; // Add a custom property to the request object
    // Call the next middleware function in the request handling chain
    next();
})

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
    res.json({message: `Hello World use Express framework, this also use the Middleware, so it can access ${req.yourCustomProperty}`});
})

/**
 * Notes:
 * 1. The app.use() method is used to mount a middleware function in the request handling chain.
 * 2. The method takes two arguments: the route path and the middleware function.
 * 3. The route path is a string that defines the URL path for the middleware function.
 */
app.use('/api', router);

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