const Router = require('express');
const router = new Router();

const countryController = require('../controllers/countryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, countryController.create);
router.get('/', authMiddleware, countryController.getAll);
router.put('/:id', authMiddleware, countryController.update);
router.delete('/:name', authMiddleware, countryController.delete);

module.exports = router;