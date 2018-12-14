const redis = require('../models/redis.js')

/**
 * Redis connects very fast. If a connection is already established, return true.
 * If not, wait until the redis ready every has fired.
 * @function testRedisConnection
 */
function testRedisConnection() {
    describe('Check connection to Redis database with node_redis', () => {
        it('Should not error', async () => {
            if (redis.connected) {
                return true
            }

            await new Promise((resolve) => {
                redis.on('ready', (err) => {
                    if (err) {
                        console.error(err)
                    }
                    console.log('redis ready')
                    resolve()
                })
            })
            return true
        })
    })
}

/**
 * Run flush all. This should wipe out absolutely all data.
 * @function resetRedis
 */
function resetRedis() {
    describe('Nuke the redis db', () => {
        it('Should not error', (done) => {
            redis.flushall(() => {
                done()
            })
        })
    })
}

/**
 * @function closeRedis
 */
function closeRedis() {
    describe('Close Redis connection', () => {
        it('Should close', (done) => {
            redis.quit(() => {
                done()
            })
        })
    })
}

module.exports = {
    testRedisConnection,
    resetRedis,
    closeRedis,
}
