import { FastifyInstance } from 'fastify';
import { authPlugin } from './plugins/authPlugins';
import { userRoutes } from './routes/userRoutes';
import { categoryRoutes } from './routes/categoryRoutes';

export async function app(fastify: FastifyInstance) {
    fastify.register(authPlugin);
    fastify.register(userRoutes, { prefix: '/api/users' });
    fastify.register(categoryRoutes, { prefix: '/api/categories' });
}
