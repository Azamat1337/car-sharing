const Router = require('express');
const carController = require('../controllers/carController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware("ADMIN"), carController.create);
router.delete('/:id', checkRoleMiddleware("ADMIN"), carController.delete);
router.put('/:id', checkRoleMiddleware("ADMIN"), carController.update);
router.get('/', carController.getAll);
router.get('/:id', carController.getOne);

module.exports = router;