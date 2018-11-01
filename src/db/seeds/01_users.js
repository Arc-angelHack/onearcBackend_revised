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
    avatar: 'https://i.snag.gy/xNYwKs.jpg'
  }, {
    id: 2,
    firstname: 'Jacob',
    lastname: 'Guintoli',
    email: 'jacob@angel.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/jFo2Ny.jpg'

  }, {
    id: 3,
    firstname: 'Kelly',
    lastname: 'Clarkson',
    email: 'kelly@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/jDHPhE.jpg'

  }, {
    id: 4,
    firstname: 'Brian',
    lastname: 'Adams',
    email: 'brian@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/PA41TZ.jpg'

  }, {
    id: 5,
    firstname: 'Nancy',
    lastname: 'Oxford',
    email: 'nancy@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/Om6qAp.jpg'

  }, {
    id: 6,
    firstname: 'Halsey',
    lastname: 'Rain',
    email: 'halsey@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/SkAEJ5.jpg'

  }, {
    id: 7,
    firstname: 'Lauren',
    lastname: 'Large',
    email: 'lauren@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/vBFGa9.jpg'

  }, {
    id: 8,
    firstname: 'Rain',
    lastname: 'Forest',
    email: 'rain@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/hd6vGC.jpg'

  }, {
    id: 9,
    firstname: 'Henry',
    lastname: 'Nguyen',
    email: 'henryN@gmail.com',
    password: hashSync('pass'),
    avatar: 'https://i.snag.gy/wzgrmJ.jpg'

  }]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });
};