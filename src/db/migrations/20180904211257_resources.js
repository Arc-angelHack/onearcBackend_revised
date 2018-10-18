const table = 'resources'

exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.integer('people_count').notNullable().defaultsTo(0)
    table.string('message').notNullable().defaultsTo('')
    table.float('lat')
    table.float('long')
    table.boolean('food').notNullable().defaultsTo(false)
    table.boolean('water').notNullable().defaultsTo(false)
    table.boolean('shelter').notNullable().defaultsTo(false)
    table.boolean('medical').notNullable().defaultsTo(false)
    table.boolean('other').notNullable().defaultsTo(false)
    table.boolean('is_an_offer').notNullable().defaultsTo(false)
    table.boolean('finished').notNullable().defaultsTo(false)
    table.integer('user_id').notNullable().defaultsTo(0)
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable(table)
};