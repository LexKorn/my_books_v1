const Router = require('express');
const router = new Router();

const authorController = require('../controllers/authorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, authorController.create);
router.get('/', authMiddleware, authorController.getAll);
router.get('/:id', authMiddleware, authorController.getONe);
router.put('/:id', authMiddleware, authorController.update);
router.delete('/:name', authMiddleware, authorController.delete);

module.exports = router;