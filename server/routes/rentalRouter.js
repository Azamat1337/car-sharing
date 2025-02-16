const Router = require('express');
const rentalController = require('../controllers/rentalController');

const router = new Router();
router.put('/', rentalController.updateRental);
router.get('/:id', rentalController.getRentalById);
router.get('/', rentalController.getAllRentals);
router.post('/', rentalController.createRental);
router.delete('/:id', rentalController.deleteRental);

module.exports = router;