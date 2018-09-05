const db = require('../db/knex')

// get all the help requests created by a user 
const index = (userId) => {
    return db('requests')
        .where({
            id: userId
        })
        .then(requests => requests)
}

// user creates a help request 
const create = (body) => {
    const bodyInsert = {
        description: body.description,
        longitude: body.longitude,
        latitude: body.latitude,
        status: body.status,
        ask_food: body.food,
        ask_shelter: body.shelter,
        ask_water: body.water,
        ask_medical: body.medical
    }
    return db('requests')
        .insert(bodyInsert)
        .returning('*')
        .then(([response]) => response)
}


function find(id) {
    return db('requests')
        .where({
            id
        })
        .first()
}


// update a request 
const patch = (id, body) => {
    return find(id)
        .then(response => {
            return db('requests')
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

// destroy request 
function destroy(id) {
    return db('requests')
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