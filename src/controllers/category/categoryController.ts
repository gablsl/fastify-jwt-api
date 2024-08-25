import { FastifyReply, FastifyRequest } from 'fastify';
import {
    findCategoryById,
    findCategoryByName,
    readCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../../services/category/categoryService';
import { CategoryRequest } from '../../interfaces/category/categoryInterfaces';

export const getCategories = async (
    _req: FastifyRequest,
    res: FastifyReply
) => {
    try {
        const categories = await readCategory();
        return res.code(200).send(categories);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const getCategoryById = async (
    req: CategoryRequest,
    res: FastifyReply
) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.code(400).send({ error: 'Category name is required' });
        }

        const category = await findCategoryById(id);
        if (!category) {
            return res.code(404).send({ error: 'Category not found' });
        }

        return res.code(200).send(category);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const postCategory = async (req: CategoryRequest, res: FastifyReply) => {
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

        const category = await createCategory({ name });
        return res.code(201).send(category);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const putCategory = async (req: CategoryRequest, res: FastifyReply) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res
                .code(400)
                .send({ error: 'Category name can not be empty' });
        }

        const categoryExists = await findCategoryById(id);
        if (!categoryExists) {
            return res.code(400).send({ error: 'Category does not exists' });
        }

        const updatedCategory = await updateCategory(id, { name });
        return res.code(200).send(updatedCategory);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const delCategory = async (req: CategoryRequest, res: FastifyReply) => {
    try {
        const { id } = req.params;

        const categoryExists = await findCategoryById(id);
        if (!categoryExists) {
            return res.code(400).send({ error: 'Post does not exists' });
        }

        const deletedCategory = await deleteCategory(id);
        res.code(204).send(deletedCategory);
    } catch (err) {
        return res.code(400).send(err);
    }
};
