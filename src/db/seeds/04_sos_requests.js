const {
  hashSync
} = require('bcryptjs')

const table = 'sos_requests'

exports.seed = knex => {
  return knex(table).insert([{
    id: 1,
    street: '233 Melrose Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: 94127,
    lat: 37.733777,
    long: -122.447576,
    description: 'There is so much smoke in our area. Please help!',
    finished: false,
    user_id: 1
  }, {
    id: 2,
    street: '700 Hoffman St',
    city: 'Daly City',
    state: 'CA',
    zip: 94014,
    lat: 37.688643,
    long: -122.45121,
    description: 'After the fire, our living room was destroyed. Can someone lend a helping hand?',
    finished: false,
    user_id: 2
  }, {
    id: 3,
    street: '1386 33rd Ave',
    city: 'San Francisco',
    state: 'CA',
    zip: 94122,
    lat: 37.761317,
    long: -122.491757,
    description: 'My house is destroyed. I am trying to clean up the aftermath, but I might faint. Can someone look out for me?',
    finished: false,
    user_id: 6
  }, {
    id: 4,
    street: '1419 Cole St',
    city: 'San Francisco',
    state: 'CA',
    zip: 94117,
    lat: 37.761317,
    long: -122.449185,
    description: 'I have really bad headeache. It is not urgent, but it hurts so much.',
    finished: false,
    user_id: 7
  }, {
    id: 5,
    street: '815 Buena Vista Ave W',
    city: 'San Francisco',
    state: 'CA',
    zip: 94117,
    lat: 37.770002,
    long: -122.442318,
    description: 'The front yard is torched. I am so nauseous.',
    finished: false,
    user_id: 8
  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};