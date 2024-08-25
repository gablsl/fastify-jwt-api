import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
    delPost,
    getPostByTitle,
    getPosts,
    postPost,
    putPost,
} from '../../controllers/post/postController';

type PostHandler = (req: FastifyRequest, res: FastifyReply) => Promise<void>;

export const postRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', getPosts);
    fastify.get('/:id', getPostByTitle as PostHandler);
    fastify.post('/', postPost as PostHandler);
    fastify.put('/:id', putPost as PostHandler);
    fastify.delete('/:id', delPost as PostHandler);
};
