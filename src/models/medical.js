const db = require('../db/knex')
const { find } = require('./helpers')


const tbName = 'medical_info'

//helpers function
const findMedical = (tableName, userId, insurance) => {
  return db(tableName)
    .where({ user_id: userId, insurance })
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

const create = async (userId, { blood_type, medication, insurance, emergency_name, emergency_phone }) => {
  const bodyInsert = {
    blood_type,
    allergies,
    medication,
    insurance,
    emergency_name,
    emergency_phone,
    user_id: parseInt(userId)
  }

  const medical = await findMedical(tbName, userId, insurance)
  if (!medical) {
    return db(tbName)
      .insert(bodyInsert)
      .returning('*')
  }
}

const patch = async (userId, medId, body) => {
  try {
    const found = await find(tbName, userId, medId)
    return db(tbName)
      .update({
        ...found,
        ...body,
        updated_at: new Date()
      })
      .where({ id: medId })
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