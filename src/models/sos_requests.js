const db = require('../db/knex')
const { filterByLocation } = require('./helpers')

const tbName = 'sos_requests'
const joinTbs = () => {
  return db(tbName)
    .select('sos_requests.id AS sos_id', '*')
    .join('users', 'users.id', '=', 'sos_requests.user_id')
}

////////////////
// ANY USER CAN 
///////////////

// getAll SOS requests by giving lat, long & range (defaults to 20 miles)
const getAll = async (query) => {
  const sosRequests = await joinTbs()
  const nearbyReq = filterByLocation(sosRequests, query)
  return nearbyReq
}

// getOne SOS request
const getOne = async (reqId) => {
  return joinTbs()
    .where('sos_requests.id', reqId)
    .first()
}

////////////////////
// BY A SINGLE USER
////////////////////

// getAll SOS requests made by a user (both finished and not)
const getAllByUser = (userId) => {
  return joinTbs()
    .where('sos_requests.user_id', userId)
}

// get current sos request by a user 
const getCurrent = async (userId) => {
  return joinTbs()
    .where({
      finished: false,
      user_id: userId
    })
    .first()
}

const createSOS = (userId, { street, city, state, zip, lat, long, description, finished }) => {
  const bodyInsert = {
    user_id: userId,
    street,
    city,
    state,
    zip,
    lat,
    long,
    description,
    finished
  }
  return db(tbName)
    .insert(bodyInsert)
    .returning('*')
}

const find = (tableName, userId, reqId) => {
  return db(tableName)
    .where({ user_id: userId, id: reqId })
    .first()
}

const updateRequest = async (userId, reqId, body) => {
  try {
    const found = await find(tbName, userId, reqId)
    return db(tbName)
      .update({
        ...found,
        ...body,
        updated_at: new Date()
      })
      .where({ id: reqId }) // checking this for sure
      .returning('*')
  } catch (e) {
    console.error(e)
  }
}

const endRequest = async (userId, reqId) => {
  try {
    const found = await find(tbName, userId, reqId)
    return db(tbName)
      .update({
        ...found,
        finished: true
      })
      .where({
        id: userId
      })
      .returning('*')
  } catch (e) {
    console.error(e)
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