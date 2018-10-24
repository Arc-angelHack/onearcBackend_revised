const router = require('express').Router()
const ctrl = require('../controllers/resource_transactions')
const { isLoggedIn, isAuthorized } = require('../lib/auth')

router.get('/resource/:resId', isLoggedIn, ctrl.getAll)
router.get('/user/:userId', isAuthorized, ctrl.getAllUser)

router.post('/:userId/:resId', isAuthorized, ctrl.createTrans)

router.delete('/:userId/:resId', isAuthorized, ctrl.deleteTrans)

module.exports = router