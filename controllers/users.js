const argon2 = require('argon2')
const crypto = require('crypto')
const redis = require('../models/redis.js')
const sequelize = require('../models/db.js')
const User = require('../models/user.js')
const setAsync = require('util').promisify(redis.set).bind(redis)
const getAsync = require('util').promisify(redis.get).bind(redis)
const {sessionTime} = require('../config.js')

// eslint-disable-next-line require-jsdoc
async function register(user) {
    // TODO not a terribly good password strength test
    let passwordRequirements = new RegExp('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])')
    if (!user.password) {
        return {success: false, error: 'empty password'}
    } else if (user.password.length < 10) {
        return {success: false, error: 'password too short'}
    } else if (user.password.length >= 128) {
        return {success: false, error: 'password too long'}
    } else if (!passwordRequirements.test(user.password)) {
        return {success: false, error: 'weak password'}
    }

    let passwordHash = await argon2.hash(user.password)
    try {
        await User.create({
            email: user.email,
            passwordHash,
        })
    } catch (err) {
        if (err instanceof sequelize.ValidationError) {
            if (err.errors[0].type === 'unique violation') {
                return {success: false, error: 'unique validation error'}
            }

            return {success: false, error: 'validation error'}
        } else if (err instanceof sequelize.ForeignKeyConstraintError) {
            // At the moment, I don't know how to trigger one of these
            return {success: false, error: 'foreign key constrain error'}
        }

        console.error(err)
        return {success: false, error: 'Unkown'}
    }

    return {success: true}
}

// eslint-disable-next-line require-jsdoc
async function login(user) {
    let {email, password} = user
    let existingUser = await User.findOne({
        where: {
            email,
        },
    })

    if (!existingUser) {
        return {success: false, error: 'invalid username or password'}
    }

    let isValidPassword = await argon2.verify(existingUser.passwordHash, password)
    if (isValidPassword) {
        let token = crypto.randomBytes(48).toString('base64')
        await setAsync(token, true, 'EX', sessionTime)

        return {success: true, token}
    }

    return {success: false, error: 'invalid username or password'}
}

// eslint-disable-next-line require-jsdoc
async function authorize(token) {
    let res = await getAsync(token)
    if (res) {
        return {success: true}
    }

    return {success: false}
}

module.exports = {
    register,
    login,
    authorize,
}
