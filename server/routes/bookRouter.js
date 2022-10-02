const Router = require('express');
const router = new Router();

const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, bookController.create);
router.get('/', authMiddleware, bookController.getAll);
router.get('/:id', authMiddleware, bookController.getONe);
router.put('/:id', authMiddleware, bookController.update);
router.delete('/:name', authMiddleware, bookController.delete);

module.exports = router;