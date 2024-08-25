import {
    createPost,
    deletePost,
    findPostById,
    updatePost,
} from './../../services/post/postService';
import {
    PostRequest,
    PostRequestBody,
} from './../../interfaces/post/postInterfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import { readAllPost } from '../../services/post/postService';

export const getPosts = async (_req: FastifyRequest, res: FastifyReply) => {
    try {
        const posts = await readAllPost();
        return res.code(200).send(posts);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const getPostByTitle = async (req: PostRequest, res: FastifyReply) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.code(400).send({ error: 'Post title is required' });
        }

        const postExists = findPostById(id);
        if (!postExists) {
            return res
                .code(400)
                .send({ error: 'Email already exists, try another one' });
        }

        const post = await findPostById(id);
        return res.code(200).send(post);
    } catch (err) {
        return res.code(400).send(err);
    }
};

export const postPost = async (req: PostRequest, res: FastifyReply) => {
    try {
        const { imageUrl, title, content, authorId, categoryId } = req.body;

        const postExists = findPostById(title);
        if (!postExists) {
            return res
                .code(400)
                .send({ error: 'Email already exists, try another one' });
        }

        if (!imageUrl || !title || !content || !authorId || !categoryId) {
            return res.code(400).send({ error: 'Some fields are empty' });
        }

        const post = await createPost({
            imageUrl,
            title,
            content,
            authorId,
            categoryId,
        });

        console.log(post);

        res.code(201).send(post);
    } catch (error) {
        res.code(500).send(error);
    }
};

export const putPost = async (req: PostRequestBody, res: FastifyReply) => {
    try {
        const { id } = req.params;
        const { imageUrl, title, content } = req.body as PostRequestBody;

        const postExists = await findPostById(id);
        if (!postExists) {
            return res.code(400).send({ error: 'Post does not exists' });
        }

        const updatedPost = await updatePost(id, {
            imageUrl,
            title,
            content,
        });

        return res.code(200).send(updatedPost);
    } catch (error) {
        res.code(500).send(error);
    }
};

export const delPost = async (req: PostRequest, res: FastifyReply) => {
    try {
        const { id } = req.params;

        const postExists = await findPostById(id);
        if (!postExists) {
            return res.code(400).send({ error: 'Category does not exists' });
        }

        const deletedPost = await deletePost(id);
        res.code(201).send(deletedPost);
    } catch (error) {
        res.code(500).send(error);
    }
};
