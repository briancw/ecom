const Sequelize = require('sequelize')
const sequelize = require('./db.js')

const Category = require('./category.js')
// const ProductImage = require('./product_image.js')

const Model = sequelize.define('product', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    urlSlug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    price: {
        type: Sequelize.FLOAT,
    },
    sku: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
    },
    weight: {
        type: Sequelize.STRING,
    },
    sortOrder: {
        type: Sequelize.INTEGER,
    },
    buyable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
    },
    isVariant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
    },
    isVisible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: false,
        },
    },
})

Model.belongsTo(Category, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'}) // Can use: CASCADE
// Model.hasMany(ProductImage, {foreignKey: {allowNull: false}, onDelete: 'RESTRICT'})

// Model.belongsTo(Model, {
//     as: 'parent',
//     foreignKey: {
//         name: 'parentId',
//         allowNull: true,
//     },
//     onDelete: 'RESTRICT',
// })
// Model.hasMany(Model, {
//     as: 'children',
//     foreignKey: {
//         name: 'parentId',
//         allowNull: true,
//     },
//     onDelete: 'RESTRICT',
// })

module.exports = Model
