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
    id: string,
    categoryData: { name: string }
) => {
    return await prisma.category.update({
        where: {
            id,
        },
        data: categoryData,
    });
};

export const deleteCategory = async (id: string) => {
    return await prisma.category.delete({
        where: {
            id,
        },
    });
};

export const findCategoryByName = async (name: string) => {
    return await prisma.category.findUnique({
        where: { name },
    });
};

export const findCategoryById = async (id: string) => {
    return await prisma.category.findUnique({
        where: { id },
    });
};
