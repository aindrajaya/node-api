import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization; //this code is to get the token from the header, and the header is the one that is sent by the client, it has the authorization key and the value is the token

    if (!bearer) {
        res.status(401);
        res.json({message: 'Not authorized'});
        return;
        // throw new Error('Not authorized');
    }

    const [, token] = bearer.split(' ');
    if(!token){
        res.status(401);
        res.json({message: 'Not authorized'});
        return;
        // throw new Error('Not authorized');
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET); // this code is to verify the token, if the token is valid, it will return the user object
        req.user = user; // this code is to add the user object to the request object
        console.log('User is authenticated');
        next(); // this code is to call the next middleware function in the request handling chain
        return;
    } catch (error) {
        console.error('User is not authenticated');
        res.status(401);
        res.json({message: 'Not valid token'});
        return;
    }
};