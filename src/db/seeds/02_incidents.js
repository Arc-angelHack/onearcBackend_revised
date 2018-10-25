const {
  hashSync
} = require('bcryptjs')

const table = 'incidents'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    description: "There is a hole on the road",
    lat: 37.733777,
    long: -122.447576,
    user_id: 1
  },
  {
    id: 2,
    description: "All the trees are burnt",
    lat: 37.688643,
    long: -122.45121,
    user_id: 2
  },
  {
    id: 3,
    description: "There is a broken tree near my place",
    lat: 37.761317,
    long: -122.449185,
    user_id: 7
  }, {
    id: 4,
    description: "There is a lot of debris on the road",
    lat: 37.761317,
    long: -122.491757,
    user_id: 6
  }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};