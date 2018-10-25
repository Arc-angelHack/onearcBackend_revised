const router = require('express').Router({ mergeParams: true })
const ctrl = require('../controllers/incidents_user')
const auth = require('../lib/auth')

router.get('/:userId', auth.isLoggedIn, auth.isAuthorized, ctrl.index)
router.post('/', auth.isLoggedIn, ctrl.create)
router.patch('/:userId/update/:inId', auth.isLoggedIn, auth.isAuthorized, ctrl.patch)
router.delete('/:userId/delete/:inId', auth.isLoggedIn, auth.isAuthorized, ctrl.destroy)

module.exports = router



