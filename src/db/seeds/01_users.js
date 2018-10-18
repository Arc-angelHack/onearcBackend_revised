const {
  hashSync
} = require('bcryptjs')

const table = 'users'
exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    firstname: "Jessica",
    lastname: "Alba",
    email: "jessica@angel.com",
    password: hashSync('pass'),
  }, {
    id: 2,
    firstname: 'Jacob',
    lastname: 'Guintoli',
    email: 'jacob@angel.com',
    password: hashSync('pass'),
  }, {
    id: 3,
    firstname: 'Kelly',
    lastname: 'Clarkson',
    email: 'kelly@gmail.com',
    password: hashSync('pass'),
  }, {
    id: 4,
    firstname: 'Brian',
    lastname: 'Adams',
    email: 'brian@gmail.com',
    password: hashSync('pass'),
  }, {
    id: 5,
    firstname: 'Nancy',
    lastname: 'Oxford',
    email: 'nancy@gmail.com',
    password: hashSync('pass'),
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};