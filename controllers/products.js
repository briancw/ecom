const Product = require('../models/product.js')
const sequelize = require('../models/db.js')

/**
 * @function createProduct
 * @param  {type} product {description}
 * @return {type} {description}
 */
async function createProduct(product) {
    try {
        await Product.create(product)
        return {success: true}
    } catch (err) {
        if (err instanceof sequelize.ForeignKeyConstraintError) {
            // At the moment, I don't know how to trigger one of these
            return {success: false, error: 'foreign key constrain error'}
        } else if (err instanceof sequelize.ValidationError) {
            return {success: false, error: 'validation error'}
        }
        console.error(err)
        return {success: false, error: 'unkown error'}
    }
}

/**
 * @function getProducts
 * @return {type} {description}
 */
async function getProducts() {
    let products = await Product.findAll({raw: true})
    return products
}

async function updateProduct(productSlug, updatedProduct) {
    try {
        await Product.update(updatedProduct, {
            where: {
                urlSlug: productSlug,
            },
        })
        return {success: true}
    } catch (err) {
        console.error(err)
        return {success: false, error: 'Unkown Error'}
    }
}

async function deleteProduct(productSlug) {
    try {
        await Product.destroy({
            where: {
                urlSlug: productSlug,
            },
        })
        return {success: true}
    } catch (err) {
        console.error(err)
        return {success: false, error: 'Unkown Error'}
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}
