import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
    delUser,
    getUserById,
    getUsers,
    putUser,
    signIn,
    signUp,
} from '../../controllers/user/userController';

type SignUpHandler = (req: FastifyRequest, res: FastifyReply) => Promise<void>;

export const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', getUsers);
    fastify.get('/:id', getUserById as SignUpHandler);
    fastify.post('/signup', signUp as SignUpHandler);
    fastify.post('/signin', signIn as SignUpHandler);
    fastify.put('/:id', putUser as SignUpHandler);
    fastify.delete('/:id', delUser as SignUpHandler);
};
