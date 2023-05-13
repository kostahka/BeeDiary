const express = require('express');
const router = express.Router();
const apiaryController = require('../controllers/apiary-controller')
const {body} = require('express-validator')

router.post('/addAllowedUser/:id', apiaryController.addAllowedUser)
router.post('/removeAllowedUser/:id', apiaryController.removeAllowedUser)
router.get('/getAll/:nickname', apiaryController.getApiaries)
router.get('/getUserAll/:id', apiaryController.getUserOwnApiaries)
router.get('/get/:id', apiaryController.getApiary)
router.post('/set/:id',
    body('name').notEmpty({ignore_whitespace:true}), apiaryController.setApiary)
router.put('/add/:nickname',
    body('name').notEmpty({ignore_whitespace:true}) ,apiaryController.addApiary)
router.delete('/delete/:id', apiaryController.deleteApiary)

module.exports = router;