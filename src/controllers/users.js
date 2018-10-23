const model = require('../models/users')
const auth = require('../lib/auth')

async function signup(req, res, next) {
    try {
        const response = await model.signup(req.body)
        const token = auth.createToken(response.id)
        const id = response.id
        const email = response.email
        const firstname = response.firstname
        const lastname = response.lastname

        res.status(201).json({
            token,
            id,
            email,
            firstname,
            lastname

        })
    } catch (e) {
        console.log(e)
        next({
            status: 400,
            error: "User cannot be created"
        })
    }

}

async function login(req, res, next) {
    try {
        const response = await model.login(req.body)
        const token = auth.createToken(response.id)
        const id = response.id
        const email = response.email
        const firstname = response.firstname
        const lastname = response.lastname
        res.json({
            token,
            id,
            email,
            firstname,
            lastname
        })
    } catch (e) {
        next({
            status: 401,
            error: `Failed to log in`
        })
    }

}

const getAll = async (req, res, next) => {
    let data = await model.getAll()
    console.log("I am data in user.js controller", data)
    res.send({
        data
    })
}

const getOne = async (req, res, next) => {
    let data = await model.getOne(req.params.userId)
    res.send({
        data
    })
}

module.exports = {
    getAll,
    getOne,
    signup,
    login
}