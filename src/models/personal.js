const db = require('../db/knex')
const { find } = require('./helpers')


const tbName = 'personal_info'

//helpers function
const findPersonal = (tableName, userId, birth_date, phone) => {
  return db(tableName)
    .where({ user_id: userId, birth_date, phone })
    .first()
}

////////////////////////////
// PROFILE: MEDICAL SECTION
///////////////////////////

// get all medical info for a user 
const getAll = (userId) => {
  return db(tbName)
    .where({
      user_id: userId
    })
    .first()
}

const create = async (userId, { birth_date, city, state, phone, gps }) => {
  const bodyInsert = {
    birth_date,
    city,
    state,
    phone,
    gps,
    user_id: parseInt(userId)
  }

  const personal = await findPersonal(tbName, userId, birth_date, phone)
  if (!personal) {
    return db(tbName)
      .insert(bodyInsert)
      .returning('*')
  }
}

const patch = async (userId, perId, body) => {
  try {
    const found = await find(tbName, userId, perId)
    return db(tbName)
      .update({
        ...found,
        ...body,
        updated_at: new Date()
      })
      .where({ id: perId })
      .returning('*')
  } catch (e) {
    console.error(e)
  }
}

const destroy = (id) => {
  return db(tbName)
    .where({
      id
    })
    .del()
    .returning('*')
}


module.exports = {
  getAll,
  create,
  patch,
  destroy
}