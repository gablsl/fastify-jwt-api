import { FastifyRequest } from 'fastify';

export interface CategoryRequest extends FastifyRequest {
    body: {
        name: string;
    };
    params: {
        id: string;
    };
}
