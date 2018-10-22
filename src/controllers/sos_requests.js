const model = require('../models/sos_requests')
const { parseToken } = require('../lib/auth')

// get all sos requests in 20 miles range nearby 
const getAll = async (req, res, next) => {
  try {
    let data = await model.getAll(req.query)
    res.send({
      data
    })
  } catch (e) {
    console.error(e)
    next({
      status: 404,
      error: 'Could not retrieve all SOS requests'
    })
  }
}

const getOne = async (req, res, next) => {
  try {
    let data = await model.getOne(req.params.reqId)
    res.send({ data })
  } catch (e) {
    console.error(e)
    next({
      status: 404,
      error: 'Could not retrieve a single SOS request'
    })
  }
}

const getAllByUser = async (req, res, next) => {
  try {
    const token = parseToken(req.headers.authorization)
    const user_id = token.sub.id
    let data = await model.getAllByUser(user_id)
    res.send({ data })
  } catch (e) {
    console.error(e)
    next({
      status: 404,
      error: 'Could not retrieve all SOS requests by this user'
    })
  }
}


module.exports = {
  getAll,
  getAllByUser,
  getOne
}