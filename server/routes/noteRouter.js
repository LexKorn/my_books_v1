const Router = require('express');
const router = new Router();

const noteController = require('../controllers/noteController');

router.post('/', noteController.create);
router.get('/', noteController.getAll);
router.put('/:id', noteController.update);
router.delete('/:name', noteController.delete);

module.exports = router;