import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
    getCategories,
    postCategory,
    putCategory,
    delCategory,
} from '../../controllers/category/categoryController';

type CategoryHandler = (
    req: FastifyRequest,
    res: FastifyReply
) => Promise<void>;

export const categoryRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', getCategories);
    fastify.post('/', postCategory as CategoryHandler);
    fastify.put('/', putCategory as CategoryHandler);
    fastify.delete('/', delCategory as CategoryHandler);
};
