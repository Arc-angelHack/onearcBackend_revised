const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/requests_helper')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
router.get('/:reqId', auth.isLoggedIn, ctrl.getOne)
router.post('/:reqId', auth.isLoggedIn, ctrl.create)
router.patch('/:reqId', auth.isLoggedIn, auth.isAuthorized, ctrl.patch)
router.delete('/:reqId', auth.isLoggedIn, auth.isAuthorized, ctrl.destroy)


module.exports = router