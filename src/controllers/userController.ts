import { SignInRequest, SignUpRequest } from '../interfaces/userInterfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
    createUser,
    findUserByEmail,
    findUserByUsername,
    getAllUsers,
} from '../services/userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async (_req: FastifyRequest, res: FastifyReply) => {
    try {
        const users = await getAllUsers();
        return res.code(200).send(users);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const signUp = async (req: SignUpRequest, res: FastifyReply) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res
                .code(400)
                .send({ message: 'Passwords do not match, try again' });
        }

        const usernameExists = await findUserByUsername(username);
        if (usernameExists) {
            return res
                .code(400)
                .send({ error: 'Username already exists, try another one' });
        }

        const emailExists = await findUserByEmail(email);
        if (emailExists) {
            return res
                .code(400)
                .send({ error: 'Email already exists, try another one' });
        }

        if (!name || !username || !email || !password || !confirmPassword) {
            return res.code(400).send({ error: 'Some fields are empty' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({
            name,
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        res.code(201).send(user);
    } catch (err) {
        res.code(500).send(err);
    }
};

export const signIn = async (req: SignInRequest, res: FastifyReply) => {
    try {
        const { username, password } = req.body;
        const user = await findUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .code(401)
                .send({ message: 'Passwords do not match, try again' });
        }

        const secretToken = process.env.FASTIFY_JWT_SECRET as string;
        const token = jwt.sign(
            { id: user.id, username: user.username },
            secretToken,
            { expiresIn: '1h' }
        );

        res.send(token);
    } catch (err) {
        res.code(500).send(err);
    }
};
