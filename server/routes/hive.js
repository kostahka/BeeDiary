const express = require('express');
const router = express.Router();
const hiveController = require('../controllers/hive-controller')

router.get('/get/:id', hiveController.getHive)
router.post('/add/:id', hiveController.addHives)
router.post('/set', hiveController.setHive)
router.post('/delete/:id', hiveController.deleteHive)

module.exports = router;