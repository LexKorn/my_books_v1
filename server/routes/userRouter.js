const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', [
    check('username', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть от 4 до 8 символов').isLength({min: 4, max: 8})
], userController.register);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);


module.exports = router;