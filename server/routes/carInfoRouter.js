const Router = require('express')
const carInfoController = require('../controllers/carInfoController')
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware')

const router = new Router()

router.get('cars/:carId/info', carInfoController.getAllByCar);
router.post('/cars/:carId/info', checkRoleMiddleware('ADMIN'), carInfoController.create)
router.put('/cars/:carId/info/:infoId', checkRoleMiddleware('ADMIN'), carInfoController.update);
router.delete('/cars/:carId/info/:infoId', checkRoleMiddleware('ADMIN'), carInfoController.delete)

module.exports = router