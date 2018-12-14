const {assert} = require('chai')
const {register, login, authorize} = require('../controllers/users.js')

describe('Register a new account', () => {
    let email = 'brian@whicheloe.us'
    let password = '123abcDEF!'

    it('Should return a success message when supplied valid inputs', async () => {
        let result = await register({email, password})
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow duplicate emails', async () => {
        let result = await register({email, password})
        assert.deepStrictEqual(result, {success: false, error: 'unique validation error'})
    })

    it('Should not allow empty string for email', async () => {
        let result = await register({email: '', password})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow empty string for password', async () => {
        let result = await register({email: 'email2@example.org', password: ''})
        assert.deepStrictEqual(result, {success: false, error: 'empty password'})
    })

    it('Should not allow no value for email', async () => {
        let result = await register({password})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow no value for password', async () => {
        let result = await register({email})
        assert.deepStrictEqual(result, {success: false, error: 'empty password'})
    })

    it('Should not allow non valid emails', async () => {
        let result = await register({email: 'test', password})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow too short of passwords', async () => {
        let result = await register({email: 'test2@example.org', password: 'Aa1$'})
        assert.deepStrictEqual(result, {success: false, error: 'password too short'})
    })

    it('Should not allow too long of passwords', async () => {
        let tooLong = 'Aa1!zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
        let result = await register({email: 'test2@example.org', password: tooLong})
        assert.deepStrictEqual(result, {success: false, error: 'password too long'})
    })

    it('Should not allow weak passwords', async () => {
        let result1 = await register({email: 'test2@example.org', password: 'Mississippi14'}) // No Symbol
        let result2 = await register({email: 'test2@example.org', password: 'Mississippi$'}) // No Digits
        let result3 = await register({email: 'test2@example.org', password: 'mississippi14$'}) // No Uppercase
        let result4 = await register({email: 'test2@example.org', password: 'MISSISSIPPI14'}) // No Lowercase
        let result5 = await register({email: 'test2@example.org', password: 'Correct horse battery staple!'}) // No digits

        assert.deepStrictEqual(result1, {success: false, error: 'weak password'})
        assert.deepStrictEqual(result2, {success: false, error: 'weak password'})
        assert.deepStrictEqual(result3, {success: false, error: 'weak password'})
        assert.deepStrictEqual(result4, {success: false, error: 'weak password'})
        assert.deepStrictEqual(result5, {success: false, error: 'weak password'})
    })
})

describe('Login to an existing account', () => {
    let userTemplate = {
        email: 'brian@whicheloe.us',
        password: '123abcDEF!',
    }

    it('Should return a success message and token when valid login credentials are used', async () => {
        let user = Object.assign({}, userTemplate)
        let result = await login(user)
        assert.strictEqual(result.success, true)
        assert.exists(result.token)
        assert.isString(result.token)
        assert.lengthOf(result.token, 64)
    })

    it('Should return an error when an invalid password is used', async () => {
        let user = Object.assign({}, userTemplate)
        user.password = 'zzzz'

        let result = await login(user)
        assert.strictEqual(result.success, false)
        assert.strictEqual(result.error, 'invalid username or password')
    })

    it('Should return an error when an invalid email is used', async () => {
        let user = Object.assign({}, userTemplate)
        user.email = 'test@example.org'

        let result = await login(user)
        assert.strictEqual(result.success, false)
        assert.strictEqual(result.error, 'invalid username or password')
    })
})

describe('Authorize a token received from login', () => {
    let token
    before('Get a token', async () => {
        let user = {
            email: 'brian@whicheloe.us',
            password: '123abcDEF!',
        }
        let result = await login(user)
        token = result.token
    })

    it('Should return true when supplied with a valid token', async () => {
        let authorized = await authorize(token)
        assert.deepStrictEqual(authorized, {success: true})
    })

    it('Should return false when supplied an invalid token', async () => {
        let token = 'invalid token'
        let result = await authorize(token)
        assert.deepStrictEqual(result, {success: false})
    })

    // it('Should return false when supplied with an expired token', () => {
    //     // TODO generate an expired token somehow
    // })
})
