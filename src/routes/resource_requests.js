const router = require('express').Router()
const ctrl = require('../controllers/resource_requests')
const { isLoggedIn, isAuthorized } = require('../lib/auth')

router.get('/', isLoggedIn, ctrl.getAll)
router.get('/:resId', isLoggedIn, ctrl.getOne)

router.post('/create', isLoggedIn, ctrl.createRequest)

router.patch('/:userId/update/:resId', isAuthorized, ctrl.updateRequest)
router.patch('/:userId/complete/:resId', isAuthorized, ctrl.completeRequest)

router.delete('/:userId/delete/:resId', isAuthorized, ctrl.deleteRequest)

module.exports = router