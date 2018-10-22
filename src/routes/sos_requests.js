const router = require('express').Router()
const ctrl = require('../controllers/sos_requests')
const auth = require('../lib/auth')

// get all sos requests in 20 miles range nearby 
router.get('/', ctrl.getAll)
router.get('/:reqId', ctrl.getOne)
router.get('/users/:userId', auth.isLoggedIn, auth.isAuthorized, ctrl.getAllByUser)

module.exports = router