const { Post, User } = require('../models/models');
const ApiError = require('../error/ApiError');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

class PostController {
    // GET /api/posts
    async getAll(req, res, next) {
        try {
            const page = Math.max(parseInt(req.query.page) || DEFAULT_PAGE, 1);
            const limit = Math.max(parseInt(req.query.limit) || DEFAULT_LIMIT, 10);
            const offset = (page - 1) * limit;

            const {count, rows: posts} = await Post.findAndCountAll({
                order: [['publishedAt', 'DESC']],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'username', 'email'],
                    }
                ],
                limit,
                offset
            })

            return res.json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts
            });
        } catch (err) {
            next(err);
        }
    }

    // GET /api/posts/:id
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id, {
                include: [
                    { model: User, as: 'author', attributes: ['id', 'username', 'email'] }
                ]
            });
            if (!post) {
                throw ApiError.notFound(`Post with id=${id} not found`);
            }
            return res.json(post);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/posts
    async create(req, res, next) {
        try {
            const { title, excerpt, content } = req.body;
            if (!title || !content) {
                throw ApiError.badRequest('Title and content are required');
            }
            const authorId = req.user.id;
            let imagePath = null;
            if (req.files && req.files.image) {
                const image = req.files.image;
                const fileName = Date.now() + '_' + image.name;
                const path = require('path');
                const uploadPath = path.resolve(__dirname, '..', 'static', fileName);
                await image.mv(uploadPath);
                imagePath = '/static/' + fileName;
            }
            const post = await Post.create({
                title,
                excerpt: excerpt || null,
                content,
                authorId,
                publishedAt: new Date(),
                image: imagePath
            });
            return res.status(201).json(post);
        } catch (err) {
            next(err);
        }
    }

    // PUT /api/posts/:id
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, excerpt, content } = req.body;
            const post = await Post.findByPk(id);
            if (!post) {
                throw ApiError.notFound(`Post with id=${id} not found`);
            }
            // При необходимости можно проверить авторство: post.authorId === req.user.id || role ADMIN
            post.title = title ?? post.title;
            post.excerpt = excerpt ?? post.excerpt;
            post.content = content ?? post.content;
            await post.save();
            return res.json(post);
        } catch (err) {
            next(err);
        }
    }

    // DELETE /api/posts/:id
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id);
            if (!post) {
                throw ApiError.notFound(`Post with id=${id} not found`);
            }
            await post.destroy();
            return res.json({ message: 'Post deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PostController();
