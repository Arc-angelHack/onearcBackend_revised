const router = require('express').Router()
const ctrl = require('../controllers/resource_offers')
const { isLoggedIn, isAuthorized } = require('../lib/auth')

router.get('/', isLoggedIn, ctrl.getAll)
router.get('/:resId', isLoggedIn, ctrl.getOne)

router.post('/create', isLoggedIn, ctrl.createOffer)

router.patch('/:userId/update/:resId', isAuthorized, ctrl.updateOffer)
router.patch('/:userId/complete/:resId', isAuthorized, ctrl.completeOffer)

router.delete('/:userId/delete/:resId', isAuthorized, ctrl.deleteOffer)

module.exports = router