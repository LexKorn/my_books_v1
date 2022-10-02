const Router = require('express');
const router = new Router();

const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, noteController.create);
router.get('/', authMiddleware, noteController.getAll);
router.get('/:id', authMiddleware, noteController.getONe);
router.put('/:id', authMiddleware, noteController.update);
router.delete('/:name', authMiddleware, noteController.delete);

module.exports = router;