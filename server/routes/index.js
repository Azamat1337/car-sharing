const Router = require('express');
const userRouter = require('./userRouter');
const carRouter = require('./carRouter');
const bookingRouter = require('./bookingRouter');
const brandRouter = require('./brandRouter');
const postRouter = require('./postRouter');
const carInfoRouter = require('./carInfoRouter');
const chatRouter = require('./chatRouter');
const taxiRouter = require('./taxiRouter');
const companyRouter = require('./companyRouter');

const router = new Router();

router.use('/auth', userRouter);
router.use('/car', carRouter);
router.use('/bookings', bookingRouter);
router.use('/brands', brandRouter);
router.use('/post', postRouter);
router.use('/', carInfoRouter)
router.use('/chat', chatRouter);
router.use('/taxi', taxiRouter);
router.use('/companies', companyRouter);

module.exports = router;