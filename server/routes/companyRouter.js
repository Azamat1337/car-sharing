const Router = require('express');
const router = new Router();
const companyController = require('../controllers/companyController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), companyController.create);
router.get('/', companyController.getAll);
router.get('/:id', companyController.getOne);
router.put('/:id', checkRoleMiddleware('ADMIN'), companyController.update);
router.delete('/:id', checkRoleMiddleware('ADMIN'), companyController.delete);

module.exports = router;