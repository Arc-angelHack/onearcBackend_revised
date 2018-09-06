const db = require('../db/knex')

const getAll = () => {
    return db('incidents')
        .returning('*')
        .then((response) => response)
}

module.exports = {
    getAll
}