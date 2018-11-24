const fs = require('fs')
const path = require('path')

const dbEnvTemplate = `POSTGRES_PASSWORD=CHANGEME
POSTGRES_USER=CHANGEME
POSTGRES_DB=CHANGEME`

console.log('Creating template database environment file. It is important that you change the credentials in this file.')
fs.writeFileSync(path.join(__dirname, 'db.env'), dbEnvTemplate)

const keysTemplate = `
const stripeKey = 'CHANGEME'
const sendgridKey = 'CHANGEME'
const jwtSecret = 'CHANGEME'
const dbUsername = 'CHANGEME'
const dbPassword = 'CHANGEME'
const dbName = 'CHANGEME'
const adminUsername = 'CHANGEME'
const adminPassword = 'CHANGEME'

module.exports = {
    stripeKey,
    sendgridKey,
    jwtSecret,
    dbUsername,
    dbPassword,
    dbName,
    adminUsername,
    adminPassword,
}
`

console.log('Creating template keys file.')
fs.writeFileSync(path.join(__dirname, 'keys.js'), keysTemplate)
