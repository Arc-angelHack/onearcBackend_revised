const db = require('../db/knex')

// helpers function 
const findIncident = (tableName, userId, lat, long, description) => {
    return db(tableName)
        .where({ user_id: userId, lat, long, description })
        .first()
}

const find = (tableName, userId, inId) => {
    return db(tableName)
        .where({ user_id: userId, id: inId })
        .first()
}


////////////////////
// BY A SINGLE USER
///////////////////

const tbName = 'incidents'
const joinTbs = () => {
    return db(tbName)
        .select('incidents.id AS incident_id', '*')
        .join('users', 'users.id', '=', 'incidents.user_id')
}

// get all incidents created by a user 
const index = (userId) => {
    return joinTbs()
        .where({
            user_id: userId
        })
}

// user creates an incident 
const create = async (userId, { lat, long, description }) => {
    const bodyInsert = {
        lat,
        long,
        description,
        user_id: parseInt(userId),
    }
    const incident = await findIncident(tbName, userId, lat, long, description)
    if (!incident) {
        return db(tbName)
            .insert(bodyInsert)
            .returning('*')
    }
}

// user updates an incident 
const patch = async (userId, inId, body) => {
    try {
        const found = await find(tbName, userId, inId)
        return db(tbName)
            .update({
                ...found,
                ...body,
                updated_at: new Date()
            })
            .where({ id: inId })
            .returning('*')
    } catch (e) {
        console.error(e)
    }
}

// user deletes an incident 
const destroy = (id) => {
    return db(tbName)
        .where({
            id
        })
        .del()
        .returning('*')
}

module.exports = {
    index,
    create,
    patch,
    destroy
}