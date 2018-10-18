const table = 'sos_requests'

exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.string('street').notNullable().defaultsTo('')
    table.string('city').notNullable().defaultsTo('')
    table.string('state').notNullable().defaultsTo('')
    table.float('lat')
    table.float('long')
    table.string('description').notNullable()
    table.boolean('finished').notNullable().defaultsTo(false)
    table.integer('user_id').notNullable().defaultsTo(0)
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable(table)
};