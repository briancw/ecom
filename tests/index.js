const {testDbConnection, resetDb, closeDb} = require('./database.js')

testDbConnection()
resetDb()

require('./categories.js')

closeDb()
