const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const authorRouter = require('./authorRouter');
const countryRouter = require('./countryRouter');
const noteRouter = require('./noteRouter');

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/country', countryRouter);
router.use('/note', noteRouter);

module.exports = router;