import { getCategoryById } from './../../controllers/category/categoryController';
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
    fastify.get('/:id', getCategoryById as CategoryHandler);
    fastify.post('/', postCategory as CategoryHandler);
    fastify.put('/:id', putCategory as CategoryHandler);
    fastify.delete('/:id', delCategory as CategoryHandler);
};
