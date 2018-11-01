const table = 'users'

exports.up = knex => {
    return knex.schema.createTable(table, table => {
        table.increments()
        table.string('firstname').notNullable()
        table.string('lastname').notNullable().defaultsTo('')
        table.string('email').notNullable().unique()
        table.text('password').notNullable()
        table.string('avatar').notNullable().defaultsTo('https://goo.gl/ZCTNp3')
        table.timestamps(true, true)
    })
}

exports.down = knex => {
    return knex.schema.dropTable(table)
};