const { Conversation, Message, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class ChatController {
    // POST /api/chats
    async startConversation(req, res, next) {
        try {
            const { subject } = req.body;
            const existing = await Conversation.findOne({
                where: {
                    userId: req.user.id,
                    status: 'ACTIVE'
                }
            });
            if (existing) return res.json(existing);

            const conv = await Conversation.create({
                userId: req.user.id,
                subject: subject || null,
                status: 'ACTIVE'
            });
            return res.status(201).json(conv);
        } catch (err) { next(err); }
    }

    // GET /api/chats
    async listMyConversations(req, res, next) {
        try {
            const convos = await Conversation.findAll({
                where: { userId: req.user.id },
                include: [{ model: Message, as: 'messages', limit: 1, order: [['createdAt', 'DESC']] }]
            });
            return res.json(convos);
        } catch (err) { next(err); }
    }

    // GET /api/chats/all
    async listAllConversations(req, res, next) {
        try {
            const convos = await Conversation.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
                    { model: Message, as: 'messages', limit: 1, order: [['createdAt', 'DESC']] }
                ]
            });
            return res.json(convos);
        } catch (err) { next(err); }
    }

    // GET /api/chats/:convId
    async getMessages(req, res, next) {
        try {
            const { convId } = req.params;
            const conv = await Conversation.findByPk(convId);
            if (!conv) throw ApiError.notFound('Conversation not found');

            if (req.user.role !== 'ADMIN' && conv.userId !== req.user.id) {
                throw ApiError.forbidden('Access denied');
            }
            const msgs = await Message.findAll({
                where: { conversationId: convId },
                include: [{ model: User, as: 'sender', attributes: ['id', 'username'] }],
                order: [['createdAt', 'ASC']]
            });
            return res.json(msgs);
        } catch (err) { next(err); }
    }

    // POST /api/chats/:convId
    async sendMessage(req, res, next) {
        try {
            const { convId } = req.params;
            const { content } = req.body;

            if (!content) throw ApiError.badRequest('Message content required');

            const conv = await Conversation.findByPk(convId);

            if (!conv) throw ApiError.notFound('Conversation not found');
            if (req.user.role !== 'ADMIN' && conv.userId !== req.user.id) {
                throw ApiError.forbidden('Access denied');
            }

            const msg = await Message.create({
                conversationId: convId,
                senderId: req.user.id,
                content
            });
            return res.status(201).json(msg);
        } catch (err) { next(err); }
    }

    async closeConversation(req, res, next) {
        try {
            const { convId } = req.params;
            const conv = await Conversation.findByPk(convId);
            if (!conv) throw ApiError.notFound('Conversation not found');
            if (req.user.role !== 'ADMIN') throw ApiError.forbidden('Only admin can close chat');
            conv.status = 'CLOSED';
            await conv.save();
            return res.json(conv);
        } catch (err) { next(err); }
    }
}

module.exports = new ChatController();
