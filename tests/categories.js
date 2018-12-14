const {assert} = require('chai')
const {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory,
} = require('../controllers/categories.js')

describe('Create Category', () => {
    let displayName = 'Test Category'
    let slug = 'test-category'

    it('Should return a success message when supplied valid inputs', async () => {
        let result = await createCategory({displayName, slug})
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow duplicates', async () => {
        let result = await createCategory({displayName, slug})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})
    })

    it('Should allow creating multiple categories', async () => {
        let result = await createCategory({displayName: 'Test Category 2', slug: 'test-category-2'})
        assert.deepStrictEqual(result, {success: true})
    })

    it('Should not allow empty strings', async () => {
        // Empty String displayName
        let result = await createCategory({displayName: '', slug: 'test-category-3'})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})

        // Empty String slug
        let result2 = await createCategory({displayName: 'Test Category 3', slug: ''})
        assert.deepStrictEqual(result2, {success: false, error: 'validation error'})
    })

    it('Should not allow null values', async () => {
        let result = await createCategory({displayName: null, slug: 'test-category-3'})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})

        let result2 = await createCategory({displayName: 'Test Category 3', slug: null})
        assert.deepStrictEqual(result2, {success: false, error: 'validation error'})
    })

    it('Should not allow missing required values', async () => {
        let result = await createCategory({slug: 'test-category-3'})
        assert.deepStrictEqual(result, {success: false, error: 'validation error'})

        let result2 = await createCategory({displayName: 'Test Category 3'})
        assert.deepStrictEqual(result2, {success: false, error: 'validation error'})
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
