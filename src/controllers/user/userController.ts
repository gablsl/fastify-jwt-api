import {
    SignInRequest,
    SignUpRequest,
} from '../../interfaces/user/userInterfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
    createUser,
    deleteUser,
    findUserByEmail,
    findUserByUsername,
    getAllUsers,
    updateUser,
} from '../../services/user/userService';
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

export const getUserByUsername = async (
    req: SignUpRequest,
    res: FastifyReply
) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.code(400).send({ error: 'Username is required' });
        }

        const user = await findUserByUsername(username);
        if (!username) {
            return res.code(404).send({ error: 'User not found' });
        }

        return res.code(200).send(user);
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

export const putUser = async (req: SignUpRequest, res: FastifyReply) => {
    try {
        const { username, newUsername } = req.body;

        if (!username || !newUsername) {
            return res.code(400).send({ error: 'Username can not be empty' });
        }

        const userExists = await findUserByUsername(username);
        if (!userExists) {
            return res.code(400).send({ error: 'Category does not exists' });
        }

        const updatedUser = await updateUser(username, {
            username: newUsername,
        });
        return res.code(200).send(updatedUser);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const delUser = async (req: SignUpRequest, res: FastifyReply) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.code(400).send({ error: 'Username can not be empty' });
        }

        const userExists = await findUserByUsername(username);
        if (!userExists) {
            return res.code(400).send({ error: 'User does not exists' });
        }

        const deletedUser = await deleteUser(username);
        res.code(204).send(deletedUser);
    } catch (err) {
        return res.code(400).send(err);
    }
};
