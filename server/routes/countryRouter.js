const Router = require('express');
const router = new Router();

const countryController = require('../controllers/countryController');

router.post('/', countryController.create);
router.get('/', countryController.getAll);
router.put('/:id', countryController.update);
router.delete('/:name', countryController.delete);

module.exports = router;