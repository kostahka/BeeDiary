const express = require('express');
const router = express.Router();
const hiveController = require('../controllers/hive-controller')

router.get('/get/:id', hiveController.getHive)
router.put('/add/:id', hiveController.addHives)
router.post('/set', hiveController.setHive)
router.delete('/delete/:id', hiveController.deleteHive)

module.exports = router;