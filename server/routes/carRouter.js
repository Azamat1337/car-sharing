const Router = require('express');
const carController = require('../controllers/carController');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');
const router = new Router();

router.post('/', checkRoleMiddleware("ADMIN"), carController.createCar);
router.delete('/:id', checkRoleMiddleware("ADMIN"), carController.deleteCar);
router.put('/:id', checkRoleMiddleware("ADMIN"), carController.updateCar);
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

module.exports = router;