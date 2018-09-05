const table = 'incidents'

exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('description').notNullable()
        table.string('latitude')
        table.string('longitude')
        table.integer('user_id').notNullable().defaultsTo(0)
        table.foreign('user_id').references('users.id').onDelete('CASCADE')
        table.timestamps(true, true)
    })
}

exports.down = knex => {
    return knex.schema.dropTable(table)
};