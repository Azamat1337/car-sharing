const Router = require('express');
const chatController = require('../controllers/chatController');
const authMiddleware      = require('../middlewares/authMiddleware');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

const router = new Router();

router.get('/', authMiddleware, chatController.listMyConversations);
router.get('/all', authMiddleware, checkRoleMiddleware("ADMIN"), chatController.listAllConversations);
router.get('/:convId', authMiddleware, chatController.getMessages);
router.post('/:convId', authMiddleware, chatController.sendMessage);
router.post('/', authMiddleware, chatController.startConversation);

module.exports = router;
