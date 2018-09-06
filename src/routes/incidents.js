const router = require('express').Router()
const ctrl = require('../controllers/incidents')
const auth = require('../lib/auth')

console.log(ctrl.getAll)
router.get('/', ctrl.getAll)

module.exports = router