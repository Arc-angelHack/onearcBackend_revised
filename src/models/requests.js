const db = require('../db/knex')

const getAll = () => {
    return db('requests')
        .returning('*')
        .then((response) => response)
}

module.exports = {
    getAll
}