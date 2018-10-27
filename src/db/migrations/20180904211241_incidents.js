const table = 'incidents'

exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('description').notNullable().defaultsTo('')
        table.float('lat')
        table.float('long')
        table.integer('user_id').notNullable().defaultsTo(0)
        table.foreign('user_id').references('users.id').onDelete('CASCADE')
        table.timestamps(true, true)
    })
}

exports.down = knex => {
    return knex.schema.dropTable(table)
};