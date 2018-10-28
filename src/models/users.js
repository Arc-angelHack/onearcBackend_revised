const { promisify } = require('util')

const personal = require('./personal')
const medical = require('./medical')


const db = require('../db/knex')
const bcrypt = require('bcryptjs')

const getAll = () => {
    return db('users')
        .returning('*')
        .then((response) => response)
}

const getOne = async (userId) => {
    const personalInfo = await personal.getAll(userId)
    const medicalInfo = await medical.getAll(userId)
    delete personalInfo.id
    delete medicalInfo.id
    const user = await db('users')
        .where('id', userId)
        .first()
    user.personal = personalInfo
    user.medical = medicalInfo
    return user
}

async function login({
    email,
    password
}) {
    return db('users')
        .where({
            email
        })
        .then(async ([user]) => {
            if (!user)
                throw new Error()

            const isValid = await promisify(bcrypt.compare)(password, user.password) //hash the password that user puts in, compares with the hased in db
            if (!isValid)
                throw new Error()

            return user
        }).catch(console.log)
}

async function signup(body) {
    const hashed = await promisify(bcrypt.hash)(body.password, 8)
    const user = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: hashed
    }
    return db('users')
        .insert(user)
        .returning('*')
        .then(([response]) => {
            return response
        })
        .catch(console.log)
}

module.exports = {
    getAll,
    getOne,
    signup,
    login
}