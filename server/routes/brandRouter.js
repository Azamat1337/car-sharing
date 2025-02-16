const Router = require('express');
const brandController = require('../controllers/brandController');

const router = new Router();

router.get('/', brandController.getAllBrands);
router.post('/', brandController.createBrand);

module.exports = router;