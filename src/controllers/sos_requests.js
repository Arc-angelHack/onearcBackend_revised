const model = require('../models/sos_requests')
const { parseToken } = require('../lib/auth')

////////////////
// ANY USER CAN 
///////////////

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

// any user can view an sos request 
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

////////////////////
// BY A SINGLE USER
////////////////////
// return user_id from token 

const retrieveId = (req) => {
  const token = parseToken(req.headers.authorization)
  const user_id = token.sub.id
  return user_id
}

// get all sos requests created by a user (both finished and not)
const getAllByUser = async (req, res, next) => {
  try {
    const user_id = retrieveId(req)
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

// get current sos request by a user 
const getCurrent = async (req, res, next) => {
  try {
    const user_id = retrieveId(req)
    let response = await model.getCurrent(user_id)
    let data = { ...response }
    delete data.password
    res.send({ data })
  } catch (e) {
    console.error(e)
    next({
      status: 404,
      error: 'Could not retrieve the current SOS request by this user'
    })
  }
}

// a user can create a SOS request 
const createSOS = async (req, res, next) => {
  try {
    const user_id = retrieveId(req)
    let response = await model.createSOS(user_id, req.body)
    res.status(201).json({ ...response })
  } catch (e) {
    console.error(e)
    next({
      status: 400,
      error: 'Could not create SOS request. Bad Request.'
    })
  }
}

const updateRequest = async (req, res, next) => {
  try {
    const user_id = retrieveId(req)
    const reqId = req.params.reqId
    const data = await model.updateRequest(user_id, reqId, req.body)
    res.send({ data })
  } catch (e) {
    console.error(e)
    next({
      status: 400,
      error: 'Could not update SOS request. Bad Request.'
    })
  }
}

// a user can end an sos request. change finished val from false to true 
const endRequest = async (req, res, next) => {
  try {
    const user_id = retrieveId(req)
    const reqId = req.params.reqId
    const data = await model.endRequest(user_id, reqId)
    res.send({ data })
  } catch (e) {
    console.error(e)
    next({
      status: 400,
      error: 'Could not end SOS request. Bad Request'
    })
  }
}


module.exports = {
  getAll,
  getAllByUser,
  getOne,
  getCurrent,
  createSOS,
  updateRequest,
  endRequest
}