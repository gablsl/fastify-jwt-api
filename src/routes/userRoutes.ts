import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getUsers, signUp } from '../controllers/userController';

type SignUpHandler = (req: FastifyRequest, res: FastifyReply) => Promise<void>;

export const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', getUsers);
    fastify.post('/signup', signUp as SignUpHandler);
};
