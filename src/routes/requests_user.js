const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/requests_user')
const auth = require('../lib/auth')

router.get('/', auth.isLoggedIn, ctrl.index)
router.post('/', auth.isLoggedIn, ctrl.create)
router.patch('/:reqId', auth.isLoggedIn, auth.isAuthorized, ctrl.patch)
router.delete('/:reqId', auth.isLoggedIn, auth.isAuthorized, ctrl.destroy)

module.exports = router