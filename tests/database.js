const sequelize = require('../models/db.js')

after('Close db connection', async () => {
    await sequelize.close()
})

describe('Connect to the Postgres database with Sequelize', () => {
    it('Should not error', async () => {
        await sequelize.authenticate()
    })
})
