const Router = require('express');
const brandController = require('../controllers/brandController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

const router = new Router();

router.get('/', brandController.getAllBrands);
router.post('/', checkRoleMiddleware('ADMIN'), brandController.createBrand);
router.delete('/:id', checkRoleMiddleware('ADMIN'), brandController.deleteBrand);

module.exports = router;