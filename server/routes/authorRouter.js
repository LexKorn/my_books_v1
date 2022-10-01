const Router = require('express');
const router = new Router();

const authorController = require('../controllers/authorController');

router.post('/', authorController.create);
router.get('/', authorController.getAll);
router.put('/:id', authorController.update);
router.delete('/:name', authorController.delete);

module.exports = router;