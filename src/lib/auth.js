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
        const authorization = req.headers.authorization
        if (!authorization) {
            const message = `You are not authorized to access this route`
            return next({
                status: 401,
                error: message
            })
        }

        const token = parseToken(authorization)
        const userId = token.sub.id

        const user = await db('users')
            .where({
                id: userId
            }).first()
            
        if (!user) {
            const message = `You are not authorized to update this list`
            return next({
                status: 401,
                error: message
            })
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