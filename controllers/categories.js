const Category = require('../models/category.js')
const sequelize = require('../models/db.js')

/**
 * @function createCategory
 * @param  {type} category {description}
 * @return {type} {description}
 */
async function createCategory(category) {
    try {
        await Category.create(category)
        return {success: true}
    } catch (err) {
        if (err instanceof sequelize.ForeignKeyConstraintError) {
            // At the moment, I don't know how to trigger one of these
            return {success: false, error: 'foreign key constrain error'}
        } else if (err instanceof sequelize.ValidationError) {
            return {success: false, error: 'validation error'}
        }

        console.error(err)
        return {success: false, error: 'Unkown'}
    }
}

async function getCategories() {
    let categories = await Category.findAll({raw: true})
    return categories
}

async function updateCategory(categorySlug, updatedCategory) {
    try {
        await Category.update(updatedCategory, {
            where: {
                slug: categorySlug,
            },
        })
        return {success: true}
    } catch (err) {
        console.error(err)
        return {success: false, error: 'Unkown Error'}
    }
}

async function deleteCategory(categorySlug) {
    try {
        await Category.destroy({
            where: {
                slug: categorySlug,
            },
        })
        return {success: true}
    } catch (err) {
        console.error(err)
        return {success: false, error: 'Unkown Error'}
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
}
