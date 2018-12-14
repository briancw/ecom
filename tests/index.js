const {testRedisConnection, resetRedis, closeRedis} = require('./redis.js')
const {testDbConnection, resetDb, closeDb} = require('./database.js')

testRedisConnection()
resetRedis()

testDbConnection()
resetDb()

require('./categories.js')
require('./products.js')
require('./orders.js')
require('./users.js')

closeDb()
closeRedis()
