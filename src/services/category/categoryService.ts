import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const readCategory = async () => {
    return await prisma.category.findMany();
};

export const createCategory = async (categoryData: { name: string }) => {
    return await prisma.category.create({
        data: categoryData,
    });
};

export const updateCategory = async (
    name: string,
    categoryData: { name: string }
) => {
    return await prisma.category.update({
        where: {
            name,
        },
        data: categoryData,
    });
};

export const deleteCategory = async (name: string) => {
    return await prisma.category.delete({
        where: {
            name,
        },
    });
};

export const findCategoryByName = async (name: string) => {
    return await prisma.category.findUnique({
        where: { name },
    });
};
