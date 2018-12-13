const {testDbConnection, resetDb, closeDb} = require('./database.js')

testDbConnection()
resetDb()

require('./categories.js')
require('./products.js')

closeDb()
