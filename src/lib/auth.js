const {
    SECRET_KEY
} = process.env
const {
    sign,
    verify
} = require('jsonwebtoken')
const db = require('../db/knex')



function createToken(id) {
    const sub = {
        sub: {
            id
        }
    }
    const options = {
        expiresIn: '100 days'
    }

    return sign(sub, SECRET_KEY, options)
}
// all tokens are signed with a unique id. 

function parseToken(header) {
    const token = header && header.split('Bearer ')[1]
    return verify(token, SECRET_KEY)
}

function isLoggedIn(req, res, next) {
    try {
        parseToken(req.headers.authorization)
        next()

    } catch (e) {
        next({
            status: 401,
            error: `Session has expired. Please login again.`
        })
    }
}

async function isAuthorized(req, res, next) {
    try {
        const message = {
            status: 401,
            error: `You are not authorized to access this route`
        }
        const authorization = req.headers.authorization

        if (!authorization) {
            return next(message)
        }
        
        const token = parseToken(authorization)
        const userId = token.sub.id
        const userCheck = req.params.userId

        if (userId !== userCheck) {
            return next(message)
        }

        const user = await db('users').where({
            id: userId
        }).first()
        
        if (!user) {
            return next(message)
        }

        next()
    } catch (e) {
        console.log(e)
        next({
            status: 401,
            error: `Session has expired. Pal, please log in again.`
        })

    }
}



module.exports = {
    createToken,
    parseToken,
    isLoggedIn,
    isAuthorized
}