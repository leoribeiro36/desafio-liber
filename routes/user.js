const router = require('express').Router()
const userController = require('../controllers/userController')
const loginValidation = require('../validations/loginValidation')

router.get('/findUser/:id', loginValidation.verifyToken, userController.findUser)
router.put('/editUser/:id', loginValidation.verifyToken, userController.editUser)
router.delete('/deleteUser/:id', loginValidation.verifyToken, userController.deleteUser)

module.exports = router;
