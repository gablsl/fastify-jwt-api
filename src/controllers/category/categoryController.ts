import { FastifyReply, FastifyRequest } from 'fastify';
import {
    findCategoryByName,
    getAllCategories,
    newCategory,
} from '../../services/category/categoryService';
import { CategoryRequest } from '../../interfaces/category/categoryInterfaces';

export const getCategories = async (
    _req: FastifyRequest,
    res: FastifyReply
) => {
    try {
        const categories = await getAllCategories();
        return res.code(200).send(categories);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const createCategory = async (
    req: CategoryRequest,
    res: FastifyReply
) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res
                .code(400)
                .send({ error: 'Category name can not be empty' });
        }

        const categoryExists = await findCategoryByName(name);
        if (categoryExists) {
            return res
                .code(400)
                .send({ error: 'Category already exists, try another one' });
        }

        const category = await newCategory({ name });
        return res.code(201).send(category);
    } catch (err) {
        return res.code(400).send(err);
    }
};
