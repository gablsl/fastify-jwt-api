import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export interface SignUpRequest extends FastifyRequest {
    body: {
        name: string;
        username: string;
        newUsername: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    params: {
        username: string;
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
