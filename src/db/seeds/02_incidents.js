const {
  hashSync
} = require('bcryptjs')

const table = 'incidents'

exports.seed = knex => {
  return knex(table).insert([{
      id: 1,
      description: "There is a hole on the road",
      latitude: "47.619471",
      longitude: "-122.344641",
      user_id: 1
    },
    {
      id: 2,
      description: "There is a broken tree near my place",
      latitude: "47.608013",
      longitude: "-122.335167",
      user_id: 2,
    },
    {
      id: 3,
      description: "There is a broken tree near my place",
      latitude: "47.557995",
      longitude: "-122.331024",
      user_id: 2
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};