const express = require('express');
const router = express.Router();
const apiaryController = require('../controllers/apiary-controller')
const {body} = require('express-validator')

router.get('/getAll/:nickname', apiaryController.getApiaries)
router.get('/get/:id', apiaryController.getApiary)
router.post('/set/:id',
    body('name').notEmpty({ignore_whitespace:true}), apiaryController.setApiary)
router.post('/add/:nickname',
    body('name').notEmpty({ignore_whitespace:true}) ,apiaryController.addApiary)
router.post('/delete/:id', apiaryController.deleteApiary)
module.exports = router;