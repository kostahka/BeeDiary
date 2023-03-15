const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller')
const {body} = require('express-validator')

router.post('/login', userController.login)
router.post('/registration',
    body('nickname').notEmpty({ignore_whitespace: true}),
    body('password').isLength({min: 3, max:32}),
    userController.registration)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router;
