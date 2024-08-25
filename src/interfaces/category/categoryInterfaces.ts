import { FastifyRequest } from 'fastify';

export interface CategoryRequest extends FastifyRequest {
    body: {
        name: string;
        newName: string;
    };
}
