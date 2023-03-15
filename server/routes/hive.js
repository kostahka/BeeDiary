const express = require('express');
const router = express.Router();
const hiveController = require('../controllers/hive-controller')

router.get('/get/:id', hiveController.getHive)
router.post('/add/:count', hiveController.addHives)
router.post('/set/:id', hiveController.setHive)

module.exports = router;