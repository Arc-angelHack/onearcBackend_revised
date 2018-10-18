const table = 'resource_transactions'

exports.up = knex => {
  return knex.schema.createTable(table, table => {
    table.increments()
    table.integer('resource_id').notNullable().defaultsTo(0)
    table.foreign('resource_id').references('resources.id').onDelete('CASCADE')
    table.string('reply').notNullable().defaultsTo('')
    table.integer('responding_user_id').notNullable().defaultsTo(0)
    table.foreign('responding_user_id').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable(table)
};