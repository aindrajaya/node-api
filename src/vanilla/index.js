const  http = require('http');

/**
 * Notes:
 * 1. The http.createServer() method is used to create an HTTP server that listens for requests.
 * 2. The method takes a callback function that is executed whenever a request is received.
 * 3. The callback function takes two arguments: req (request) and res (response).
 * 4. The req object contains information about the request, such as the URL, headers, and body.
 * 5. The res object is used to send a response back to the client.
 * 6. The server.listen() method is used to start the server listening for incoming requests.
 * 7. The async keyword is used to define an asynchronous function, which allows us to use the await keyword inside the function. 
 * 8. I want going to do something async in this function, so I'm going to use the async keyword. Is okay if you not used async keyword.
 */

// This `http.createServer` is just like an event-driven architecture. It's like an event listener. It will listen for incoming requests. So when someone makes a request to the server, this function will be called and that's event. In frontend world, it just like `button.addEventListerner('click', () => {})`. So when someone clicks the button, the function will be called. The same thing happens here. When someone makes a request to the server, this function will be called.
const server = http.createServer(async (req, res) => {
    // When the request comes in we will run this callback/arrow function. This function will be called when someone makes a request to the server. The res object is used to send a response back to the client. The req object contains information about the request, such as the URL, headers, and body.
    // Route handlers will be here. We will check the request method and the URL and based on that we will send a response back to the client. It is something that you need to protect from the client. You need to make sure that the client can't access the data that they are not supposed to access. So you need to check the request method and the URL and based on that you will send a response back to the client. 
    if(req.method === 'GET' && req.url === '/'){
        //Simple things
        // console.log('GET request received');
        // res.statusCode = 200;
        // res.end();

        // With more complex example
        console.log('GET request received'); // Log a message to the console
        res.writeHead(200, {'Content-Type': 'application/json'}); // Set the HTTP status code and content type for the response
        res.write(JSON.stringify({message: 'Hello World use Vanilla Node.js'})); // Send a JSON response back to the client
        res.end();
        return
    }

    // If the request method is not GET or the URL is not '/', then we will send a 404 Not Found response back to the client.
    res.writeHead(404, {'Content-Type': 'application/json'});

    // Send a JSON response back to the client
    res.write(JSON.stringify({message: 'Not Found'}));
})

// The server.listen() method is used to start the server listening for incoming requests. The method takes two arguments: the port number and a callback function. The port number is the port on which the server will listen for incoming requests. The callback function is executed when the server starts listening for incoming requests. The callback function can be used to perform any necessary setup or logging. The server will continue running until it is stopped or an error occurs.
module.exports = server;