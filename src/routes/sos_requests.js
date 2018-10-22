const router = require('express').Router()
const ctrl = require('../controllers/sos_requests')

// get all sos requests in 20 miles range nearby 
router.get('/', ctrl.getAll)
router.get('/:reqId', ctrl.getOne)

module.exports = router