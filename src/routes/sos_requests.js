const router = require('express').Router()
const ctrl = require('../controllers/sos_requests')
const auth = require('../lib/auth')

////////////////////////////////////
// ANY USER
///////////////////////////////////

// get all sos requests in 20 miles range nearby 
router.get('/', ctrl.getAll)
router.get('/:reqId', ctrl.getOne)

////////////////////////////////////
// BY A SINGLE USER
///////////////////////////////////

// to see all their sos requests (both finished and not) 
router.get('/byuser/:userId', auth.isLoggedIn, auth.isAuthorized, ctrl.getAllByUser)

// to see current SOS request 
router.get('/byuser/:userId/current', auth.isLoggedIn, auth.isAuthorized, ctrl.getCurrent)

// to create SOS request
router.post('/', auth.isLoggedIn, ctrl.createSOS)

// to update SOS request 
router.patch('/:userId/update/:reqId', auth.isLoggedIn, auth.isAuthorized, ctrl.updateRequest)

// to end SOS request 
router.patch('/:userId/end/:reqId', auth.isLoggedIn, auth.isAuthorized, ctrl.endRequest)


// NOTE: for frontend dev, make sure user ends a current request first, before being able to make another SOS request 
module.exports = router