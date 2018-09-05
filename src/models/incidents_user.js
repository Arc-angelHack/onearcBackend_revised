const db = require('../db/knex')

// get all incidents created by a user 
const index = (userId) => {
    return db('incidents')
        .where({
            id: userId
        })
        .then(incidents => incidents)
}

// user creates an incident 
const create = (body) => {
    const bodyInsert = {
        longitude: body.longitude,
        latitude: body.latitude,
        user_id: parseInt(body.user_id),
        description: body.description
    }
    return db('incidents')
        .insert(bodyInsert)
        .returning('*')
        .then(([response]) => response)
}


function find(id) {
    return db('incidents')
        .where({
            id
        })
        .first()
}

// user updates an incident 
function patch(id, body) {
    return find(id)
        .then(response => {
            return db('incidents')
                .update({
                    ...response,
                    ...body,
                    updated_at: new Date()
                })
                .where({
                    id
                })
                .returning('*')
                .then(([response]) => response)
        })
}


// user deletes an incident 
function destroy(id) {
    return db('incidents')
        .where({
            id
        })
        .del()
        .returning('*')
        .then(([response]) => response)
}

module.exports = {
    index,
    create,
    patch,
    destroy
}