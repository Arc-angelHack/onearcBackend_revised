const router = require('express').Router()
const ctrl = require('../controllers/personal')
const auth = require('../lib/auth')

router.get('/:userId', auth.isLoggedIn, auth.isAuthorized, ctrl.getAll)
router.post('/', auth.isLoggedIn, ctrl.create)
router.patch('/:userId/update/:perId', auth.isLoggedIn, auth.isAuthorized, ctrl.patch)
router.delete('/:userId/delete/:perId', auth.isLoggedIn, auth.isAuthorized, ctrl.destroy)


module.exports = router