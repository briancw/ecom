const {assert} = require('chai')
const {createCategory} = require('../controllers/categories.js')

describe('Create a product category', () => {
    it('Should return a success message', async () => {
        let result = await createCategory('test-category')
        assert.strictEqual(result, 'success')
    })
})
