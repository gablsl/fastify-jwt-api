import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export interface SignUpRequest extends FastifyRequest {
    body: {
        name: string;
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    params: {
        id: string;
    };
}

export interface SignInRequest extends FastifyRequest {
    body: {
        username: string;
        password: string;
    };
}

export interface AuthUserRequest extends FastifyRequest {
    user?: string | jwt.JwtPayload;
}
