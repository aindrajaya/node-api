// Import the service from the server file
// const app = require('./server'); //for JS
// const serverVanilla = require('./vanilla/index.js'); //for JS
import app from "./server";
import * as dotenv from 'dotenv'; // Import the dotenv module
dotenv.config(); // Load environment variables from a .env file into process.env

const PORT = 3000;

/**
 * Notes:
 * 1. The app.listen() method is used to start the server listening for incoming requests.
 * 2. The method takes two arguments: the port number and a callback function.
 * 3. The port number is the port on which the server will listen for incoming requests.
 * 4. The callback function is executed when the server starts listening for incoming requests.
 * 5. The callback function can be used to perform any necessary setup or logging.
 * 6. The server will continue running until it is stopped or an error occurs.
 */

// Start the server
app.listen(PORT , () => {
    // Log a message to the console
    console.log(`Server is running on http://localhost:${PORT}`);
})