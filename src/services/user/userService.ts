import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return await prisma.user.findMany();
};

export const createUser = async (userData: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}) => {
    return await prisma.user.create({
        data: userData,
    });
};

export const findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
        where: { username },
    });
};

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};
