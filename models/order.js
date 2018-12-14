const Sequelize = require('sequelize')
const sequelize = require('./db.js')

const Model = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    billingName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billingCompany: {
        type: Sequelize.STRING,
    },
    billingPhone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billingEmail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billingCity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billingState: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billingZip: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingAddress1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingAddress2: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    shippingCity: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingState: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingZip: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingSenderName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shippingGiftMessage: {
        type: Sequelize.TEXT,
    },
    paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    cartId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    orderTotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    trackingCode: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    isConfirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    isShipped: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    isArchived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    memo: {
        type: Sequelize.STRING,
        allowNull: true,
    },
})

module.exports = Model
