import {validationResult} from 'express-validator';

export const handleInputsError = (req, res, next) => {
    const errors = validationResult(req) // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        res.status(400); // this code is to set the HTTP status code for the response, send back a 400 status code
        res.json({ errors: errors.array() }); // this code is to send the validation errors back to the client
        return;
    } else {
        next(); // this code is to call the next middleware function in the request handling chain
    }
}