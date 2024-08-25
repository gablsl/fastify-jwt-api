import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCategories = async () => {
    return await prisma.category.findMany();
};

export const newCategory = async (categoryData: { name: string }) => {
    return await prisma.category.create({
        data: categoryData,
    });
};

export const findCategoryByName = async (name: string) => {
    return await prisma.category.findUnique({
        where: { name },
    });
};
