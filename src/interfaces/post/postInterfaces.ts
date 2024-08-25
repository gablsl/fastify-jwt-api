import { FastifyRequest } from 'fastify';

export interface PostRequest extends FastifyRequest {
    body: {
        id: string;
        imageUrl: string;
        title: string;
        content: string;
        authorId: string;
        categoryId: string;
    };
    params: {
        id: string;
    };
}

export interface PostRequestBody extends FastifyRequest {
    imageUrl?: string;
    title?: string;
    content?: string;
    params: {
        id: string;
    };
}
