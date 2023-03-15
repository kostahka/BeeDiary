const express = require('express');
const router = express.Router();
const apiaryController = require('../controllers/apiary-controller')

router.get('/getAll/:id', apiaryController.getApiaries)
router.get('/get/:id', apiaryController.getApiary)
router.post('/set/:id', apiaryController.setApiary)
router.post('/add', apiaryController.addApiary)

module.exports = router;