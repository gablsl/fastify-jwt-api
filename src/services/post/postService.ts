import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const readAllPost = async () => {
    return await prisma.post.findMany();
};

export const createPost = async (postData: {
    imageUrl: string;
    title: string;
    content: string;
    authorId: string;
    categoryId: string;
}) => {
    return await prisma.post.create({
        data: {
            imageUrl: postData.imageUrl,
            title: postData.title,
            content: postData.content,
            author: {
                connect: { id: postData.authorId },
            },
            category: postData.categoryId
                ? {
                      connect: { id: postData.categoryId },
                  }
                : undefined,
        },
    });
};

export const updatePost = async (
    imageUrl: string,
    title: string,
    content: string,
    postData: { imageUrl?: string; title?: string; content?: string }
) => {
    return await prisma.post.update({
        where: {
            imageUrl,
            title,
            content,
        },
        data: postData,
    });
};

export const deletePost = async (id: string) => {
    return await prisma.post.delete({
        where: {
            id,
        },
    });
};

export const findPostById = async (id: string) => {
    return await prisma.post.findUnique({
        where: {
            id,
        },
    });
};
