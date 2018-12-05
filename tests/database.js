const sequelize = require('../models/db.js')

/**
 * @function testDbConnection
 */
function testDbConnection() {
    describe('Connect to the Postgres database with Sequelize', () => {
        it('Should not error', async () => {
            await sequelize.authenticate()
        })
    })
}

/**
 * @function resetDb
 */
function resetDb() {
    describe('Reset the DB', () => {
        it('Should reset the DB', async () => {
            await sequelize.sync({
                force: true,
            })
        })
    })
}

/**
 * @function closeDb
 */
function closeDb() {
    describe('Close DB connection', () => {
        it('close', async () => {
            await sequelize.close()
        })
    })
}

module.exports = {
    testDbConnection,
    resetDb,
    closeDb,
}
