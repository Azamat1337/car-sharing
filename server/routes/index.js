const Router = require('express');
const userRouter = require('./userRouter');
const carRouter = require('./carRouter');
const rentalRouter = require('./rentalRouter');
const brandRouter = require('./brandRouter');

const router = new Router();
router.use('/user', userRouter);
router.use('/car', carRouter);
router.use('/rental', rentalRouter);
router.use('/brandRouter', brandRouter);

module.exports = router;