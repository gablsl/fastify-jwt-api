import { FastifyInstance } from 'fastify';
import { authPlugin } from './plugins/authPlugins';
import { userRoutes } from './routes/user/userRoutes';
import { categoryRoutes } from './routes/category/categoryRoutes';
import { postRoutes } from './routes/post/postRoutes';

export async function app(fastify: FastifyInstance) {
    fastify.register(authPlugin);
    fastify.register(userRoutes, { prefix: '/api/users' });
    fastify.register(categoryRoutes, { prefix: '/api/categories' });
    fastify.register(postRoutes, { prefix: '/api/posts' });
}
