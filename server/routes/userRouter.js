const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh', userController.refreshToken)
router.post('/logout', userController.logout)
router.get('/profile', authMiddleware, userController.profile)

module.exports = router;