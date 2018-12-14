const Order = require('../models/order.js')
const sequelize = require('../models/db.js')

async function createOrder(order) {
    try {
        await Order.create(order)
        return {success: true}
    } catch (err) {
        if (err instanceof sequelize.ForeignKeyConstraintError) {
            // At the moment, I don't know how to trigger one of these
            return {success: false, error: 'foreign key constrain error'}
        } else if (err instanceof sequelize.ValidationError) {
            console.log(err)
            return {success: false, error: 'validation error'}
        }

        console.error(err)
        return {success: false, error: 'Unkown'}
    }
}

module.exports = {
    createOrder,
}
