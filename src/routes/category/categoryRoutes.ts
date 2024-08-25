import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
    getCategories,
    createCategory,
} from '../../controllers/category/categoryController';

type CategoryHandler = (
    req: FastifyRequest,
    res: FastifyReply
) => Promise<void>;

export const categoryRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', getCategories);
    fastify.post('/', createCategory as CategoryHandler);
};
