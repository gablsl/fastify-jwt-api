import { FastifyPluginAsync, FastifyReply } from 'fastify';
import { AuthUserRequest } from '../interfaces/userInterfaces';
import jwt from 'jsonwebtoken';

export const authPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.decorate(
        'authenticate',
        async (req: AuthUserRequest, res: FastifyReply) => {
            try {
                const authHeader = req.headers.authorization;

                if (!authHeader) {
                    return res.code(401).send({ message: 'No token provided' });
                }

                const token = authHeader.split(' ')[1];
                const secretToken = process.env.FASTIFY_JWT_SECRET as string;
                const decoded = jwt.verify(token, secretToken);

                req.user = decoded;
            } catch (err) {
                res.code(401).send({ message: 'Invalid token' });
            }
        }
    );
};
