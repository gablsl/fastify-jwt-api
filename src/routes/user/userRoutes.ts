import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
    delUser,
    getUserByUsername,
    getUsers,
    putUser,
    signUp,
} from '../../controllers/user/userController';

type SignUpHandler = (req: FastifyRequest, res: FastifyReply) => Promise<void>;

export const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', getUsers);
    fastify.get('/:username', getUserByUsername as SignUpHandler);
    fastify.post('/signup', signUp as SignUpHandler);
    fastify.put('/', putUser as SignUpHandler);
    fastify.delete('/', delUser as SignUpHandler);
};
