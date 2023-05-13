const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group-controller')
const {body} = require('express-validator')

router.post('/addAllowedApiary', groupController.addAllowedApiary)
router.post('/removeAllowedApiary', groupController.removeAllowedApiary)
router.post('/removeUser', groupController.removeUserFromGroup)
router.post('/addUser', groupController.addUserToGroup)
router.get('/get/:id', groupController.getGroup)
router.get('/getAll/:id', groupController.getUserGroups)
router.get('/getUserAll/:id', groupController.getUserOwnGroups)
router.post('/set/:id',
    body('name').notEmpty({ignore_whitespace:true}), groupController.setGroup)
router.put('/add/:id',
    body('name').notEmpty({ignore_whitespace:true}) ,groupController.addGroup)
router.delete('/delete/:id', groupController.deleteGroup)

module.exports = router;