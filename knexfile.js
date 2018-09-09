if (process.env.NODE_ENV !== 'production') require('dotenv').load()
const {
    DATABASE_URL_LOCAL,
    DATABASE_URL_PROD,
    NODE_ENV
} = process.env

const path = require('path')
const config = {
    client: 'pg',
    connection: DATABASE_URL_LOCAL,
    migrations: {
        directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
        directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
}

const configProd = {
    client: 'pg',
    connection: DATABASE_URL_PROD,
    migrations: {
        directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
        directory: path.join(__dirname, 'src', 'db', 'seeds')
    }
}


module.exports = {
    development: config,
    production: configProd,
    testing: { ...config,
        connection: DATABASE_URL_LOCAL.replace('_dev', '_test')
    }
}