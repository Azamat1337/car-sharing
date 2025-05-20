const Router = require('express');
const bookingController = require('../controllers/bookingController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')
const authMiddleware = require('../middlewares/authMiddleware');

const router = new Router();

router.get('/', checkRoleMiddleware('ADMIN'), bookingController.getAll);
router.get('/my', authMiddleware, bookingController.getMy);
router.get('/:id', authMiddleware, bookingController.getOne)
router.post('/', authMiddleware, bookingController.create);
router.put('/:id', authMiddleware, bookingController.update);
router.delete('/:id', authMiddleware, bookingController.delete);

module.exports = router;