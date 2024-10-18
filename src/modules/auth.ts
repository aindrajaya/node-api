import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 10); // 10 is the number of salt rounds, salt is a random string that is generated and added to the password before hashing. It makes the hash more secure. Because people don't know the salt, they can't reverse-engineer the hash to get the password. The more salt rounds you use, the more secure the hash will be, but it will also take longer to generate the hash. So you need to find a balance between security and performance. And also people can do brute force attack, so you need to make sure that the password is strong enough. You can use a library like bcrypt to generate a secure hash. Bcrypt is a library that is used to hash passwords. It's a one-way hash function, which means that you can't reverse-engineer the hash to get the password. It's a secure way to store passwords
}

export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        process.env.JWT_SECRET,
    );
    return token;
};