const {assert} = require('chai')
// const chai = require('chai').use(require('chai-as-promised'))
// const {assert, expect} = chai
const {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} = require('../controllers/categories.js')

describe('Create Category', () => {
    let newCategory = {
        displayName: 'Test Category',
        slug: 'test-category',
    }

    it('Should return a success message when supplied valid inputs', async () => {
        let result = await createCategory(newCategory)
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow duplicates', async () => {
        let result = await createCategory(newCategory)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should allow creating multiple categories', async () => {
        newCategory.displayName = 'Test Category 2'
        newCategory.slug = 'test-category-2'

        let result = await createCategory(newCategory)
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow empty strings', async () => {
        newCategory.displayName = ''
        newCategory.slug = ''

        let result = await createCategory(newCategory)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow null values', async () => {
        newCategory.displayName = null
        newCategory.slug = 'test-category-2'

        let result = await createCategory(newCategory)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow missing required values', async () => {
        newCategory.displayName = 'A legit name'
        delete newCategory.slug

        let result = await createCategory(newCategory)
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should not allow no input', async () => {
        let result = await createCategory()
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })
})

describe('Get Categories', () => {
    it('Should return a list of all existing categories', async () => {
        let result = await getCategories()

        assert.isArray(result)
        assert.lengthOf(result, 2)
        assert.strictEqual(result[0].displayName, 'Test Category')
        assert.strictEqual(result[0].slug, 'test-category')
    })
})

describe('Update Category', () => {
    it('Should return a success message when supplied valid inputs', async () => {
        let updatedCategory = {
            displayName: 'Test Category Updated',
            slug: 'test-category-updated',
        }

        // Update the first category we made with a new name and slug
        let result = await updateCategory('test-category', updatedCategory)
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should update values on a category', async () => {
        // TODO This test is a little weak
        let result = await getCategories()
        assert.strictEqual(result[1].displayName, 'Test Category Updated')
        assert.strictEqual(result[1].slug, 'test-category-updated')
    })

    // TODO test invalid entries
})

describe('Delete Category', () => {
    it('Should return a success message when supplied valid inputs', async () => {
        let result = await deleteCategory('test-category-updated')
        assert.deepStrictEqual(result, {success: true})
    })

    // TODO test category was deleted

    // TODO test invalid entries
})
