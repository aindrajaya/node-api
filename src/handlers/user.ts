import prisma from "../modules/db";
import { hashPassword, createJWT, comparePassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username: username,
            password: await hashPassword(password),
        }
    });

    const token = createJWT(user);
    res.json({token});
}

export const signIn = async (req, res) => {
    // Find user by username from the database using Prisma
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    })

    // check if the user exists and the password is correct
    const isValid = await comparePassword(req.body.password, user.password);

    // If the user doesn't exist or the password is incorrect, return an error
    if (!user || !isValid) {
        res.status(401);
        res.json({message: 'Invalid username or password'});
        return;
    }

    // If the user exists and the password is correct, create a JWT token and return it
    const token = createJWT(user);
    res.json({token});
}