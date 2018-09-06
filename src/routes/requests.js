const router = require('express').Router()
const ctrl = require('../controllers/requests')
const auth = require('../lib/auth')

router.get('/', ctrl.getAll)

module.exports = router