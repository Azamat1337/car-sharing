const Router = require('express');
const taxiController = require('../controllers/taxiController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRoleMiddleware = require('../middlewares/checkRoleMiddleware');

const router = new Router();

router.post('/', authMiddleware, taxiController.createRide);
router.get('/', authMiddleware, checkRoleMiddleware("ADMIN"), taxiController.getAllRides);
router.get('/my', authMiddleware, taxiController.getMyRides);
router.put('/:rideId/status', authMiddleware, checkRoleMiddleware("ADMIN"), taxiController.changeStatus);
router.get('/available', authMiddleware, taxiController.getAvailableRides);
router.post('/:rideId/join', authMiddleware, taxiController.joinRide);
router.delete('/:rideId/join', authMiddleware, taxiController.leaveRide);
router.post('/:rideId/complete', authMiddleware, taxiController.completeRide);

module.exports = router;
