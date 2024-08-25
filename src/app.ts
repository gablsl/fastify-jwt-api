import { FastifyInstance } from 'fastify';
import { authPlugin } from './plugins/authPlugins';
import { userRoutes } from './routes/user/userRoutes';
import { categoryRoutes } from './routes/category/categoryRoutes';

export async function app(fastify: FastifyInstance) {
    fastify.register(authPlugin);
    fastify.register(userRoutes, { prefix: '/api/users' });
    fastify.register(categoryRoutes, { prefix: '/api/categories' });
}
