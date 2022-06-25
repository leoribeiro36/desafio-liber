const router = require('express').Router()
const addressController = require('../controllers/addressController')
const loginValidation = require('../validations/loginValidation')

router.get('/findAddress/:id', loginValidation.verifyToken, addressController.findAddress)
router.put('/editAddress/:id', loginValidation.verifyToken, addressController.editAddress)
router.delete('/deleteAddress/:id', loginValidation.verifyToken, addressController.deleteAddress)

module.exports = router;
