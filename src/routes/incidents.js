const router = require('express').Router()
const ctrl = require('../controllers/incidents')
const auth = require('../lib/auth')

router.get('/', ctrl.getAll)
router.get('/:inId', ctrl.getOne)

module.exports = router